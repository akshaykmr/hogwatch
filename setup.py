from distutils.core import setup

setup(
    # Application name:
    name="bandwidth_monitor",

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
    url="http://localhost:8080",

    #
    license="LICENSE.txt",
    description="Useful towel-related stuff.",

    long_description=open("README.txt").read(),

    # Dependent packages (distributions)
    install_requires=[
        "bottle",
        'pywebview',
        'gevent-websocket'
    ],
)