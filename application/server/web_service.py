import json, gevent
from Queue import Queue
from threading import Thread, Event
from pprint import pprint
import netifaces
import os

from bottle import (
    Bottle,
    route,
    run,
    template,
    static_file,
    redirect,
    debug,
    request,
    abort
)

from watchdogs.nethogs import NethogsWatchdog

def web_service(
        host='0.0.0.0',
        port=8010,
        debugMode=True,
        reloader=True,
        ws=True
    ):
    app=Bottle()

    @app.route('/')
    def home():
        redirect('/index.html')

    @app.route('/interfaces')
    def interfaces():
        return {'interfaces': netifaces.interfaces()}
    
    if ws:
        connections_count=0

        @app.route('/websocket/<device>/<mode>')
        def handle_websocket(device='all',mode='transfer_rate'):
            if(device=='all'):
                device_list=[]
            else:
                device_list= device.split('_')

            if debugMode:
                pprint(device_list)
                pprint(mode)
                print '******************************************'

            tommy=NethogsWatchdog(devices=device_list)
            bridge={
                'queue': Queue(),
                'event': Event()
            }

            t=Thread(
                target=tommy.watch_transfer,
                args=(mode,bridge)
            )
            t.daemon=True
            t.start()

            wsock = request.environ.get('wsgi.websocket')
            if not wsock:
                abort(400, 'Expected WebSocket request.')
            
            while True:
                try:
                    message = wsock.receive()
                    report=bridge['queue'].get()
                    wsock.send(json.dumps(report))
                    gevent.sleep(0.1)
                except WebSocketError:
                    bridge['event'].set()
                    break


    @app.route('/<filename:path>')
    def send_static(filename):
        abs_path=os.path.dirname(os.path.abspath('web_service.py'))
        #print abs_path
        static_root=os.path.join(abs_path,'static')
        #print static_root
        return static_file(
            filename,
            root='/home/akshay/Documents/hogwatch/application/static/'
        )

    if ws:
        from gevent.pywsgi import WSGIServer
        from geventwebsocket import WebSocketError
        from geventwebsocket.handler import WebSocketHandler
        server = WSGIServer((host, port), app, handler_class=WebSocketHandler)
        server.serve_forever()
    else:
        port=str(port)
        app.run(host=host, port=port, debug=debugMode, reloader=reloader)



if __name__ == '__main__':
    web_service(ws=True)
    #todo kill threads on kill signal