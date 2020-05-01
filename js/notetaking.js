// Loading youtube script
var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Creating iframe
let player;
function onYouTubeIframeAPIReady() {
    const urlParams = new URLSearchParams(window.location.search);
    const url = urlParams.get('videoId');
    
    player = new YT.Player("player", {
    height: "390",
    width: "640",
    videoId: url,
    playerVars: {
    //   controls: 0,
    //   autoplay: 1,
      origin: "http://127.0.0.1:8080"
    //   disablekb: 1,
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}

// player.addEventListener('onReady', event => {
//     event.target.playVideo();
//     player.playVideo()
//     console.log('here');
    
// })



const area = document.getElementById('area')
const notes = document.getElementById('notes')
area.focus()

let currTime = 0

area.addEventListener('keyup', e => {
    if (e.code === "Enter") {
        p = document.createElement('p')
        p.textContent = `${currTime}: ${area.value}`
        notes.insertBefore(p, area)
        area.value = ""
        currTime = 0
        player.playVideo()
    } else if (player.getPlayerState() === 1) {
        player.pauseVideo()
        currTime = Math.floor(player.getCurrentTime())
    }
})

document.getElementById('play').addEventListener('click', e => {
    player.playVideo()
})

function onPlayerReady(event) {
    // event.target.playVideo()
}

function onPlayerStateChange(event) {

}

