from flask import Flask, redirect, send_from_directory

app = Flask(__name__, static_folder='.', static_url_path='')


def serve_root_index():
    return send_from_directory('.', 'index.html')


@app.route('/')
def index():
    return serve_root_index()


@app.route('/de')
def index_de_redirect():
    return redirect('/de/', code=302)


@app.route('/en')
def index_en_redirect():
    return redirect('/en/', code=302)


@app.route('/de/')
def index_de():
    return send_from_directory('de', 'index.html')


@app.route('/en/')
def index_en():
    return send_from_directory('en', 'index.html')

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


@app.after_request
def set_security_headers(response):
    response.headers['Content-Security-Policy'] = (
        "default-src 'self'; "
        "script-src 'self' https://www.googletagmanager.com 'unsafe-inline'; "
        "style-src 'self'; "
        "img-src 'self' data: https:; "
        "font-src 'self' data: https:; "
        "connect-src 'self' https://formspree.io https://www.google-analytics.com; "
        "object-src 'none'; "
        "base-uri 'self'; "
        "frame-ancestors 'none'; "
        "upgrade-insecure-requests"
    )
    response.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin'
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'DENY'
    response.headers['Permissions-Policy'] = 'geolocation=(), camera=(), microphone=()'
    response.headers['Cross-Origin-Opener-Policy'] = 'same-origin'
    response.headers['Cross-Origin-Resource-Policy'] = 'same-site'
    response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains; preload'
    return response


if __name__ == '__main__':
    app.run(debug=True, port=5001) 
