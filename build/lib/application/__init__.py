from Queue import Queue
from threading import Thread
from pprint import pprint
import sys

from server.web_service import web_service
#from watchdogs.nethogs import NethogsWatchdog



if __name__=='__main__':

    if(len(sys.argv)==2 and sys.argv[1]=='server'):
        web_service()
    else :
        server=Thread(
            target=web_service
        )

        server.daemon=True
        server.start()
        from view.window import window

        window('hogwatch','http://127.0.0.1:8010/index.html')