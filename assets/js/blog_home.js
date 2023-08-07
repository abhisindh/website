import { blogList } from "./blog_data.js";
import { gotoBlog } from "./blog_maker.js";

const blog_page_container = document.getElementById('blogContainer'); 

// Function to create a blog card element
function createBlogCard(blog) {
    const blogCard = document.createElement('div');
    blogCard.classList.add('blog-card');
    blogCard.id = blog.id;

    const headerDiv = document.createElement('div');
    headerDiv.classList.add('blog-card-header');
    const img = document.createElement('img');
    img.src = blog.header_img || '../blogs/images/000.jpg';
    img.alt = blog.title || 'Untitled blog';
    img.classList.add('blog-card-img');
    headerDiv.appendChild(img);
    blogCard.appendChild(headerDiv);

    const bodyDiv = document.createElement('div');
    bodyDiv.classList.add('blog-card-body');
    const title = document.createElement('h5');
    title.classList.add('blog-card-title');
    title.textContent = blog.title || 'Untitled blog';
    bodyDiv.appendChild(title);

    const authorLink = document.createElement('p');
    authorLink.classList.add('blog-card-caption');
    const authorAnchor = document.createElement('a');
    authorAnchor.href = '#';
    authorAnchor.textContent = `By: ${blog.author || 'Unknown author'}`;
    authorLink.appendChild(authorAnchor);
    bodyDiv.appendChild(authorLink);

    const description = document.createElement('p');
    description.textContent = blog.description || 'No description available';
    bodyDiv.appendChild(description);

    const readMoreDiv = document.createElement('a'); // Changed from 'div' to 'a'
    readMoreDiv.id = blog.id || '000';
    readMoreDiv.classList.add('blog-card-link');
    readMoreDiv.href = blog.path; // Set the href attribute to the blog path
    readMoreDiv.textContent = 'Read more';
    const icon = document.createElement('i');
    icon.classList.add('ti-angle-double-right');
    readMoreDiv.appendChild(icon);
    bodyDiv.appendChild(readMoreDiv);

    blogCard.appendChild(bodyDiv);

    return blogCard;
}


// Get the container where the blog cards will be added


// Loop through the blog list and create and append blog cards
if (blog_page_container){
    blogList.forEach(blog => {
        const blogCard = createBlogCard(blog);
        blog_page_container.appendChild(blogCard);
    })
};

export function n_blog_cards(container, num){
    for (let i=0; i< num; i++){
        const blogCard = createBlogCard(blogList[i]);
        container.appendChild(blogCard);
    }
}