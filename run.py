from Queue import Queue
from threading import Thread
from pprint import pprint
import sys

from application.server.web_service import web_service
#from application.watchdogs.nethogs import NethogsWatchdog



if __name__=='__main__':

    if(len(sys.argv)==2 and sys.argv[1]=='server'):
        web_service()
    else :
        server=Thread(
            target=web_service
        )

        server.daemon=True
        server.start()
        from application.view.window import window

        window('hogwatch','http://localhost:8010/index.html')