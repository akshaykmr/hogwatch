import json, gevent
from Queue import Queue
from threading import Thread
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
local_path=os.path.abspath(os.path.dirname(__file__))
path_for_static_assets= os.path.join(local_path,'static')

path_for_static_assets += '/'
#print path_for_static_assets 

from watchdogs.nethogs import NethogsWatchdog

def app_server(
        host='0.0.0.0',
        port=6432,
        debugMode=False,
        reloader=True,
        ws=True
    ):

    print 'starting web server at: localhost:' + str(port)
    app=Bottle()


    @app.route('/')
    def home():
        redirect('/index.html')

    @app.route('/interfaces')
    def interfaces():
        return {'interfaces': netifaces.interfaces()}
    
    if ws:

        @app.route('/websocket/<device>/<mode>')
        def handle_websocket(device='all',mode='transfer_rate'):
            if(device=='all'):
                device_list=[]
            else:
                device_list= device.split('_')

            if debugMode:
                pprint(device_list)
                pprint(mode)

            watchdog=NethogsWatchdog(devices=device_list)
            bridge={
                'queue': Queue()
            }

            t=Thread(
                target=watchdog.watch_transfer,
                args=(mode,bridge)
            )

            wsock = request.environ.get('wsgi.websocket')
            if not wsock:
                abort(400, 'Expected WebSocket request.')


            #t.setDaemon(True)
            t.start()               
        
            while True:
                try:
                    message = wsock.receive()
                    report=bridge['queue'].get()

                    if not report['running']:
                        break
                    else:
                        wsock.send(json.dumps(report))

                    gevent.sleep(0.1)

                except WebSocketError:
                    watchdog.terminate()                       
                    break


    @app.route('/<filename:path>')
    def send_static(filename):
        
        return static_file(
            filename,
            root=path_for_static_assets
        )

    try:        
        if ws:
            from gevent.pywsgi import WSGIServer
            from geventwebsocket import WebSocketError
            from geventwebsocket.handler import WebSocketHandler
            server = WSGIServer((host, port), app, handler_class=WebSocketHandler)
            server.serve_forever()
        else:
            port=str(port)
            app.run(host=host, port=port, debug=debugMode, reloader=reloader)

    except (KeyboardInterrupt, SystemExit):
        print "exit"



if __name__ == '__main__':
    app_server(ws=True)