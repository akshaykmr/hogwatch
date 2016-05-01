#####A bandwidth monitor that shows per process network transfer(Alpha)

I built this project for my college assignment. It's my first python project/package for that matter.
I am really overwhelmed by the response. However the project is still very much unfinished.

Here are somethings that need to be fixed/added for eg.

 - fix some bugs on frontend.(proper sort on listing/chart switching etc.)
 - kill nethogs process on exit // fails sometimes
 - store history for restarts
 - proper packaging
 - unit tests

######*Screenshots*
<img src="http://i.imgur.com/LGQagKL.png" height="600px">
<img src="http://i.imgur.com/R9n8rMK.gif">

#####requirements:
  - [nethogs (0.8.2 +)](https://github.com/raboof/nethogs) make sure its available in your path.
  - python 2.7

#####Install
 -  `pip install hogwatch`

#####Running
As hogwatch runs a light web server. you can view using either
 1. Open window: `sudo hogwatch`   sudo is needed for nethogs. Its a bad idea to run the whole process as root. need to fix this.
 2. Web browser: `sudo hogwatch server`  view at `localhost:6432` default port. for custom port specify port eg`sudo hogwatch server 8010`. You can see this output from other devices on the network by specifying `ip` in place of localhost.

 3. Menubar: currently just for testing. go to the menubar folder for instructions 
 <img src="http://i.imgur.com/jZoTllz.jpg" alt="screenshot" height="400px">
<br>
 <hr>
 <br>

#####installation/run: (Development)
  - `git clone https://github.com/akshayKMR/hogwatch.git`
  - `cd hogwatch`
  - `pip install -r requirements.txt`
  - `sudo python setup.py install`
  - run with `sudo ./hogwatch`
  - optional `sudo ./hogwatch server` for only server accessible at *localhost:6432*


####Contributing
Hogwatch uses a light python webserver(bottle) feeding [nethogs](https://github.com/raboof/nethogs) trace mode output to the frontend (Vue.js) using websockets. You can contribute in Python/C++/Javascript.

####License
Copyright Akshay Kumar akshay.kmr4321@gmail.com <br>
MIT

