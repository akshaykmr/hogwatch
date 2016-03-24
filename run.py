from Queue import Queue
from threading import Thread
from pprint import pprint

from application.server.web_service import web_service
#from application.watchdogs.nethogs import NethogsWatchdog



if __name__=='__main__':

    # q=Queue()
    # devices=['eth0']
    # eth0=NethogsWatchdog([q],devices)
    server=Thread(
        target=web_service
    )
    # transfer_rate = Thread(
    #     target=eth0.watch_transfer,
    #     args=('transfer_rate',)
    # )

    server.daemon=True
    server.start()
    # transfer_rate.daemon=True
    # transfer_rate.start()
    print 'threads running'



    from application.view.window import window

    window('hogwatch','http://10.211.55.9:8010')