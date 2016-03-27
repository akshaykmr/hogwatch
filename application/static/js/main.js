console.log('js serving');

//to get all devices GET /interfaces
var defaultInterfaces=['eth0'];

var interface_list=['eth0'];


function getSocketURL(interface_list,mode){
    var host=location.host;    
    var socketURL='ws://'+host+'/'+interface_list.join('_')+'/'+mode;
    return socketURL;    
}

if ("WebSocket" in window){
    
/*   var ws = new WebSocket("");
	
   ws.onopen = function()   {
      ws.send('start');
      console.log('WebSocket open');
   };
   ws.onmessage = function (evt){ 
      var messsage = JSON.parse(evt.data);
      console.log(messsage);
   };
	
   ws.onclose = function(){ 
      // websocket is closed.
      console.log('connection closed'); 
   };*/
    
/*    var rate= new WebSocket(getSocketURL(interfaces,'transfer_rate'));
    var amount= new WebSocket(getSocketURL(interfaces,'transfer_amount'));
    rate.onopen=function(){
        rate.send('start');
    }
    
    rate.onmessage
    amount.onopen=function(){
        
    }*/
}else{
   // The browser doesn't support WebSocket
   alert("WebSocket NOT supported by your Browser!");
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