const formatLikes= (likes) => {
    if(!typeof likes == 'Number' ) return 0;
    if(likes >= 1000 & likes < 1000000) return (likes / 1000).toFixed(1) + 'K';
    if(likes >= 1000000 & likes < 1000000000) return (likes / 1000000).toFixed(1) + 'M';
    if(likes >= 1000000000 ) return (likes / 1000000000).toFixed(1) + 'B';
    return likes;
}

const returnResults = async () => {
    return await fetchPosts();
}

const fetchPosts = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            fetch('./public/data/posts.json')
            .then(res => res.json())
            .then(data => resolve(data))
            .catch(e => {
                loading = false;
                reject([]);
            })
        }, 2000); 
    });
}

function like (_id) {
    if(!_id) return;
    const post = document.getElementById(`${_id}`);
    if(!post) return;
    const buttonElement = document.getElementById(`like_post_${_id}`);
    let likedPost = posts.find(x => x._id === _id);
    if(!likedPost) return;
    const like = likedPost.liked;
    likedPost.liked = !likedPost.liked;
    likedPost.likes = like ? likedPost.likes-1 : likedPost.likes+1;
    const textElement = document.getElementById(`text_like_postId_${_id}`);
    textElement.innerText = formatLikes(likedPost.likes);
    buttonElement.innerHTML = `<ion-icon name=${like ? "heart-outline" : "heart"} color="danger"></ion-icon>`
}

function postSomething() {
    const value = document.getElementById("text-area-post").value;
    if(!value || value.length < 4 || value.length > 300) return;
    const post = {_id: postLastPostId+1,postedBy:{name: "Guest", title: "Tester", photo: "public/images/avatar-default-icon.png",_id:2}, text: value, likes: 0, liked: false, date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()}`, hyperlink:'', img: '', };
    posts.unshift(post);
    renderPost(post, 'reverse');
    document.getElementById("text-area-post").value = '';
    dialog.close();
    postLastPostId++;
}