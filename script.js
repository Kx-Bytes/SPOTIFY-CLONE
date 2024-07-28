console.log("Let's start");
let currFolder;
let currentSong = new Audio();
let songs;


async function getSongs(folder) {
    currFolder = folder;
    let a = await fetch(`http://127.0.0.1:5500/${folder}/`);
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    console.log(response);
    let as = div.getElementsByTagName("a");

    songs = [];

    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`/${folder}/`)[1])
        }

    }


    let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0];
    songUL.innerHTML = "";
    for (const song of songs) {

        songUL.innerHTML = songUL.innerHTML +
            `<li>
    <img class="invert" src="img/music.svg" alt="">
    <div class="info">
        <div>${song.replaceAll("%20", " ")}</div>
        <div>song artist</div>
    </div>
    <div class="playnow">
    <span>play now</span>
  
    <img class="invert" src="img/play2.svg" alt="">

    </div>
 </li>`;

    }

    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());

        })
    })
    return songs;

}



function secondsToMMSS(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}




const playMusic = (track, pause = false) => {
    currentSong.src = `/${currFolder}/` + track;
    if (!pause) {
        currentSong.play();
        play.src = "img/pause.svg";
    }
    document.querySelector(".songinfo").innerHTML = decodeURI(track);
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";

}

async function displayAlbums() {

    //Load the playlist whenever card is clicked.


    let a = await fetch(`http://127.0.0.1:5500/songs/`);
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    console.log(div)
    let anchors = div.getElementsByTagName("a");
    let cardContainer=document.querySelector(".cardContainer");

    let array=Array.from(anchors);

    for (let index = 0; index < array.length; index++) {
        const e = array[index];
        
    
        if (e.href.includes("/songs/")) {
            let folder = e.href.split("/").slice(-1)[0];
            console.log(folder);
            console.log(`http://127.0.0.1:5500/songs/${folder}/info.json`)
            //Get meta data of each folder
            const a = await fetch(`http://127.0.0.1:5500/songs/${folder}/info.json`);
            let response = await a.json();
            cardContainer.innerHTML=cardContainer.innerHTML+`<div data-folder="${folder}" class="card">
            <div style="display: flex;align-items: center;justify-content: center;">

                <img src="/songs/${folder}/cover.jpg" alt="">

                <div class="play">
                    <button>
                        <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24"
                            class="Svg-sc-ytk21e-0 bneLcE">
                            <path
                                d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z">
                            </path>
                        </svg>
                    </button>
                </div>

            </div>

            <div>

                <h2>${response.title}</h2>
                <p>${response.description}</p>

            </div>
        </div>`

        }
    }

    Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", async item => {
            songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`);
            playMusic(songs[0], false);

        })
    })


}


async function main() {

    //Get list of songs

    await getSongs("songs/ncs");
    
    playMusic(songs[0], true);

    //Display all thr albums on the page
    await displayAlbums();

    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "img/pause.svg"
        }

        else {
            currentSong.pause();
            play.src = "img/play.svg"
        }
    })

    //Listen for timeupdate event

    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${secondsToMMSS(currentSong.currentTime)} / ${secondsToMMSS(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    })

    //Add an event listner to seekbar

    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = (currentSong.duration * percent) / 100;
    })


    document.querySelector(".hamburg").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0%"
    })


    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-110%";
    })


    //Add event lisnter to previous
    previous.addEventListener("click", () => {
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
        if ((index - 1) >= 0) {
            playMusic(songs[index - 1]);
        }
    })


    //Add event lisnter to next
    next.addEventListener("click", () => {
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
        if ((index + 1) < songs.length) {
            console.log("next");
            playMusic(songs[index + 1]);
        }
    })


    //Add event lisnter to volume 
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        currentSong.volume = parseInt(e.target.value) / 100;
        console.log(currentSong.volume);
        if(currentSong.volume==0){
            vol.src="img/mute.svg";
        }
        else if(currentSong.volume>0 && currentSong.volume<=0.54){
            vol.src="img/lowvolume.svg";
            console.log(vol.src);
        }
        else if(currentSong.volume>0.54){
            vol.src="img/volume.svg";
        }
    })

    document.querySelector(".volume>img").addEventListener("click",e=>{

        if(e.target.src.includes("volume.svg") && !e.target.src.includes("lowvolume.svg")){
            console.log(e.target.src);
            e.target.src=e.target.src.replace("volume.svg","mute.svg");
            currentSong.volume=0;
            document.querySelector(".range").getElementsByTagName("input")[0].value=0;
        }
        else if(e.target.src.includes("lowvolume.svg")){
            console.log(e.target.src);
            e.target.src=e.target.src.replace("lowvolume.svg","mute.svg");
            currentSong.volume=0;
            document.querySelector(".range").getElementsByTagName("input")[0].value=0;
        }
        else{
            console.log(e.target.src);
            e.target.src=e.target.src.replace("mute.svg","volume.svg");
            currentSong.volume=0.6;
            document.querySelector(".range").getElementsByTagName("input")[0].value=60;
        }
    })
    

}





main();

