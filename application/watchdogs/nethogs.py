import subprocess, sys
from pprint import pprint

#todo learn logging

class TransferWatchdog :
    def __init__(self,output_queues,devices=[],delay=1):
        self.devices=devices
        self.output_queues=output_queues
        self.delay=str(delay)

    def watch_transfer(self,mode='0'):
        '''mode 0=kb/s 3=amount in MB'''

        cmd=['nethogs','-d',self.delay, '-v',mode,'-t']+self.devices
        print cmd
        p = subprocess.Popen(cmd, stdout=subprocess.PIPE, bufsize=1)

        refresh_flag=True #naming is tough...
        report={}
        if(mode=='0'):
            report['mode']='transfer_rate'
        if(mode=='3'):
            report['mode']='transfer_amount'

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

                if(mode=='0'):
                    #kbps out/in
                    entry['kbps_out']=float(split[1])
                    entry['kbps_in']=float(split[2])
                else:
                    #MB out/in
                    entry['mb_out']=float(split[1])
                    entry['mb_in']=float(split[2])

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
                entries=[]
                pprint(report)

        p.stdout.close()
        p.wait()


if __name__=='__main__':

    x=TransferWatchdog('no_queue',sys.argv[1:])
    x.watch_transfer()