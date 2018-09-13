/* global $ Highcharts */
const initializeCharts = () => {
  $(() => {
    Highcharts.setOptions({
      global: {
        useUTC: false,
      },
    });

    // Create the chart
    $('#charts').highcharts('StockChart', {
      chart: {
        // animation: false,
      },
      rangeSelector: {
        enabled: false,
        buttons: [
          {
            count: 1,
            type: 'minute',
            text: '1M',
          },
          {
            count: 5,
            type: 'minute',
            text: '5M',
          },
          {
            count: 30,
            type: 'minute',
            text: '30M',
          },
          {
            type: 'all',
            text: 'All',
          },
        ],
        inputEnabled: false,
        selected: 0,
      },

      title: {
        text: '',
      },

      exporting: {
        enabled: false,
      },
      navigator: {
        enabled: false,
        series: {
          type: 'areaspline',
          color: '#2980b9',
          fillOpacity: 0.05,
          dataGrouping: {
            smoothed: true,
          },
          lineWidth: 1,
          marker: {
            enabled: false,
          },
        },
      },

      series: [],
    });

    const chart = () => $('#charts').highcharts();

    chart().addSeries({
      name: 'Total Download',
      color: '#2980b9',
      type: 'areaspline',
      tooltip: {
        valueSuffix: 'KBps',
      },
      data: [],
    });

    chart().addSeries({
      name: 'Total Upload',
      color: '#e74c3c',
      type: 'areaspline',
      tooltip: {
        valueSuffix: 'KBps',
      },
      data: [],
    });

    chart().addSeries({ // for active uid
      name: 'download',
      visible: false,
      color: '#2980b9',
      type: 'areaspline',
      tooltip: {
        valueSuffix: 'KBps',
      },
      data: [],
    });

    chart().addSeries({ // for active uid
      name: 'upload',
      visible: false,
      color: '#e74c3c',
      type: 'areaspline',
      tooltip: {
        valueSuffix: 'KBps',
      },
      data: [],
    });
  });
};

export default initializeCharts;
