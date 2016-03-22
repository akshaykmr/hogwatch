from bottle import Bottle, route, run, template, static_file, redirect, debug
app=Bottle()
debug(True)


#testing
if __name__=='__main__':
    # @app.route('/')
    # @app.route('/hello')
    # @app.route('/hello/<name>')
    # def welcome(name="Stranger"):
    #     return template("Hello {{name}} !",name=name)

    # @app.route('/')
    # def landing():
    #   return static_file('index.html',root='')

    @app.route('/')
    def home():
        redirect('/index.html')

    @app.route('/<filename:path>')
    def send_static(filename):
        return static_file(filename, root='../static/')




    app.run(host='0.0.0.0', port=8080, debug=True, reloader=True)

