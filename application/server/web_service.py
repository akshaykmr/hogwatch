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

def web_service(host='0.0.0.0',port=8080,debugMode=True, reloader=True, ws=True):
    app=Bottle()

    #static routes
    @app.route('/')
    def home():
        redirect('/index.html')

    @app.route('/<filename:path>')
    def send_static(filename):
        return static_file(filename, root='../static/')


    if ws:
        @app.route('/websocket')
        def handle_websocket():
            wsock = request.environ.get('wsgi.websocket')
            if not wsock:
                abort(400, 'Expected WebSocket request.')

            while True:
                try:
                    message = wsock.receive()
                    wsock.send("Your message was: %r" % message)
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