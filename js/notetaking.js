// Const
const videoId = new URLSearchParams(window.location.search).get("videoId");

// Loading youtube script
var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

const container = document.querySelector('.container')
const container_padding_left = window.getComputedStyle(container, null).getPropertyValue('padding-left').slice(0,-2)
const container_padding_right = window.getComputedStyle(container, null).getPropertyValue('padding-right').slice(0,-2)

const video_width = container.clientWidth - container_padding_left - container_padding_right
const video_height = Math.floor(video_width * 9 / 16)

// Creating iframe
let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player("player", {
        height: video_height,
        width: video_width,
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

function format_current_time(current_time) {
    let hrs = Math.floor(current_time / 3600).toString();
    let mins = Math.floor((current_time % 3600) / 60).toString();
    let secs = Math.floor(~~current_time % 60).toString();
    return `${hrs.padStart(2,"0")}:${mins.padStart(2,"0")}:${secs.padStart(2,"0")}`;
}

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

const input_area = document.getElementById("input-area");
input_area.value = ""

const notes = document.getElementById("notes");
const save = document.getElementById("save");
input_area.focus();

input_area.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
        const cmd = commands.filter((command) => input_area.value === command.command);
        if (cmd.length > 0) {
            cmd[0].run()
            input_area.value = ""
            return
        }

        let currTime = player.getCurrentTime()

        const li = document.createElement("li");
        li.addEventListener('click', e => {
            e.preventDefault()
            player.pauseVideo()
            player.seekTo(currTime, true)
            input_area.focus()
        })
        currTime = Math.floor(currTime)
        li.classList.add('list-group-item')
        li.textContent = `${format_current_time(currTime)}: ${input_area.value}`;
        notes.append(li)
        data[currTime] = input_area.value;
        input_area.value = "";
        player.playVideo();
    } else if (player.getPlayerState() === 1) {
        player.pauseVideo();
    }
});

save.addEventListener("click", () => {
    localStorage.setItem(videoId, JSON.stringify(data));
    window.location.href = "list.html";
});

function onPlayerReady(event) {}

function onPlayerStateChange(event) {}
