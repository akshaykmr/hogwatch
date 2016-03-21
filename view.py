def main(title='test_webview',location='http://google.com'):
	import webview
	webview.create_window(title,location);

if __name__=='__main__':
	import sys
	if(len(sys.argv)==3):
		main(sys.argv[1],sys.argv[2])
	else:
		print 'using default title and location'
		main()