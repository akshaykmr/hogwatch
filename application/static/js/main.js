console.log('js serving');

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
            events : {
                load : function () {

 /*                   // set up the updating of the chart each second
                    var series = this.series[0];
                    setInterval(function () {
                        var x = (new Date()).getTime(), // current time
                            y = Math.round(Math.random() * 100);
                        series.addPoint([x, y], true, true);
                    }, 1000);*/
                }
            }
        },

        rangeSelector: {
            buttons: [{
                count: 1,
                type: 'minute',
                text: '1M'
            }, {
                count: 5,
                type: 'minute',
                text: '5M'
            }, {
                type: 'all',
                text: 'All'
            }],
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
/*            {
                name : 'Random data',
                data : (function () {
                    // generate an array of random data
                    var data = [], time = (new Date()).getTime(), i;

                    for (i = -999; i <= 0; i += 1) {
                        data.push([
                            time + i * 1000,
                            Math.round(Math.random() * 100)
                        ]);
                    }
                    return data;
                }())
            }*/
        ]
    });

});

function chart(){
    return $('#charts').highcharts();
}

function getSeries(uid){
    return {
        download: chart().series[(uid+1)*2],
        upload: chart().series[(uid+1)*2 +1]
    }
}

function seriesBlueprint(mode){
    var color= mode==='download'?'#2980b9':'#e74c3c';
    return {
        name : mode,
        color: color,
        visible: false,
        type: 'areaspline',
        tooltip: {
            valueSuffix: 'kbps'
        },
        data : []
    }
}


//to get all devices GET /interfaces
var defaultInterfaces=['all'];

function getSocketURL(interface_list,mode){
    var host=location.host;    
    var socketURL='ws://'+host+'/websocket/'+interface_list.join('_')+'/'+mode;
    return socketURL;    
}

if ("WebSocket" in window){

    var interfaces=['all'];
    var rate= new WebSocket(getSocketURL(interfaces,'transfer_rate'));
    //var amount= new WebSocket(getSocketURL(interfaces,'transfer_amount'));
    
    var counter=0;
    var seen={};
    var latest_logs=[];
    rate.onopen=function(){
        rate.send('start');
        console.log('rate ws starting')
        
        chart().addSeries({
            name : 'Total Download',
            color: '#2980b9',
            type: 'areaspline',
            tooltip: {
                valueSuffix: 'kbps'
            },
            data : []
        });        
        
        chart().addSeries({
            name : 'Total Upload',
            color: '#e74c3c',
            type: 'areaspline',
            tooltip: {
                valueSuffix: 'kbps'
            },
            data : []
        });
    }

    rate.onmessage=function(evt){
        
        function addEntryToSeries(entry,uid,timestamp){
            var series= getSeries(uid);
            series.download.addPoint([timestamp,entry['kbps_in']],false,false)
            series.upload.addPoint([timestamp,-1*entry['kbps_out']],false,false)
            chart().redraw();
        }
        
        var report = JSON.parse(evt.data);
        console.log(report);
        
        chart().series[0].addPoint([report.timestamp,report['total_in']],false,false);
        chart().series[1].addPoint([report.timestamp,-1*report['total_out']],false,false);
        
        report.entries.forEach(function(entry){
            if(seen[entry.process]===undefined){
                entry.uid=counter;
                seen[entry.process]=counter;
                counter++;
                latest_logs.push(entry);
                
                chart().addSeries(seriesBlueprint('download'));
                chart().addSeries(seriesBlueprint('upload'));
                addEntryToSeries(entry,entry.uid,report.timestamp)
                
            }else{
                var uid=seen[entry.process];
                var log=latest_logs[uid];
                log['kbps_in']=entry['kbps_in'];
                log['kbps_out']=entry['kbps_out'];
                addEntryToSeries(entry,uid,report.timestamp);
            }
        });
        
    }
    rate.onclose=function(){
        console.log('rate ws closed')
    }
    
    
}else{
    // The browser doesn't support WebSocket
    console.error("WebSocket NOT supported by your Browser!");
}

var testData= {
    messages: [
        {
            text: 'ok'
        },
        {
            text: 'not ok'
        }
    ],
    ok: false
};

var test= new Vue({
    el: '#app',
    data: testData
});

$(".nano").nanoScroller({ alwaysVisible: true });