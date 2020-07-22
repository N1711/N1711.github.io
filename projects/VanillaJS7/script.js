const postsContainer = document.querySelector('#posts-container');
const loader = document.querySelector('#loader');
const modal = document.querySelector('#modal'),
postBtn = document.querySelector('#postBtn');

const limit = 5;
let page = 1;

const fetchPosts = (p) => {
    loader.style.visibility = 'hidden';
    fetch(`https://jsonplaceholder.typicode.com/posts?_page=${p}&_limit=${limit}`)
    .then(res => res.json())
    .then(data => {
        data.forEach(element => {
            const el = document.createElement('div');
            el.classList.add('post');
            el.innerHTML = `
            <div class="postNumber" id="postNumber">${element.id}</div>
            <div class="postTitle" id="postTitle">${element.title}</div>
            <div class="postBody" id="postBody">${element.body}</div>
            `;
            postsContainer.appendChild(el);
        })
    })
}

fetchPosts(page);

document.addEventListener('scroll', (e) => {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        // you're at the bottom of the page
        setTimeout(() => {
            loader.style.visibility = 'visible';
            page++;
            setTimeout(() => {
                fetchPosts(page);
            }, 500)
        }, 500);
        
      }
});

postBtn.addEventListener('click', () => {
    modal.style.visibility = 'visible';
});

window.addEventListener('click', (e) => {
    if(e.target == modal) {
        modal.style.visibility = 'hidden';
    }
})