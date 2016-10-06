import subprocess, sys
from Queue import Queue
from pprint import pprint
from decimal import Decimal
import time

import atexit

class NethogsWatchdog :
    def __init__(self,debug=False,devices=[],delay=1):

        from sys import platform as _platform
        if _platform == "linux" or _platform == "linux2":
            pass
            # linux
        elif _platform == "darwin":
            if len(devices)==0:
                #devices=['en0']
                pass
        elif _platform == "win32":
            print "Windows is not supported."
        self.devices=devices
        self.delay=str(delay)
        self.debug=debug

        self._running=True

    def terminate(self):
        self._running=False

    def watch_transfer(self,mode='transfer_rate',bridge={}):
        #param 0=rate, 3 amount in MB

        if mode not in ['transfer_rate','transfer_amount']:
            raise ValueError('mode not supported')

        if mode=='transfer_rate':   
            param='0'
        else:
            param='1'

        cmd=['nethogs','-d',self.delay, '-v',param,'-t']+self.devices
        if self.debug:
            print cmd

        p = subprocess.Popen(cmd, stdout=subprocess.PIPE, bufsize=1)
        atexit.register(p.terminate)

        # need json output :/
        refresh_flag=True
        report={}
        report['mode']=mode
        report['running']=True
        report['ctr']=0 

        entries=[]      
        for line in iter(p.stdout.readline, b''):

            if(self._running==False):
                break

            #print line
            if(line.find('Refreshing')==-1):

                if refresh_flag:
                    continue

                split=line.split()
                if(len(split)!=3):
                    continue

                entry={}
                entry['process']=split[0]


                if(mode=='transfer_rate'):
                    entry['kbps_out']=float(split[1])
                    entry['kbps_in']=float(split[2])
                else: #mode is 'transfer_amount'
                    entry['kb_out']=float(split[1])
                    entry['kb_in']=float(split[2])

                entries.append(entry)
            else:
                if refresh_flag:
                    refresh_flag=False 
                    continue

                if(len(entries)==0):
                    continue
                
                total_in,total_out= 0,0
                for entry in entries:
                    if(report['mode']=='transfer_rate'):
                        total_in+=entry['kbps_in']
                        total_out+=entry['kbps_out']
                    else:
                        total_in+=entry['kb_in']
                        total_out+=entry['kb_out']

                report['total_in']=total_in
                report['total_out']=total_out
                report['entries']=entries
                report['ctr']+=1
                entries=[]

                if self.debug:
                    pprint(report)
                else:
                    report['timestamp']=int(round(time.time() * 1000)) #js time format
                    bridge['queue'].put(report)

        p.terminate()
        if self.debug:
            print 'exited nethogs'
        else:
            report={}
            report['running']=False
            bridge['queue'].put(report)  
       

if __name__=='__main__':

    x=NethogsWatchdog(debug=True,devices=sys.argv[1:])
    x.watch_transfer()