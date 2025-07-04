function addMetaTags(keywords) {
    const head = document.head;

    // Create and add meta tags
    const metaTags = [
        { name: 'description', content: 'Welcome to My Blog! Explore a collection of informative and engaging articles on various topics.' },
        { name: 'keywords', content: keywords.join(', ') },
        { name: 'author', content: 'Your Name' },
        { property: 'og:title', content: 'My Blog - Explore Informative Articles' },
        { property: 'og:description', content: 'Discover a collection of engaging and informative articles on various topics. Join us in exploring the world of knowledge.' },
        { property: 'og:image', content: 'path/to/your/og-image.jpg' },
        { property: 'og:url', content: 'https://www.yourblogwebsite.com' }
    ];

    metaTags.forEach(tag => {
        const metaTag = document.createElement('meta');
        for (const attr in tag) {
            metaTag.setAttribute(attr, tag[attr]);
        }
        head.appendChild(metaTag);
    });

    // Add title tag
    const titleTag = document.createElement('title');
    titleTag.textContent = 'My Blog - Explore Informative Articles';
    head.appendChild(titleTag);
}




function createNavbar() {
    const navbar = document.createElement('nav');
    navbar.classList.add('navbar', 'navbar-expand-sm', 'navbar-dark', 'bg-primary', 'rounded', 'shadow', 'mb-3');

    const container = document.createElement('div');
    container.classList.add('container');

    const brandLink = document.createElement('a');
    brandLink.classList.add('navbar-brand');
    brandLink.href = '#';
    brandLink.textContent = 'Blogs';

    const toggleButton = document.createElement('button');
    toggleButton.classList.add('navbar-toggler', 'ml-auto');
    toggleButton.type = 'button';
    toggleButton.setAttribute('data-toggle', 'collapse');
    toggleButton.setAttribute('data-target', '#navbarSupportedContent');
    toggleButton.setAttribute('aria-controls', 'navbarSupportedContent');
    toggleButton.setAttribute('aria-expanded', 'false');
    toggleButton.setAttribute('aria-label', 'Toggle navigation');
    toggleButton.innerHTML = '<span class="navbar-toggler-icon"></span>';

    const ul = document.createElement('ul');
    ul.classList.add('navbar-nav', 'mr-auto');

    const homeNavItem = document.createElement('li');
    homeNavItem.classList.add('nav-item');
    const homeLink = document.createElement('a');
    homeLink.classList.add('nav-link');
    homeLink.href = 'blog.html';
    homeLink.textContent = 'Home';
    homeNavItem.appendChild(homeLink);
    ul.appendChild(homeNavItem);

    const portfolioNavItem = document.createElement('li');
    portfolioNavItem.classList.add('nav-item');
    const portfolioLink = document.createElement('a');
    portfolioLink.classList.add('ml-4', 'mt-1', 'btn', 'btn-light', 'btn-sm');
    portfolioLink.href = 'https://abhisindh.netlify.app';
    portfolioLink.textContent = 'Go to portfolio';
    portfolioNavItem.appendChild(portfolioLink);
    ul.appendChild(portfolioNavItem);

    container.appendChild(brandLink);
    container.appendChild(toggleButton);
    container.appendChild(ul);
    navbar.appendChild(container);

    document.body.appendChild(navbar);
}





createNavbar();
