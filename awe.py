#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys, os, logging, pprint, json, logging.handlers,syslog
from flask import Flask, render_template, request, make_response
from jinja2 import Environment, PackageLoader
from raven import Client
from quiddi.util import logger, send
from datetime import datetime, timedelta
import local_settings
from pymongo import MongoClient
from urlparse import urlparse
from models.theme import Theme


logging.basicConfig()

config = local_settings.env
app = Flask( config.get( 'APPLICATION_NAME', 'email_render' ))
theme_logger = logging.getLogger('theme')
ql = logger(logger=theme_logger, level=logging.INFO)
uri = "localhost"
client  = MongoClient(uri)
db = client['affiliate_website']
collection = db['themes']

theme = Theme(ql, collection)


#--- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
# ERROR HANDLING 

@app.errorhandler( 500 )
def internal_500_error( exception ):
     app.logger.exception( exception )
     return pprint.pformat( exception )

@app.errorhandler( 404 )
def internal_404_error( exception ):
     app.logger.exception( exception )
     return 'awe<br/>\n%s<br/>\n%s' % ( exception, request.url ), 404

@app.errorhandler( 401 )
def internal_401_error( exception ):
     app.logger.exception( exception )
     return 'awe<br/>\n%s<br/>\n%s' % ( exception, request.url )

#--- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 

@app.route("/", methods=['GET'])
def mml():
    url = request.url_root
    domain_name = urlparse(url).netloc
    payload = theme.find_theme(domain_name)
    return render_template('index.html', payload=payload)

#--- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 

@app.route('/admin', methods=['GET','POST'])
def admin():
     if request.method == 'POST':

          return jsonify(data)
     return render_template('admin.html')

#--- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 

@app.route("/style.css", methods=['GET'])
def css():
     
    url = request.url_root
    domain_name = urlparse(url).netloc
    payload = theme.find_theme(domain_name)
    return render_template('style.css', payload=payload), 200,  { 'Content-Type': 'text/css' }
     
#--- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 

@app.route("/<page>.html", methods=['GET'])
def dynamic( page ):

    url = request.url_root
    domain_name = urlparse(url).netloc
    payload = theme.find_theme(domain_name)
    return render_template(('%s.html' % page), payload=payload)

#--- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 

if __name__ == "__main__":
     pass
else:
     app.root_path = config.get( 'HOME_DIR' )



