console.log('js serving');

if ("WebSocket" in window){
	   //alert("WebSocket is supported by your Browser!");
   var ws = new WebSocket("ws://10.211.55.9:8010/websocket");
	
   ws.onopen = function()   {
      ws.send('test_message')
      console.log('WebSocket open');
   };
	
   ws.onmessage = function (evt){ 
      var received_msg = evt.data;
      console.log(JSON.parse(received_msg));
   };
	
   ws.onclose = function(){ 
      // websocket is closed.
      console.log('connection closed'); 
   };
}else{
   // The browser doesn't support WebSocket
   alert("WebSocket NOT supported by your Browser!");
}