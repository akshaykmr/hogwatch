import subprocess

#todo learn logging

class TransferWatchdog :
    def __init__(self,output_queues,devices=[],delay=1):
        self.devices=devices
        self.output_queues=output_queues
        self.delay=str(delay)

    def watch_transfer(self,mode='0'):
        '''mode 0=kb/s 3=amount in MB'''

        cmd=['sudo','nethogs','-d',self.delay, '-v',mode]+self.devices
        print cmd
        p = subprocess.Popen(cmd, stdout=subprocess.PIPE, bufsize=1)        
        for line in iter(p.stdout.readline, b''):
            print line

        p.stdout.close()
        p.wait()


x=TransferWatchdog(123,['en0'])
x.watch_transfer()