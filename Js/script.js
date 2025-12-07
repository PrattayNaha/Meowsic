let songIndex = 0;
let audioElement = new Audio();
let masterplay = document.getElementById('masterplay');
let songcontainer = document.getElementById("songcontainer");
let myprogressbar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let mastersongname = document.getElementById('mastersongname');
let nowplayingcover = document.getElementById('nowplaying');
let searchbar = document.getElementById('searchbar');
let volcontrol = document.getElementById('volcontrol');
let volicon = document.getElementById('volicon');
let repeatbtn = document.getElementById('repeatbtn');
let shufflebtn = document.getElementById('shufflebtn');
let favoritebtn = document.getElementById('favoritebtn');

let songs = [
    {songName: "RunAway", filepath:"/mp3/0.mp3", coverPath: "/covers/cover1.png"},
    {songName: "Heat Waves", filepath:"/mp3/1.mp3", coverPath: "/covers/cover2.jpeg"},
    {songName: "Boulevard of Broken Dreams", filepath:"/mp3/2.mp3", coverPath: "/covers/cover3.jpg"},
    {songName: "Substanece", filepath:"/mp3/3.mp3", coverPath: "/covers/cover4.png"},
    {songName: "Pastlife", filepath:"/mp3/5.mp3", coverPath: "/covers/cover5.jpg"},
    {songName: "Half Alive", filepath:"/mp3/6.mp3", coverPath: "/covers/cover6.jpg"},
    {songName: "She said no", filepath:"/mp3/7.mp3", coverPath: "/covers/cover7.jfif"},
    {songName: "Sweater", filepath:"/mp3/9.mp3", coverPath: "/covers/cover8.jfif"},
    {songName: "Nigh Changes", filepath:"/mp3/12.mp3", coverPath: "/covers/cover9.jfif"},
    {songName: "FireFly", filepath:"/mp3/13.mp3", coverPath: "/covers/cover10.jfif"},
    {songName: "Sugar", filepath:"/mp3/15.mp3", coverPath: "/covers/cover11.jfif"},
]

//timeupdate
const updatetimestamps = ()=>{
    let tempaudio = new Audio(audioElement.src);
    tempaudio.addEventListener('loadedmetadata',()=>{
        let totalsec = Math.floor(tempaudio.duration);
        let min = Math.floor(totalsec/60);
        let sec = totalsec%60;
        if(sec<10)sec = "0"+sec;
        document.getElementById("totalTime").innerText = `${min}:${sec}`;
    });
};
audioElement.addEventListener('timeupdate', ()=>{
    let cursec = Math.floor(audioElement.currentTime);
    let min = Math.floor(cursec/60);
    let sec = cursec%60;
    if(sec<10) sec = "0"+sec;
    document.getElementById('currentTime').innerText = `${min}:${sec}`;
})

//songlist
songs.forEach((song, i) =>{
    let div = document.createElement('div');
    div.classList.add('songitem');
    div.dataset.index  = i;
    div.innerHTML= `
        <img src = "${song.coverPath}" alt = "${song.songName}">
        <span class = "songname">${song.songName}</span>
        <span class = "songlistplay">
            <span class = "timestamp">0.00</span>
            <i class = "fa-solid fa-circle-play songitemplay" style = "cursor:pointer;"></i>
        </span>
    `;
    songcontainer.appendChild(div);

    //load audio metadata to show duration
    let tempaudio = new Audio(song.filepath);
    tempaudio.addEventListener("loadedmetadata", ()=>{
        let totalsec = Math.floor(tempaudio.duration);
        let min = Math.floor(totalsec/60);
        let sec = totalsec%60;
        if (sec<10) sec = "0"+sec;
        div.querySelector(".timestamp").innerText = `${min}:${sec}`;
    });
});


//Progress Bar
audioElement.addEventListener('timeupdate', ()=>{
    let progress = parseInt((audioElement.currentTime/audioElement.duration)*100)
    myprogressbar.value = progress || 0;
});
myprogressbar.addEventListener('input',()=>{
    audioElement.currentTime = myprogressbar.value*audioElement.duration/100;
})


const loadsong = (index) =>{
    let song = songs[index];
    audioElement.src =song.filepath;
    mastersongname.innerText = `${song.songName}`;
    nowplayingcover.src = song.coverPath;
    audioElement.currentTime = 0;
    updatetimestamps();
}


const playsong = () =>{
    audioElement.play();
    masterplay.classList.replace('fa-circle-play','fa-circle-pause');
    gif.style.opacity = 1;
}

const pausesong = () =>{
    audioElement.pause();
    masterplay.classList.replace('fa-circle-pause','fa-circle-play');
    gif.style.opacity  = 0;
}

const makeAllPlays = () =>{
    document.querySelectorAll('.songitemplay').forEach(e => e.classList.replace('fa-circle-pause','fa-circle-play'));
}

loadsong(songIndex);

//event listeners

//play/pause
masterplay.addEventListener('click', () => audioElement.paused ? playsong() : pausesong());

//song item play
document.querySelectorAll('.songitem').forEach(el => {
    el.addEventListener('click', (e) =>{
        makeAllPlays();
        songIndex = parseInt(el.dataset.index);
        loadsong(songIndex);
        playsong();
        el.querySelector('.songitemplay').classList.replace('fa-circle-play','fa-circle-pause');
    });
});

//next / previous

document.getElementById('next').addEventListener('click',()=>{
    songIndex = (songIndex+1)%songs.length;
    loadsong(songIndex);
    playsong();
});

document.getElementById('previous').addEventListener('click', () =>{
    songIndex = (songIndex-1+songs.length)%songs.length;
    loadsong(songIndex);
    playsong();
});

//Repeat & Shuffle
let repeat = false, shuffle = false;
repeatbtn.addEventListener('click', ()=>{
    repeat =! repeat;
    repeatbtn.style.color = repeat?"orange":"white";
});
shufflebtn.addEventListener('click', ()=>{
    shuffle =! shuffle;
    shufflebtn.style.color = shuffle?"orange":"white";
})
//song ended
audioElement.addEventListener('ended',()=>{
    if(shuffle){
        songIndex = Math.floor(Math.random()*songs.length);
    }else if(repeat){
        songIndex = songIndex
    }else{
        songIndex = (songIndex+1)%songs.length;
    }
    loadsong(songIndex);
    playsong();
})

myprogressbar.addEventListener('input', ()=>{
    audioElement.currentTime = myprogressbar.value*audioElement.duration/100;
});

//volume
volcontrol.addEventListener('input', ()=>{
    audioElement.volume  = volcontrol.value;
});



//search audio
searchbar.addEventListener('input',()=>{
    let val = searchbar.value.toLowerCase();
    document.querySelectorAll('.songitem').forEach((el,i)=>{
        let song = songs[i];
        el.style.display = song.songName.toLowerCase().includes(val)?"flex":"none";
    });
});




