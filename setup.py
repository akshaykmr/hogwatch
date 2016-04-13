from distutils.core import setup

setup(
    # Application name:
    name="hogwatch",

    # Version number (initial):
    version="0.1.0",

    # Application author details:
    author="Akshay Kumar",
    author_email="akshay.kmr4321@gmail.com",

    # Packages
    packages=["application"],

    # Include additional files into the package
    include_package_data=True,

    # Details
    url="https://github.com/akshayKMR/hogwatch",

    #
    license="LICENSE.txt",
    description="bandwidth monitoring tool",

    long_description=open("README.txt").read(),

    # Dependent packages (distributions)
    install_requires=[
        "bottle",
        'pywebview',
        'gevent-websocket',
	    'netifaces'
    ],
)
