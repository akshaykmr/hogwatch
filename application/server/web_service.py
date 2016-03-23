import json, time
from Queue import Queue
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

def web_service(
        report_queue=Queue(),
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

    @app.route('/<filename:path>')
    def send_static(filename):
        return static_file(
            filename,
            root='/home/akshay/Documents/hogwatch/application/static/'
        )

        ## ^^ have to use full path for static folder. relative one will
        ## not work with run.py -- NEED TO FIX 


    if ws:
        @app.route('/websocket')
        def handle_websocket():
            wsock = request.environ.get('wsgi.websocket')
            if not wsock:
                abort(400, 'Expected WebSocket request.')

            while True:
                try:
                    #pprint(report)
                    message = wsock.receive()
                    #if wsock.socket is not None:
                    report=report_queue.get()
                    wsock.send(json.dumps(report))
                    time.sleep(3)
                except WebSocketError:
                    break


        from gevent.pywsgi import WSGIServer
        from geventwebsocket import WebSocketError
        from geventwebsocket.handler import WebSocketHandler
        server = WSGIServer((host, port), app, handler_class=WebSocketHandler)
        server.serve_forever()
    else:
        port=str(port)
        app.run(host=host, port=port, debug=debugMode, reloader=reloader)



if __name__ == '__main__':
    web_service()