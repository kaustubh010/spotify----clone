// Initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myprogressbar = document.getElementById('myprogressbar');
let gif = document.getElementById('gif');
let mastersongname = document.getElementById('mastersongname');
let songItems = Array.from(document.getElementsByClassName('songitem'));

// Song list array
let songs = [
    { songName: "Wariyo Mortals", filePath: "songs/1.mp3", coverPath: "cover/1.jpg" },
    { songName: "Ala vaikunthapurramuloo", filePath: "songs/2.mp3", coverPath: "cover/2.jpg" },
    { songName: "Buttabomma", filePath: "songs/3.mp3", coverPath: "cover/3.jpg" },
    { songName: "OMG Daddy", filePath: "songs/4.mp3", coverPath: "cover/4.jpg" },
    { songName: "Ramuloo Ramula", filePath: "songs/5.mp3", coverPath: "cover/5.jpg" },
];

// Changing elements by song list
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

// Listen to events
// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove("fa-play-circle")
        masterPlay.classList.add("fa-pause-circle")
        gif.style.opacity = 1;
    }

    else {
        audioElement.pause();
        masterPlay.classList.remove("fa-pause-circle")
        masterPlay.classList.add("fa-play-circle")
        gif.style.opacity = 0;
    }
})

// Update seekbar
audioElement.addEventListener('timeupdate', () => {
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myprogressbar.value = progress;
});

myprogressbar.addEventListener('change', () => {
    audioElement.currentTime = myprogressbar.value * audioElement.duration / 100;
});

const makeallplays = () => {
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeallplays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`
        mastersongname.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove("fa-play-circle")
        masterPlay.classList.add("fa-pause-circle")
    })
})

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex<=0) {
        songIndex = 0;
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`
    mastersongname.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle")
    masterPlay.classList.add("fa-pause-circle")
})
document.getElementById('next').addEventListener('click', () => {
    if (songIndex>=5) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`
    mastersongname.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle")
    masterPlay.classList.add("fa-pause-circle")
})