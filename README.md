#####A bandwidth monitor that shows per process network transfer(alpha)
 
######*Screenshots*
<img src="http://i.imgur.com/COOQXlq.png" height="600px">
<img src="http://i.imgur.com/HSBJRsT.png" height="600px">
#####requirements:
  - [nethogs (0.8.2 +)](https://github.com/raboof/nethogs) make sure its available in your path
  - python 2.7

#####installation: (dev)
  - `git clone https://github.com/akshayKMR/hogwatch.git`
  - `cd hogwatch`
  - `pip install -r requirements.txt`
  - `sudo python setup.py install`
  - run with `sudo ./hogwatch`
  - optional `sudo ./hogwatch server` for only server accessible at *localhost:8010*
  
Output can also be seen from a different machine on the network. `http://hostnameORipAddress:8010`
  
