import sys, webview

def window(title='window',location='http://google.com'):
	
	webview.create_window(title,location, resizable=True,width=480,height=720);

if __name__=='__main__':

	if(len(sys.argv)==3):
		window(sys.argv[1],sys.argv[2])
	else:
		print 'using http://localhost:6432 as view'
		window('bandwidth monitor',location='http://localhost:6432/index.html')