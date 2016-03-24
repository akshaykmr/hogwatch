import json, gevent
from Queue import Queue
from threading import Thread
from pprint import pprint

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

    #static routes
    @app.route('/')
    def home():
        redirect('/index.html')
    
    if ws:
        connections_count=0

        @app.route('/websocket/<device>/<mode>')
        def handle_websocket(device='eth0',mode='transfer_rate'):
            device_list= device.split('_')
            pprint(device_list)
            pprint(mode)
            print '******************************************'

            tom=NethogsWatchdog(devices=device_list)

            q=Queue()
            t=Thread(
                target=tom.watch_transfer,
                args=(mode,q)
            )
            t.daemon=True
            t.start()

            wsock = request.environ.get('wsgi.websocket')
            if not wsock:
                abort(400, 'Expected WebSocket request.')
            
            while True:
                try:
                    message = wsock.receive()
                    report=q.get()
                    wsock.send(json.dumps(report))
                    gevent.sleep(0.1)
                except WebSocketError:
                    print 'noooooooooooooooooooooooooooooo'
                    break


    @app.route('/<filename:path>')
    def send_static(filename):
        return static_file(
            filename,
            root='/home/akshay/Documents/hogwatch/application/static/'
        )

        ## ^^ have to use full path for static folder. relative one will
        ## not work with run.py -- NEED TO FIX 





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
