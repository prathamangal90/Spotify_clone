console.log("Welcome to Spotify");

// ===== Variables =====
let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Warriyo - Mortals", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "DEAF KEV - Invincible", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "My Heart", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Heroes Tonight", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Rabba", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Sakhiyaan", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Bhula Dena", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Tumhari Kasam", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Na Jaana", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
];

// ===== Load Covers & Names =====
songItems.forEach((el, i)=>{
    el.getElementsByTagName("img")[0].src = songs[i].coverPath;
    el.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// ===== Helpers =====
function formatTime(sec){
    let m = Math.floor(sec/60);
    let s = Math.floor(sec%60);
    if(s<10) s = "0"+s;
    return m + ":" + s;
}

function resetAllSongTimes(){
    let times = document.getElementsByClassName('songTime');
    for(let t of times) t.innerText = "00:00";
}

function makeAllPlays(){
    Array.from(document.getElementsByClassName('songItemPlay')).forEach(el=>{
        el.classList.remove('fa-pause-circle');
        el.classList.add('fa-play-circle');
    });
}

function updateMainIcon(){
    if(audioElement.paused){
        masterPlay.classList.replace('fa-pause-circle','fa-play-circle');
        gif.style.opacity = 0;
    } else {
        masterPlay.classList.replace('fa-play-circle','fa-pause-circle');
        gif.style.opacity = 1;
    }
}

function playSong(){
    resetAllSongTimes();
    makeAllPlays();

    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();

    document.getElementById(songIndex).classList.replace('fa-play-circle','fa-pause-circle');
    updateMainIcon();
}

// ===== Side Play Buttons =====
Array.from(document.getElementsByClassName('songItemPlay')).forEach(el=>{
    el.addEventListener('click',(e)=>{
        let clicked = parseInt(e.target.id);

        if(songIndex === clicked){
            if(audioElement.paused){
                audioElement.play();
                e.target.classList.replace('fa-play-circle','fa-pause-circle');
            } else {
                audioElement.pause();
                e.target.classList.replace('fa-pause-circle','fa-play-circle');
            }
        } else {
            songIndex = clicked;
            playSong();
        }

        updateMainIcon();
    });
});

// ===== Master Play =====
masterPlay.addEventListener('click', ()=>{
    if(!audioElement.src) playSong();
    else{
        if(audioElement.paused) audioElement.play();
        else audioElement.pause();
    }

    makeAllPlays();
    document.getElementById(songIndex).classList.toggle('fa-play-circle');
    document.getElementById(songIndex).classList.toggle('fa-pause-circle');

    updateMainIcon();
});

// ===== Progress Bar =====
audioElement.addEventListener('timeupdate', ()=>{
    let progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;

    let times = document.getElementsByClassName('songTime');
    times[songIndex].innerText =
        formatTime(audioElement.currentTime) + " / " +
        formatTime(audioElement.duration);
});

myProgressBar.addEventListener('input', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
});

// ===== Duration load =====
audioElement.addEventListener('loadedmetadata', ()=>{
    let times = document.getElementsByClassName('songTime');
    times[songIndex].innerText = "00:00 / " + formatTime(audioElement.duration);
});

// ===== Next / Previous =====
document.getElementById('next').addEventListener('click', ()=>{
    songIndex = (songIndex+1)%songs.length;
    playSong();
});

document.getElementById('previous').addEventListener('click', ()=>{
    songIndex = (songIndex-1+songs.length)%songs.length;
    playSong();
});
