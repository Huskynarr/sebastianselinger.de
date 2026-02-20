# sebastianselinger.de

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

This is the GitHub repository of my personal portfolio website [sebastianselinger.de](https://sebastianselinger.de "Expert Fullstack Developer & QA Automation Engineer"). This website showcases my expertise as a Fullstack Developer and QA Automation Engineer with extensive experience in the gaming industry.

The site is built with Flask (Python) backend and modern frontend technologies, featuring responsive design and comprehensive SEO optimization.

If you are interested in hiring me, please contact me using the [contact form](https://sebastianselinger.de/#contact "Let's start working together!").

## Features

- **Responsive Design**: Optimized for all devices and screen sizes
- **SEO Optimized**: Complete meta tags, structured data, and sitemap
- **Performance Focused**: Lazy loading, optimized images, and fast loading times
- **Professional Portfolio**: Showcases work experience, skills, and projects
- **Contact Integration**: Functional contact form with Formspree integration
- **Gaming Industry Focus**: Specialized content for gaming and QA automation
- **Modern Tech Stack**: Flask backend with HTML5, CSS3, and JavaScript frontend

## Tech Stack

### Backend
- **Python 3.8+**
- **Flask** - Lightweight web framework
- **Jinja2** - Template engine

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with animations
- **JavaScript** - Interactive functionality
- **Bootstrap** - Responsive grid system
- **Font Awesome** - Icon library

### Development Tools
- **ESLint** - JavaScript linting
- **Git** - Version control
- **GitHub Actions** - CI/CD pipeline

## Prerequisites

Before running this project, make sure you have the following installed:

- **Python 3.8 or higher**
- **pip** (Python package installer)
- **Git** (for cloning the repository)

## Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Huskynarr/sebastianselinger.de.git
cd sebastianselinger.de
```

### 2. Create Virtual Environment (Recommended)

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

### 3. Install Dependencies

```bash
# Install Flask and other dependencies
pip install -r requirements.txt
```

### 4. Run the Development Server

```bash
# Run the Flask application
python index.py
```

The application will start on `http://localhost:5001` by default.

### 5. Development Commands

```bash
# Run with debug mode (auto-reload on changes)
export FLASK_ENV=development  # On Windows: set FLASK_ENV=development
python index.py

# Run on different port
python -c "from index import app; app.run(debug=True, port=8000)"

# Regenerate language landing pages after editing index.html
./scripts/generate-language-pages.sh
```

## Deployment

### GitHub Pages Deployment

This project is automatically deployed to GitHub Pages using GitHub Actions.

1. **Automatic Deployment**: Push to `main` branch triggers automatic deployment
2. **Custom Domain**: Configured with `CNAME` file for `sebastianselinger.de`
3. **SSL Certificate**: Automatically managed by GitHub Pages

### Manual Deployment Options

#### Option 1: Static File Deployment

```bash
# Deploy to any static hosting service
# (Netlify, Vercel, AWS S3, etc.)
# Simply upload the files to your hosting provider
```

#### Option 2: Flask Server Deployment

```bash
# Production server setup
pip install gunicorn

# Run with Gunicorn
gunicorn -w 4 -b 0.0.0.0:8000 index:app

# Or with specific configuration
gunicorn --config gunicorn.conf.py index:app
```

#### Option 3: Docker Deployment

```bash
# Build Docker image
docker build -t sebastianselinger-portfolio .

# Run container
docker run -p 5001:5001 sebastianselinger-portfolio
```

### Environment Variables

For production deployment, set these environment variables:

```bash
FLASK_ENV=production
FLASK_DEBUG=False
SECRET_KEY=your-secret-key-here
```

## Project Structure

```
sebastianselinger.de/
├── index.py                 # Flask application entry point
├── requirements.txt         # Python dependencies
├── gunicorn.conf.py        # Gunicorn configuration
├── Dockerfile              # Docker configuration
├── CNAME                   # Custom domain configuration
├── sitemap.xml             # SEO sitemap
├── robots.txt              # Search engine instructions
├── README.md               # Project documentation
├── index.html              # Main HTML source (single source of truth)
├── de/
│   └── index.html          # Generated German landing page
├── en/
│   └── index.html          # Generated English landing page
├── scripts/
│   └── generate-language-pages.sh  # Regenerates /de and /en pages from index.html
├── css/
│   ├── style.css           # Main stylesheet
│   ├── responsive.css      # Responsive design
│   ├── professional-enhancements.css  # SEO & UX improvements
│   └── ...                 # Other CSS files
├── js/
│   ├── custom.js           # Custom JavaScript
│   └── ...                 # Other JS libraries
├── images/
│   ├── about-me.jpeg       # Profile image
│   ├── logos/              # Company logos
│   ├── projects/           # Portfolio images
│   └── slider/             # Background images
└── static/                 # Static assets
    ├── css/
    └── js/
```

## Configuration

### Flask Configuration

The Flask app is configured in `index.py`:

```python
from flask import Flask, send_from_directory

app = Flask(__name__)

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

if __name__ == '__main__':
    app.run(debug=True, port=5001)
```

### SEO Configuration

- **Sitemap**: `sitemap.xml` for search engine indexing
- **Robots**: `robots.txt` for crawler instructions
- **Meta Tags**: Comprehensive SEO meta tags in HTML
- **Structured Data**: JSON-LD schema for rich snippets

## Testing

### Local Testing

```bash
# Test the Flask application locally
python index.py

# Test with different Python versions
python3.8 index.py
python3.9 index.py
python3.10 index.py
```

### SEO Testing

```bash
# Test sitemap accessibility
curl http://localhost:5001/sitemap.xml

# Test robots.txt
curl http://localhost:5001/robots.txt

# Validate HTML structure
# Use online validators or tools like html5validator
```

## Performance Optimization

### Image Optimization
- Use WebP format where possible
- Implement lazy loading
- Optimize image sizes for different devices

### CSS/JS Optimization
- Minify CSS and JavaScript files
- Use CDN for external libraries
- Implement critical CSS loading

### Caching Strategy
- Set appropriate cache headers
- Use browser caching for static assets
- Implement service worker for offline functionality

## SEO Features

- **Complete Meta Tags**: Title, description, keywords, Open Graph, Twitter Cards
- **Structured Data**: JSON-LD schema for person and organization
- **Sitemap**: XML sitemap for search engines
- **Robots.txt**: Optimized crawler instructions
- **Semantic HTML**: Proper heading structure and ARIA labels
- **Mobile Optimization**: Responsive design and mobile-first approach

## Build Status

[![ESLint](https://github.com/Huskynarr/sebastianselinger.de/actions/workflows/eslint.yml/badge.svg)](https://github.com/Huskynarr/sebastianselinger.de/actions/workflows/eslint.yml)

[![pages-build-deployment](https://github.com/Huskynarr/sebastianselinger.de/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/Huskynarr/sebastianselinger.de/actions/workflows/pages/pages-build-deployment)

## Contributing

If you'd like to contribute or report any issues, please [open a new issue](https://github.com/Huskynarr/sebastianselinger.de/issues) or submit a pull request. I welcome any feedback and suggestions to improve the website.

### Development Guidelines

1. **Code Style**: Follow PEP 8 for Python code
2. **Commit Messages**: Use conventional commit format
3. **Testing**: Add tests for new features
4. **Documentation**: Update README for significant changes

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

**Sebastian Selinger**
- Website: [sebastianselinger.de](https://sebastianselinger.de)
- LinkedIn: [Sebastian Selinger](https://www.linkedin.com/in/SebastianSelinger/)
- Email: [Contact Form](https://sebastianselinger.de/#contact)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/Huskynarr/sebastianselinger.de.svg?style=for-the-badge
[contributors-url]: https://github.com/Huskynarr/sebastianselinger.de/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Huskynarr/sebastianselinger.de.svg?style=for-the-badge
[forks-url]: https://github.com/Huskynarr/sebastianselinger.de/network/members
[stars-shield]: https://img.shields.io/github/stars/Huskynarr/sebastianselinger.de.svg?style=for-the-badge
[stars-url]: https://github.com/Huskynarr/sebastianselinger.de/stargazers
[issues-shield]: https://img.shields.io/github/issues/Huskynarr/sebastianselinger.de.svg?style=for-the-badge
[issues-url]: https://github.com/Huskynarr/sebastianselinger.de/issues
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/sebastianselinger
[product-screenshot]: images/screenshot.png
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
