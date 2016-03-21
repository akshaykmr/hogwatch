from bottle import Bottle, route, run, template, static_file
app=Bottle()


#testing
if __name__=='__main__':
	# @app.route('/')
	# @app.route('/hello')
	# @app.route('/hello/<name>')
	# def welcome(name="Stranger"):
	#     return template("Hello {{name}} !",name=name)

	# @app.route('/')
	# def landing():
	# 	return static_file('index.html',root='')

	@app.route('/<filename:path>')
	def send_static(filename):
	    return static_file(filename, root='./static/')


	app.run(host='localhost', port=8080, debug=True, reloader=True)

