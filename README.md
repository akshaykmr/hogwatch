#####A bandwidth monitor that shows per process network transfer(alpha)
 
######*Screenshots*
<img src="http://i.imgur.com/LGQagKL.png" height="600px">
<img src="http://i.imgur.com/R9n8rMK.gif">

#####requirements:
  - [nethogs (0.8.2 +)](https://github.com/raboof/nethogs) make sure its available in your path.
  - python 2.7

#####Install
 -  `sudo pip install hogwatch`

#####Running
As hogwatch runs a light web server. you can view using either
 1. `sudo hogwatch`   opens window. sudo is needed for nethogs
 2. `sudo hogwatch server`  view at `localhost:6432` default port. for custom port specify port eg`sudo hogwatch server 8010`. You can see this output from other devices on the network by specifying `ip` in place of localhost.
 3. 
<br>
 <hr>
 <br>

#####installation/run: (Development)
  - `git clone https://github.com/akshayKMR/hogwatch.git`
  - `cd hogwatch`
  - `pip install -r requirements.txt`
  - `sudo python setup.py install`
  - run with `sudo ./hogwatch`
  - optional `sudo ./hogwatch server` for only server accessible at *localhost:8010*


####Contributing/Current bugs
Hogwatch uses a light python webserver(bottle) feeding [nethogs](https://github.com/raboof/nethogs) trace mode output to the frontend (Vue.js) using websockets. You can contribute in Python/C++/Javascript.

####License
Copyright Akshay Kumar akshay.kmr4321@gmail.com <br>
GNU General Public License v3 (GPL-3)
  
