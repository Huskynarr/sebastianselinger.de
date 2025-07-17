from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__, static_folder='.', static_url_path='')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/css/<path:filename>')
def css_files(filename):
    return send_from_directory('css', filename)

@app.route('/js/<path:filename>')
def js_files(filename):
    return send_from_directory('js', filename)

@app.route('/images/<path:filename>')
def image_files(filename):
    return send_from_directory('images', filename)

@app.route('/files/<path:filename>')
def file_downloads(filename):
    return send_from_directory('files', filename)

if __name__ == '__main__':
    app.run(debug=True, port=5001) 