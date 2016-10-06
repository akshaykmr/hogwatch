from distutils.core import setup
from setuptools import find_packages

import os

def read(fname):
    return open(os.path.join(os.path.dirname(__file__), fname)).read()

setup(
    # Application name:
    name="hogwatch",

    # Version number (initial):
    version="0.1.8",

    # Application author details:
    author="Akshay Kumar",
    author_email="akshay.kmr4321@gmail.com",

    # Packages
    packages=find_packages(),
    scripts=["bin/hogwatch"],

    # Include additional files into the package
    include_package_data=True,

    # Details
    url="https://github.com/akshayKMR/hogwatch",
    #setup_requires=['setuptools-markdown'],
    #long_description_markdown_filename='README.md',

    #
    license="MIT" ,
    description="find out whats hogging your internet",

    long_description="A bandwidth monitor that shows per process network transfer",

    # Dependent packages (distributions)
    install_requires=[
        "bottle",
        'pywebview',
        'gevent-websocket',
	    'netifaces'
    ],
)
