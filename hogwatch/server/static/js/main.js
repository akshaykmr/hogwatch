//console.log('js serving');

$(function () {

    Highcharts.setOptions({
        global : {
            useUTC : false
        }
    });

    // Create the chart
    $('#charts').highcharts('StockChart', {
        chart : {
            //animation: false,
        },

        rangeSelector: {
            enabled: false,
            buttons: [
                {
                    count: 1,
                    type: 'minute',
                    text: '1M'
                }, 
                {
                    count: 5,
                    type: 'minute',
                    text: '5M'
                }, 
                {
                    count: 30,
                    type: 'minute',
                    text: '30M'
                }, 
                {
                    type: 'all',
                    text: 'All'
                }
            ],
            inputEnabled: false,
            selected: 0
        },

        title : {
            text : ''
        },

        exporting: {
            enabled: false
        },
        navigator: {
            enabled: false,
            series: {
                type: 'areaspline',
                color: '#2980b9',
                fillOpacity: 0.05,
                dataGrouping: {
                    smoothed: true
                },
                lineWidth: 1,
                marker: {
                    enabled: false
                }
            }
        },

        series : [
        ]
    });

});

var chartInstance;
function chart(){
    if(!chartInstance){
        chartInstance=$('#charts').highcharts();
    }
    return chartInstance;
}

function fixPrecision(num,precision){
    if(typeof precision==='undefined')
        precision=2;
    
    return parseFloat(num.toFixed(precision));
}

function seriesBlueprint(mode){
    var color= mode==='download'?'#2980b9':'#e74c3c';
    return {
        name : mode,
        color: color,
        visible: false,
        type: 'areaspline',
        tooltip: {
            valueSuffix: 'kBps'
        },
        data : []
    };
}


//to get all devices GET /interfaces  :for now I am just using all available interfaces
var defaultInterfaces=['all'];

function getSocketURL(interface_list,mode){
    var host=location.host;    
    var socketURL='ws://'+host+'/websocket/'+interface_list.join('_')+'/'+mode;
    return socketURL;    
}

if ("WebSocket" in window){

    var interfaces=['all'];   
    var rate= new WebSocket(getSocketURL(interfaces,'transfer_rate'));

    var counter=0;
    var transferHistory=[];
    var seen = {};
    var latestLogs = [];
    /*
            {
                download: [[timestamp,value],...],
                upload: [[timestamp,value],...]
            }
    */
    var transfer={
        seen: seen, //dict to keep track of process by name    name->uid
        latestLogs: latestLogs,
        activeLog: -1, //-1 for overall stats. 0,1,2 .. shows stats for process with that uid
        window: 0, //0 means entire duration of program, else specified minutes preceding last log
        total_kbps_in: 0,
        total_kbps_out: 0,
        total_kb_in: 0,
        total_kb_out:0
    };
    
    rate.onopen=function(){
        rate.send('start');
        console.log('rate ws starting')
        
        chart().addSeries({
            name : 'Total Download',
            color: '#2980b9',
            type: 'areaspline',
            tooltip: {
                valueSuffix: 'KBps'
            },
            data : []
        });        
        
        chart().addSeries({
            name : 'Total Upload',
            color: '#e74c3c',
            type: 'areaspline',
            tooltip: {
                valueSuffix: 'KBps'
            },
            data : []
        });
        
        chart().addSeries({  //for active uid
            name : 'download',
            visible: false,
            color: '#2980b9',
            type: 'areaspline',
            tooltip: {
                valueSuffix: 'KBps'
            },
            data : []
        });        

        chart().addSeries({ //for active uid
            name : 'upload',
            visible: false,
            color: '#e74c3c',
            type: 'areaspline',
            tooltip: {
                valueSuffix: 'KBps'
            },
            data : []
        });
    }
    var initMoment= (new Date()).valueOf(); //GLOBAL INIT
    
    rate.onmessage=function(evt){
        
        var report = JSON.parse(evt.data);
        report.total_in=fixPrecision(report.total_in,2);
        report.total_out=fixPrecision(report.total_out,2);
        //console.log(report);
        
        function addToHistory(entry,uid,timestamp){
            var series= transferHistory[uid]
            series.download.push([timestamp,entry['kbps_in']])
            series.upload.push([timestamp,-1*entry['kbps_out']])

            if(transfer.activeLog===uid){
                
                chart().series[2].addPoint([timestamp,entry['kbps_in']],false,false)
                chart().series[3].addPoint([timestamp,-1*entry['kbps_out']],false,false)
                
                var from=latestLogs[uid].initMoment;

                if(transfer.window!==0){
                    from= moment().subtract(transfer.window,'minutes').toDate().valueOf();  
                }
                if(!transfer.paused)
                    chart().xAxis[0].setExtremes(from,report.timestamp);                
            }
        }    
     
          
        chart().series[0].addPoint([report.timestamp,report['total_in']],false,false);        
        chart().series[1].addPoint([report.timestamp,-1*report['total_out']],false,false);
        
        report.entries.forEach(function(entry){
            entry.kbps_in=fixPrecision(entry.kbps_in);
            entry.kbps_out=fixPrecision(entry.kbps_out);
            if(seen[entry.process]===undefined){
                entry.uid=counter;
                entry.isActive=false;
                seen[entry.process]=counter;
                counter++;
                entry.initMoment= (new Date()).valueOf();
                latestLogs.push(entry);
                
                transferHistory.push({
                    download: [],
                    upload: []
                });
                addToHistory(entry,entry.uid,report.timestamp);
                
                setTimeout(function(){
                    $(".nano").nanoScroller();
                },200)
                
            }else{
                var uid=seen[entry.process];
                var log=latestLogs[uid];
                log['kbps_in']=entry['kbps_in'];
                log['kbps_out']=entry['kbps_out'];
                addToHistory(log,uid,report.timestamp);
            }
        });
        
        if(transfer.activeLog===-1){
            var from=initMoment;
            if(transfer.window!==0){
                from= moment().subtract(transfer.window,'minutes').toDate().valueOf();  
            }
            if(!transfer.paused)
                chart().xAxis[0].setExtremes(from,report.timestamp);
        }
        
        transfer.total_kbps_in=report.total_in;
        transfer.total_kbps_out=report.total_out;
        rate.send('next');
    };
    rate.onclose=function(){
        console.log('rate ws closed')
    };
    
    
    var amount= new WebSocket(getSocketURL(interfaces,'transfer_amount'));
    
    amount.onopen=function(){
        amount.send('start');
        console.log('amount ws starting')
    };
    
    amount.onmessage=function(evt){
        var report=JSON.parse(evt.data);
        //console.log(report);
        report.total_in=fixPrecision(report.total_in);
        report.total_out=fixPrecision(report.total_out);
        
        report.entries.forEach(function(entry){
            entry.kb_in=fixPrecision(entry.kb_in);
            entry.kb_out=fixPrecision(entry.kb_out);
            if(seen[entry.process]!==undefined){
                var log=latestLogs[seen[entry.process]];
                log['kb_in']=entry['kb_in'];
                log['kb_out']=entry['kb_out'];
            }else{
                //console.log('transfer amount could not be matched',entry)
                //fix this | separate the amount and rate to different views?
            }
        });
        
        transfer.total_kb_in=report.total_in;
        transfer.total_kb_out=report.total_out;
        
        amount.send('next');
    };
    
    amount.onclose=function(){
        console.log('amount ws was closed');
    };
}else{
    console.error("The browser doesn't support WebSocket");
}

var format= function(kbps){
    if(kbps/1000>=1.0)
        return (kbps/1000).toFixed(2) +' MB/s';
    else return kbps.toString() + ' KB/s';
};

var formatAmount= function(kb){
    if(kb/1000>=1.0)
        return (kb/1000).toFixed(2) +' MB';
    else return kb.toString() + ' KB';
};


transfer.paused=false;
var app= new Vue({
    el: '#app',
    data: transfer,
    computed: {
      total_kbps_in_formatted: function(){
        var rate;
        if(this.activeLog===-1)
            rate=this.total_kbps_in;
        else{
            rate=this.latestLogs[this.activeLog].kbps_in; 
        }
        return format(rate);
      },
      total_kbps_out_formatted: function(){
        var rate;
        if(this.activeLog===-1)
            rate=this.total_kbps_out;
        else{
            rate=this.latestLogs[this.activeLog].kbps_out;  
        }
        return format(rate); 
      },
        transferIn: function(){
            if(this.activeLog===-1)
                return formatAmount(this.total_kb_in);
            else{
                return formatAmount(this.latestLogs[this.activeLog].kb_in);
            }
        },
        transferOut:function(){
            if(this.activeLog===-1)
                return formatAmount(this.total_kb_out);
            else{
                return formatAmount(this.latestLogs[this.activeLog].kb_out);
            }
        }
    },
    methods: {
        toggleActiveLog: function(log){
            
            function setVisibility(uid,visible){
                var series=getSeries(uid);
                for(var plot in series){
                    if(visible===false)
                        series[plot].hide();
                    else
                        series[plot].show()
                }  
            }
            
            
            if(this.activeLog===log.uid){                
                log.isActive=false;
                
                chart().series[2].hide();
                chart().series[3].hide();
                chart().series[0].show();
                chart().series[1].show();
                this.activeLog=-1;
                
            }else{
                if(this.activeLog===-1){
                    chart().series[0].hide();
                    chart().series[1].hide();
                    chart().series[2].show();
                    chart().series[3].show();
                }else{
                    this.latestLogs[this.activeLog].isActive=false;                   
                }               
                log.isActive=true;
                this.activeLog=log.uid;
                chart().series[2].setData(transferHistory[log.uid].download);
                chart().series[3].setData(transferHistory[log.uid].upload);
            }
        },
        toggleWindowState: function(){
            if(this.paused)
                this.paused=false;
            else
                this.paused=true;
        },
        windowLength:function(length){
            if(this.window===length){
                this.window=0;
                $('.range').removeClass('active');
                $('#range-0').addClass('active');
            }else{
                $('.range').removeClass('active');
                this.window=length;
                var selector='#range-'+length.toString();
                $(selector).addClass('active');
            }
        }
    }
});


$(".nano").nanoScroller({ alwaysVisible: true });  




/************/


