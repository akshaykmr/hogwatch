##### A bandwidth monitor that shows per process network transfer(Alpha)

I built this project for my college assignment. It's my first python project/package for that matter. I am really overwhelmed by the response, however the application is still in early stages.

Here are some things that need to be fixed/added for eg.
 - fix some bugs on frontend
     + sort on transfer_amount instead
     + fix error #15 on switching charts
 - filter by device such as wlan,eth0 (frontend ui)
 - show more details such as pid,user with improved ui (possible for linux)
 - store history for restarts
 - proper packaging
 - unit tests

> It's been a year since I pushed this project to github. Back then I didn't think it would get this many stars.
> this project was made quickly; and had to workaround certain limitations using ineffecient techniques.

> for eg. nethogs does not show transfer speed and amount in the same trace output. for this I had to spawn 2 nethogs process with different cli args and match the the output logs using a dict later, using pid as key.

> I also spawn a new nethogs process for each new websocket connection, and therefore logs will start afresh for a new session.
> Instead I should have spawned one and collected the logs somewhere. [Netdata](https://my-netdata.io) is an awesome software I found that solves logs and realtime charts very gracefully, its architecture is somethings I wish to study later.

> This program is also not suitable for long use, As the process list will grow very large and slow down the UI.
> personally I run it only to view quick graphs when I want.
> Maybe some day I will make a much more roubust, efficient version as there is certainly interest from people.

###### *Screenshots*
<img src="http://i.imgur.com/LGQagKL.png" height="600px">
<img src="http://i.imgur.com/R9n8rMK.gif">

#### Requirements:
  - [nethogs (0.8.2 +)](https://github.com/raboof/nethogs) make sure its available in your path. This tool provides all the information and is quick to use from cli. Hogwatch gui plots graphs from this data over time.
  - python 2.7

#### Install
 -  `pip install hogwatch --upgrade` 

**update:** The package requires a pip module called pywebview for opening a webview window directly. It sometimes doesn't display output as it would on a web browser such as chrome, moreover installing it requires some additional packages on some systems as reported by users. see issue [#6](https://github.com/akshayKMR/hogwatch/issues/6) and [#4](https://github.com/akshayKMR/hogwatch/issues/4)


#### Running
As hogwatch runs a light web server. you can view using either
 1. Standalone (webview): `sudo hogwatch`   sudo is needed for nethogs. Its a bad idea to run the whole process as root. need to fix this.
 2. Web browser: `sudo hogwatch server`  view at `localhost:6432` default port. for custom port specify port eg`sudo hogwatch server 8010`. You can see this output from other devices on the network by specifying `ip` in place of localhost.

 3. Menubar: currently experimental. head to the menubar folder for instructions 
 <img src="http://i.imgur.com/jZoTllz.jpg" alt="screenshot" height="400px">

 #####Usage
  The list contains the process names.
  Initially none of the processes is selected and global(accumulated) transfer rate/amount are displayed in the ui. 
  Upon clicking one of the processes from the list, the metrics belonging to that process only will be shown. clicking on it again will toggle it off and will switch to global metrics once again.


  <b>note:</b> on osx, currently only connections are shown and are yet to be mapped to the process.

  Toggles on the top right:
     - play/pause button stops updating the graph so you may scroll it sideways without it jumping to the end with each update. In future it will also pause list transition for easier selection.
     - 5m,30m etc. are graph range selectors and determine the range window for the graph. For eg. if 5m is selected then the graph is scaled to show the latest 5 minute stats (pause and scroll for navigating history). "[ ]" button makes the range over the entire duration of the program.

<br>
<hr>
<br>

#### installation/run: (Development)
  - set up a [virtualenv](http://docs.python-guide.org/en/latest/dev/virtualenvs/)
  -  with python 2.7
  - `git clone https://github.com/akshayKMR/hogwatch.git`
  - `cd hogwatch`
  - optional: for only server mode. remove pywebview from requirements.txt and comment it from setup.py
  - `pip install -r requirements.txt --upgrade`
  - `python setup.py develop`
  - run with `sudo ./bin/hogwatch`
  - optional `sudo ./bin/hogwatch server` for only server accessible at *localhost:6432*
 
Hogwatch uses a light python webserver(bottle) feeding [nethogs](https://github.com/raboof/nethogs) trace mode output to the frontend (Vue.js) using websockets.

#### License
Copyright Akshay Kumar akshay.kmr4321@gmail.com <br>
MIT

