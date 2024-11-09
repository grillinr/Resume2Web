from flask import render_template, request, Blueprint, jsonify, abort, redirect, url_for, flash, make_response
import os
import json
from dotenv import load_dotenv

main = Blueprint('main', __name__)

@main.route('/data')
def data():
    return {
        'Name':"geek", 
        "Age":"22",
        "Date":"1999-01-01", 
        "programming":"python"
        }