from flask import render_template, request, Blueprint, jsonify, abort, redirect, url_for, flash, make_response
import os
import json
from dotenv import load_dotenv

main = Blueprint('main', __name__)

@main.route('/', methods=['GET'])
@main.route('/home', methods=['GET'])
def home():
    return render_template('home.html', title='Home')