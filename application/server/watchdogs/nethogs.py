import subprocess, sys
from Queue import Queue
from pprint import pprint
from threading import Event
import time

#todo learn logging

class NethogsWatchdog :
    def __init__(self,debug=False,devices=[],delay=1):
        self.devices=devices
        self.delay=str(delay)
        self.debug=debug

    def watch_transfer(self,mode='transfer_rate',bridge={}):
        #param 0=rate, 3 amount in MB

        if mode not in ['transfer_rate','transfer_amount']:
            raise ValueError('mode not supported')

        if mode=='transfer_rate':   
            param='0'
        else:
            param='3'

        cmd=['nethogs','-d',self.delay, '-v',param,'-t']+self.devices
        if self.debug:
            print cmd
        p = subprocess.Popen(cmd, stdout=subprocess.PIPE, bufsize=1)

        refresh_flag=True #naming is tough...
        report={}
        report['mode']=mode
        report['ctr']=0 

        entries=[]      
        for line in iter(p.stdout.readline, b''):
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
                    #kbps out/in
                    #meh I dont care for decimal precision with kbps
                    entry['kbps_out']=int(float(split[1]))
                    entry['kbps_in']=int(float(split[2]))
                else: #mode is 'transfer_amount'
                    #MB out/in
                    entry['mb_out']=int(float(split[1]))
                    entry['mb_in']=int(float(split[2]))

                entries.append(entry)
            else:
                if refresh_flag:
                    refresh_flag=False 
                    continue

                if(len(entries)==0):
                    continue
                
                # print '\n'
                # pprint(entries)
                total_in,total_out= 0,0
                for entry in entries:
                    if(report['mode']=='transfer_rate'):
                        total_in+=entry['kbps_in']
                        total_out+=entry['kbps_out']
                    else:
                        total_in+=entry['mb_in']
                        total_out+=entry['mb_out']

                report['total_in']=total_in
                report['total_out']=total_out
                report['entries']=entries
                report['ctr']+=1 # I dont know why there is a race condition here -_-'
                entries=[]

                if self.debug:
                    pprint(report)
                else:
                    report['timestamp']=int(round(time.time() * 1000))
                    bridge['queue'].put(report)

        p.stdout.close()

        if self.debug:
            p.wait()
        else:
            bridge['event'].wait()


if __name__=='__main__':

    x=NethogsWatchdog(debug=True,devices=sys.argv[1:])
    x.watch_transfer()