const counter = document.getElementById('character_limit');
const textArea = document.getElementById('text-area-post');
let loading = true;
let postLastPostId = 4;
let posts = [];
const feed = document.getElementById('feed');