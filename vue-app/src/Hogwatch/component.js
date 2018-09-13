/* global $ moment */

/* eslint-disable no-param-reassign */

// this code looks so ugly now; wow
// rushed college assignments are ze best

import initializeCharts from './initializeCharts';
import utils from './utils';

const chart = () => $('#charts').highcharts();

// to get all devices GET /interfaces  :for now I am just using all available interfaces
const interfaces = ['all'];

const getSocketURL = (interfaceList, mode) => {
  const socketProtocol = location.protocol === 'https:' ? 'wss://' : 'ws://';
  return `${socketProtocol}${location.host}/websocket/${interfaceList.join('_')}/${mode}`;
};

let counter = 0; // process counter
const transferHistory = []; // chart datastore
const transfer = { // vue datastore
  seen: {}, // dict to keep track of process by name    name->uid
  latestLogs: [],
  activeLog: -1, // -1 for overall stats. 0,1,2 .. shows stats for process with that uid
  window: 0, // 0 means entire duration of program, else specified minutes preceding last log
  total_kbps_in: 0,
  total_kbps_out: 0,
  total_kb_in: 0,
  total_kb_out: 0,
  paused: false,
  orderedLogs: [],
};

const initializeTransferRateFeed = () => {
  const rateSocket = new WebSocket(getSocketURL(interfaces, 'transfer_rate'));
  rateSocket.onopen = () => {
    rateSocket.send('start');
    console.log('starting socket connection for transfer rate feed.');
  };

  const initMoment = (new Date()).valueOf(); // Global init

  rateSocket.onmessage = (evt) => {
    const report = JSON.parse(evt.data);
    report.total_in = utils.fixPrecision(report.total_in, 2);
    report.total_out = utils.fixPrecision(report.total_out, 2);

    const addToHistory = (entry, uid, timestamp) => {
      const series = transferHistory[uid];
      series.download.push([timestamp, entry.kbps_in]);
      series.upload.push([timestamp, -1 * entry.kbps_out]);

      if (transfer.activeLog === uid) {
        chart().series[2].addPoint([timestamp, entry.kbps_in], false, false);
        chart().series[3].addPoint([timestamp, -1 * entry.kbps_out], false, false);

        let from = transfer.latestLogs[uid].initMoment;

        if (transfer.window !== 0) {
          from = moment().subtract(transfer.window, 'minutes').toDate().valueOf();
        }
        if (!transfer.paused) chart().xAxis[0].setExtremes(from, report.timestamp);
      }
    };


    chart().series[0].addPoint([report.timestamp, report.total_in], false, false);
    chart().series[1].addPoint([report.timestamp, -1 * report.total_out], false, false);

    report.entries.forEach((entry) => {
      /* eslint-disable no-param-reassign */
      entry.kbps_in = utils.fixPrecision(entry.kbps_in);
      entry.kbps_out = utils.fixPrecision(entry.kbps_out);
      if (!transfer.seen[entry.process]) {
        entry.uid = counter;
        entry.isActive = false;
        transfer.seen[entry.process] = counter;
        counter += 1;
        entry.initMoment = (new Date()).valueOf();
        transfer.latestLogs.push(entry);

        transferHistory.push({
          download: [],
          upload: [],
        });
        addToHistory(entry, entry.uid, report.timestamp);

        setTimeout(() => $('.nano').nanoScroller(), 200);
      } else {
        const uid = transfer.seen[entry.process];
        const log = transfer.latestLogs[uid];
        log.kbps_in = entry.kbps_in;
        log.kbps_out = entry.kbps_out;
        addToHistory(log, uid, report.timestamp);
      }
    });

    if (transfer.activeLog === -1) {
      let from = initMoment;
      if (transfer.window !== 0) {
        from = moment().subtract(transfer.window, 'minutes').toDate().valueOf();
      }
      if (!transfer.paused) chart().xAxis[0].setExtremes(from, report.timestamp);
    }
    transfer.total_kbps_in = report.total_in;
    transfer.total_kbps_out = report.total_out;
    rateSocket.send('next');
  };
  rateSocket.onclose = function () {
    console.log('transfer rate feed ws closed');
  };
};

const initializeTransferAmountFeed = () => {
  const amountSocket = new WebSocket(getSocketURL(interfaces, 'transfer_amount'));

  amountSocket.onopen = function () {
    amountSocket.send('start');
    console.log('transfer amount ws feed starting');
  };

  amountSocket.onmessage = function (evt) {
    const report = JSON.parse(evt.data);
    report.total_in = utils.fixPrecision(report.total_in);
    report.total_out = utils.fixPrecision(report.total_out);

    report.entries.forEach((entry) => {
      entry.kb_in = utils.fixPrecision(entry.kb_in);
      entry.kb_out = utils.fixPrecision(entry.kb_out);
      if (transfer.seen[entry.process]) {
        const log = transfer.latestLogs[transfer.seen[entry.process]];
        log.kb_in = entry.kb_in;
        log.kb_out = entry.kb_out;
      } else {
        // console.log('transfer amount could not be matched',entry)
        // fix this | separate the amount and rate to different views?
      }
    });

    transfer.total_kb_in = report.total_in;
    transfer.total_kb_out = report.total_out;

    amountSocket.send('next');
  };

  amountSocket.onclose = function () {
    console.log('amount ws was closed');
  };
};

export default {
  name: 'Hogwatch',
  data: () => transfer, // not good practice
  mounted: () => {
    if (!('WebSocket' in window)) {
      console.error("The browser doesn't support WebSocket");
      return;
    }
    initializeCharts();
    initializeTransferRateFeed();
    initializeTransferAmountFeed();

    setInterval(() => {
      if (transfer.paused) return;
      transfer.orderedLogs = transfer.latestLogs.sort((a, b) => (b.kb_in - a.kb_in));
    }, 3000);
  },
  computed: {
    total_kbps_in_formatted: () => {
      let rate = 0;
      if (transfer.activeLog === -1) rate = transfer.total_kbps_in;
      else rate = transfer.latestLogs[transfer.activeLog].kbps_in;
      return utils.formatTransferRate(rate);
    },
    total_kbps_out_formatted: () => {
      let rate;
      if (transfer.activeLog === -1) rate = transfer.total_kbps_out;
      else rate = transfer.latestLogs[transfer.activeLog].kbps_out;
      return utils.formatTransferRate(rate);
    },
    transferIn: () => {
      if (transfer.activeLog === -1) return utils.formatTransferAmount(transfer.total_kb_in);
      return utils.formatTransferAmount(transfer.latestLogs[transfer.activeLog].kb_in);
    },
    transferOut: () => {
      if (transfer.activeLog === -1) return utils.formatTransferAmount(transfer.total_kb_out);
      return utils.formatTransferAmount(transfer.latestLogs[transfer.activeLog].kb_out);
    },
  },
  methods: {
    toggleActiveLog: (log) => {
      if (transfer.activeLog === log.uid) {
        log.isActive = false;
        chart().series[2].hide();
        chart().series[3].hide();
        chart().series[0].show();
        chart().series[1].show();
        transfer.activeLog = -1;
      } else {
        if (transfer.activeLog === -1) {
          chart().series[0].hide();
          chart().series[1].hide();
          chart().series[2].show();
          chart().series[3].show();
        } else {
          transfer.orderedLogs = transfer.orderedLogs.map((l) => {
            l.isActive = false;
            return l;
          });
        }
        log.isActive = true;
        transfer.activeLog = log.uid;
        chart().series[2].setData(transferHistory[log.uid].download);
        chart().series[3].setData(transferHistory[log.uid].upload);
      }
    },
    toggleWindowState: () => {
      transfer.paused = !transfer.paused;
    },
    windowLength: (length) => {
      if (transfer.window === length) {
        transfer.window = 0;
        $('.range').removeClass('active');
        $('#range-0').addClass('active');
      } else {
        $('.range').removeClass('active');
        transfer.window = length;
        const selector = `#range-${length}`;
        $(selector).addClass('active');
      }
    },
  },
};
