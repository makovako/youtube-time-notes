// Const
const videoId = new URLSearchParams(window.location.search).get("videoId");

// Loading youtube script
var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Creating iframe
let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player("player", {
        height: "390",
        width: "640",
        videoId: videoId,
        playerVars: {
            //   controls: 0,
            //   autoplay: 1,
            origin: "http://127.0.0.1:8080",
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

let data = {};

const commands = [
    {
        command: "p\n",
        description: "play",
        run: () => player.playVideo(),
    },
    {
        command: "\n",
        description: "play",
        run: () => player.playVideo(),
    },
];

const area = document.getElementById("area");
const notes = document.getElementById("notes");
const save = document.getElementById("save");
area.focus();

let currTime = 0;

area.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
        const cmd = commands.filter((command) => area.value === command.command);
        if (cmd.length > 0) {
            cmd[0].run()
            area.value = ""
            return
        }

        p = document.createElement("p");
        p.textContent = `${currTime}: ${area.value}`;
        notes.insertBefore(p, area);
        data[currTime] = area.value;
        area.value = "";
        currTime = 0;
        player.playVideo();
    } else if (player.getPlayerState() === 1) {
        player.pauseVideo();
        currTime = Math.floor(player.getCurrentTime());
    }
});

save.addEventListener("click", () => {
    localStorage.setItem(videoId, JSON.stringify(data));
    window.location.href = "list.html";
});

function onPlayerReady(event) {}

function onPlayerStateChange(event) {}
