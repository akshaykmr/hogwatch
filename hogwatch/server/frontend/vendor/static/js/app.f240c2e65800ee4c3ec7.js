webpackJsonp([1],{JFgk:function(t,e,a){"use strict";e.a={formatTransferRate:function(t){return t/1e3>=1?(t/1e3).toFixed(2)+" MB/s":t+" KB/s"},formatTransferAmount:function(t){return t/1e3>=1?(t/1e3).toFixed(2)+" MB":t+" KB"},fixPrecision:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2;return parseFloat(t.toFixed(e))}}},NHnr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("7+uW"),o=a("OjAt"),n=a.n(o),i=a("ctVs");s.a.use(n.a),s.a.config.productionTip=!1,new s.a({el:"#app",template:"<Hogwatch />",components:{Hogwatch:i.a}})},ZOVY:function(t,e,a){"use strict";var s=a("kF11");e.a=s.a},a9HI:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"container"},[t._m(0),t._v(" "),a("div",{staticClass:"nano"},[a("div",{staticClass:"nano-content"},[a("div",{staticClass:"logs"},[a("ul",[a("transition-group",{attrs:{name:"flip-list",tag:"ul"}},t._l(t.orderedLogs,function(e){return a("li",{key:e.uid,on:{click:function(a){t.toggleActiveLog(e)}}},[a("div",{staticClass:"log",class:{active:e.isActive}},[t._v("\n                  "+t._s(e.process)+"\n                ")])])}))],1)])])]),t._v(" "),a("div",{attrs:{id:"charts"}})]),t._v(" "),a("div",{staticClass:"info-bar"},[a("div",{staticClass:"transfer-total down"},[a("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",version:"1.1",viewBox:"0 0 63.001 63.001"}},[a("g",[a("g",{attrs:{id:"group-23svg"}},[a("path",{attrs:{id:"path-1_16_",d:"M31.5,51.219c-0.67,0-1.301-0.261-1.774-0.736L0.44,21.198c-0.586-0.586-0.586-1.535,0-2.121     s1.535-0.586,2.121,0L31.5,48.015l28.94-28.938c0.586-0.586,1.535-0.586,2.121,0s0.586,1.535,0,2.121L33.276,50.483     C32.8,50.958,32.17,51.219,31.5,51.219z",fill:"#2980B9"}}),t._v(" "),a("path",{attrs:{id:"path-2_14_",d:"M31.5,37.993c-0.384,0-0.767-0.147-1.06-0.44L7.228,14.342c-0.586-0.586-0.586-1.536,0-2.122     c0.586-0.585,1.535-0.585,2.121,0L31.5,34.372L53.653,12.22c0.586-0.585,1.535-0.585,2.121,0c0.586,0.586,0.586,1.536,0,2.122     L32.562,37.553C32.269,37.846,31.885,37.993,31.5,37.993z",fill:"#2980B9"}})])])]),t._v(" "),a("div",{staticClass:"rate"},[t._v(t._s(t.total_kbps_in_formatted)+" ")]),t._v(" "),a("div",{staticClass:"amount recieved"},[t._v("\n        "+t._s(t.transferIn)+"\n      ")])]),t._v(" "),a("div",{staticClass:"transfer-total up"},[a("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",version:"1.1",viewBox:"0 0 63 63"}},[a("g",[a("g",{attrs:{id:"group-22svg"}},[a("path",{attrs:{id:"path-1_15_",d:"M61.5,44.44c-0.384,0-0.767-0.146-1.06-0.439L31.5,15.061L2.561,44.001     c-0.586,0.586-1.535,0.586-2.121,0s-0.586-1.535,0-2.121l29.286-29.364c0.473-0.474,1.104-0.812,1.774-0.812     c0.001,0,0.001,0,0.002,0c0.671,0,1.301,0.339,1.774,0.813l29.285,29.324c0.586,0.586,0.586,1.555,0,2.14     C62.268,44.275,61.882,44.44,61.5,44.44z",fill:"#E74C3C"}}),t._v(" "),a("path",{attrs:{id:"path-2_13_",d:"M54.712,51.296c-0.384,0-0.767-0.147-1.06-0.44L31.5,28.706L9.349,50.856     c-0.586,0.586-1.535,0.586-2.121,0s-0.586-1.535,0-2.121L30.44,25.524c0.586-0.586,1.535-0.586,2.121,0l23.212,23.211     c0.586,0.586,0.586,1.535,0,2.121C55.479,51.149,55.096,51.296,54.712,51.296z",fill:"#E74C3C"}})])])]),t._v(" "),a("div",{staticClass:"rate"},[t._v(t._s(t.total_kbps_out_formatted))]),t._v(" "),a("div",{staticClass:"amount sent"},[t._v("\n        "+t._s(t.transferOut)+"\n      ")])])]),t._v(" "),a("div",{staticClass:"window-range-selector"},[a("div",{staticClass:"state",class:{active:t.paused},on:{click:t.toggleWindowState}},[t.paused?a("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",version:"1.1",viewBox:"0 0 512 512"}},[a("g",[a("g",{attrs:{fill:"#231F20"}},[a("path",{attrs:{d:"m354.2,247.4l-135.1-92.4c-4.2-3.1-15.4-3.1-16.3,8.6v184.8c1,11.7 12.4,11.9 16.3,8.6l135.1-92.4c3.5-2.1 8.3-10.7 0-17.2zm-130.5,81.3v-145.4l106.1,72.7-106.1,72.7z",fill:"#FFFFFF"}}),t._v(" "),a("path",{attrs:{d:"M256,11C120.9,11,11,120.9,11,256s109.9,245,245,245s245-109.9,245-245S391.1,11,256,11z M256,480.1    C132.4,480.1,31.9,379.6,31.9,256S132.4,31.9,256,31.9S480.1,132.4,480.1,256S379.6,480.1,256,480.1z",fill:"#FFFFFF"}})])])]):a("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",version:"1.1",id:"Capa_1",x:"0px",y:"0px",viewBox:"0 0 235.592 235.592","xml:space":"preserve"}},[a("g",[a("path",{attrs:{d:"M117.795,0.002C52.843,0.002,0,52.844,0,117.795C0,182.747,52.843,235.59,117.795,235.59   c64.953,0,117.797-52.843,117.797-117.795C235.592,52.844,182.748,0.002,117.795,0.002z M117.795,220.59   C61.113,220.59,15,174.477,15,117.795C15,61.114,61.113,15.002,117.795,15.002c56.683,0,102.797,46.112,102.797,102.793   C220.592,174.477,174.477,220.59,117.795,220.59z",fill:"#FFFFFF"}}),t._v(" "),a("path",{attrs:{d:"M139.834,68.258c-4.143,0-7.5,3.357-7.5,7.5v84.076c0,4.143,3.357,7.5,7.5,7.5s7.5-3.357,7.5-7.5V75.758   C147.334,71.615,143.977,68.258,139.834,68.258z",fill:"#FFFFFF"}}),t._v(" "),a("path",{attrs:{d:"M95.758,68.258c-4.143,0-7.5,3.357-7.5,7.5v84.076c0,4.143,3.357,7.5,7.5,7.5s7.5-3.357,7.5-7.5V75.758   C103.258,71.615,99.9,68.258,95.758,68.258z",fill:"#FFFFFF"}})])])]),t._v(" "),a("div",{staticClass:"divider"}),t._v(" "),a("div",{staticClass:"range",attrs:{id:"range-0"},on:{click:function(e){t.windowLength(0)}}},[t._v(" [ ]")]),t._v(" "),a("div",{staticClass:"range",attrs:{id:"range-5"},on:{click:function(e){t.windowLength(5)}}},[t._v(" 5m ")]),t._v(" "),a("div",{staticClass:"range",attrs:{id:"range-30"},on:{click:function(e){t.windowLength(30)}}},[t._v(" 30m ")])])])},o=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"top-header"},[a("div",{staticClass:"heading"},[t._v("\n        HogWatch\n      ")])])}],n={render:s,staticRenderFns:o};e.a=n},ctVs:function(t,e,a){"use strict";function s(t){a("pmJE")}var o=a("ZOVY"),n=a("a9HI"),i=a("VU/8"),r=s,c=i(o.a,n.a,!1,r,null,null);e.a=c.exports},kF11:function(t,e,a){"use strict";var s=a("w+Gi"),o=a("JFgk"),n=function(){return $("#charts").highcharts()},i=["all"],r=function(t,e){return("https:"===location.protocol?"wss://":"ws://")+location.host+"/websocket/"+t.join("_")+"/"+e},c=0,l=[],u={seen:{},latestLogs:[],activeLog:-1,window:0,total_kbps_in:0,total_kbps_out:0,total_kb_in:0,total_kb_out:0,paused:!1,orderedLogs:[]},d=function(){var t=new WebSocket(r(i,"transfer_rate"));t.onopen=function(){t.send("start"),console.log("starting socket connection for transfer rate feed.")};var e=(new Date).valueOf();t.onmessage=function(a){var s=JSON.parse(a.data);s.total_in=o.a.fixPrecision(s.total_in,2),s.total_out=o.a.fixPrecision(s.total_out,2);var i=function(t,e,a){var o=l[e];if(o.download.push([a,t.kbps_in]),o.upload.push([a,-1*t.kbps_out]),u.activeLog===e){n().series[2].addPoint([a,t.kbps_in],!1,!1),n().series[3].addPoint([a,-1*t.kbps_out],!1,!1);var i=u.latestLogs[e].initMoment;0!==u.window&&(i=moment().subtract(u.window,"minutes").toDate().valueOf()),u.paused||n().xAxis[0].setExtremes(i,s.timestamp)}};if(n().series[0].addPoint([s.timestamp,s.total_in],!1,!1),n().series[1].addPoint([s.timestamp,-1*s.total_out],!1,!1),s.entries.forEach(function(t){if(t.kbps_in=o.a.fixPrecision(t.kbps_in),t.kbps_out=o.a.fixPrecision(t.kbps_out),u.seen[t.process]){var e=u.seen[t.process],a=u.latestLogs[e];a.kbps_in=t.kbps_in,a.kbps_out=t.kbps_out,i(a,e,s.timestamp)}else t.uid=c,t.isActive=!1,u.seen[t.process]=c,c+=1,t.initMoment=(new Date).valueOf(),u.latestLogs.push(t),l.push({download:[],upload:[]}),i(t,t.uid,s.timestamp),setTimeout(function(){return $(".nano").nanoScroller()},200)}),-1===u.activeLog){var r=e;0!==u.window&&(r=moment().subtract(u.window,"minutes").toDate().valueOf()),u.paused||n().xAxis[0].setExtremes(r,s.timestamp)}u.total_kbps_in=s.total_in,u.total_kbps_out=s.total_out,t.send("next")},t.onclose=function(){console.log("transfer rate feed ws closed")}},v=function(){var t=new WebSocket(r(i,"transfer_amount"));t.onopen=function(){t.send("start"),console.log("transfer amount ws feed starting")},t.onmessage=function(e){var a=JSON.parse(e.data);a.total_in=o.a.fixPrecision(a.total_in),a.total_out=o.a.fixPrecision(a.total_out),a.entries.forEach(function(t){if(t.kb_in=o.a.fixPrecision(t.kb_in),t.kb_out=o.a.fixPrecision(t.kb_out),u.seen[t.process]){var e=u.latestLogs[u.seen[t.process]];e.kb_in=t.kb_in,e.kb_out=t.kb_out}}),u.total_kb_in=a.total_in,u.total_kb_out=a.total_out,t.send("next")},t.onclose=function(){console.log("amount ws was closed")}};e.a={name:"Hogwatch",data:function(){return u},mounted:function(){if(!("WebSocket"in window))return void console.error("The browser doesn't support WebSocket");Object(s.a)(),d(),v(),setInterval(function(){u.paused||(u.orderedLogs=u.latestLogs.sort(function(t,e){return e.kb_in-t.kb_in}))},3e3)},computed:{total_kbps_in_formatted:function(){var t=0;return t=-1===u.activeLog?u.total_kbps_in:u.latestLogs[u.activeLog].kbps_in,o.a.formatTransferRate(t)},total_kbps_out_formatted:function(){var t=void 0;return t=-1===u.activeLog?u.total_kbps_out:u.latestLogs[u.activeLog].kbps_out,o.a.formatTransferRate(t)},transferIn:function(){return-1===u.activeLog?o.a.formatTransferAmount(u.total_kb_in):o.a.formatTransferAmount(u.latestLogs[u.activeLog].kb_in)},transferOut:function(){return-1===u.activeLog?o.a.formatTransferAmount(u.total_kb_out):o.a.formatTransferAmount(u.latestLogs[u.activeLog].kb_out)}},methods:{toggleActiveLog:function(t){u.activeLog===t.uid?(t.isActive=!1,n().series[2].hide(),n().series[3].hide(),n().series[0].show(),n().series[1].show(),u.activeLog=-1):(-1===u.activeLog?(n().series[0].hide(),n().series[1].hide(),n().series[2].show(),n().series[3].show()):u.orderedLogs=u.orderedLogs.map(function(t){return t.isActive=!1,t}),t.isActive=!0,u.activeLog=t.uid,n().series[2].setData(l[t.uid].download),n().series[3].setData(l[t.uid].upload))},toggleWindowState:function(){u.paused=!u.paused},windowLength:function(t){if(u.window===t)u.window=0,$(".range").removeClass("active"),$("#range-0").addClass("active");else{$(".range").removeClass("active"),u.window=t;var e="#range-"+t;$(e).addClass("active")}}}}},pmJE:function(t,e){},"w+Gi":function(t,e,a){"use strict";var s=function(){$(function(){Highcharts.setOptions({global:{useUTC:!1}}),$("#charts").highcharts("StockChart",{chart:{},rangeSelector:{enabled:!1,buttons:[{count:1,type:"minute",text:"1M"},{count:5,type:"minute",text:"5M"},{count:30,type:"minute",text:"30M"},{type:"all",text:"All"}],inputEnabled:!1,selected:0},title:{text:""},exporting:{enabled:!1},navigator:{enabled:!1,series:{type:"areaspline",color:"#2980b9",fillOpacity:.05,dataGrouping:{smoothed:!0},lineWidth:1,marker:{enabled:!1}}},series:[]});var t=function(){return $("#charts").highcharts()};t().addSeries({name:"Total Download",color:"#2980b9",type:"areaspline",tooltip:{valueSuffix:"KBps"},data:[]}),t().addSeries({name:"Total Upload",color:"#e74c3c",type:"areaspline",tooltip:{valueSuffix:"KBps"},data:[]}),t().addSeries({name:"download",visible:!1,color:"#2980b9",type:"areaspline",tooltip:{valueSuffix:"KBps"},data:[]}),t().addSeries({name:"upload",visible:!1,color:"#e74c3c",type:"areaspline",tooltip:{valueSuffix:"KBps"},data:[]})})};e.a=s}},["NHnr"]);
//# sourceMappingURL=app.f240c2e65800ee4c3ec7.js.map