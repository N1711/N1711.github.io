const musicContainer = document.querySelector('#music-container'),
title = document.querySelector('#title'),
progress = document.querySelector('#progress'),
progressContainer = document.querySelector('#progress-container');
audio = document.querySelector('#audioPlayer'),
cover = document.querySelector('#cover'),
prev = document.querySelector('#prev'),
play = document.querySelector('#play'),
next = document.querySelector('#next');

const songs = ['ocean', 'motivate', 'victory'];
const songNames = ['Ocean Drive', 'Motivated and Ready', 'Victory over Fear'];
let songIndex = 0;

loadSong(songs[songIndex], songNames[songIndex]);

//Load Song function
function loadSong(song, songName) {
    audio.src = `music/${song}.mp3`;
    cover.src = `img/${song}.jpg`;
    title.innerText = songName;
}

//Play Song
function playSong() {
    musicContainer.classList.add('play');
    play.innerHTML = `<i class="fa fa-pause" aria-hidden="true">`;
    audio.play();
}
//Pause Song
function pauseSong() {
    musicContainer.classList.remove('play');
    play.innerHTML = `<i class="fa fa-play" aria-hidden="true">`;
    audio.pause();
}

//Previous function
function prevSong() {
    songIndex --;
    (songIndex < 0) ? songIndex = songs.length - 1 : '';
    loadSong(songs[songIndex], songNames[songIndex]);
    playSong();
}

//Next function
function nextSong() {
    songIndex++;
    (songIndex > songs.length - 1) ? songIndex = 0 : '';
    loadSong(songs[songIndex], songNames[songIndex]);
    playSong();
}
//Progress click
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

//updateProgress
function updateProgress(e) {
    const {duration, currentTime} = e.srcElement;
    const progressUpdate = (currentTime / duration) * 100;
    progress.style.width = `${progressUpdate}%`;
}

//Event Listeners
play.addEventListener('click', () => {
    (musicContainer.classList.contains('play')) ? pauseSong() : playSong();
})

prev.addEventListener('click', prevSong);

next.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', nextSong)
progressContainer.addEventListener('click', setProgress);

