import sys, webview

def test_webview(title='test_webview',location='http://google.com'):
	
	webview.create_window(title,location, resizable=True);

if __name__=='__main__':

	if(len(sys.argv)==3):
		test_webview(sys.argv[1],sys.argv[2])
	else:
		print 'using http://localhost:8080 as view'
		test_webview('bandwidth monitor',location='http://localhost:8080/index.html')