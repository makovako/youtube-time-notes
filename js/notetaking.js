// Video param
const videoId = new URLSearchParams(window.location.search).get("videoId");

// Elements

const input_area = document.getElementById("input-area");
input_area.value = ""

const notes = document.getElementById("notes");
const save = document.getElementById("save");

// Loading youtube script
var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Computing properties

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

let data = JSON.parse(localStorage.getItem(videoId))

if (data) {
    for (let [key, value] of Object.entries(data.notes)) {
        li = createNoteLi(key, value)
        notes.append(li)
    }
}

// Create custom commands (like enter to play)
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
    {
        command: "s\n",
        description: "save",
        run: () => {
            localStorage.setItem(videoId, JSON.stringify(data));
            window.location.href = "list.html";
        }
    }
];


input_area.addEventListener("keyup", (e) => {
    console.log(e.shiftKey);
    if (e.code === "Enter") {
        if (e.shiftKey) {
            // allow new line in note with shift+enter
            return
        }
        // Run custom command
        const cmd = commands.filter((command) => input_area.value === command.command);
        if (cmd.length > 0) {
            cmd[0].run()
            input_area.value = ""
            return
        }

        // current time works as an id for note
        let currTime = player.getCurrentTime()
        currTime = Math.floor(currTime)

        li = createNoteLi(currTime, input_area.value)
        notes.append(li)
        data.notes[currTime] = input_area.value;
        input_area.value = "";
        player.playVideo();
    } else if (player.getPlayerState() === 1) {
        let currTime = player.getCurrentTime()
        // Allow user to fast-forward/rewind with arrows
        if (e.code === "ArrowRight") {
            player.seekTo(currTime + 10, true)
        }else if (e.code === "ArrowLeft") {
            player.seekTo(currTime - 10, true)
        } else {
            player.pauseVideo();
        }
    }
});

save.addEventListener("click", () => {
    localStorage.setItem(videoId, JSON.stringify(data));
    window.location.href = "list.html";
});

function onPlayerReady(event) {
    const {video_id, title} = event.target.getVideoData()
    data["id"] = video_id
    data["title"] = title
    if (!data.notes) {
        data["notes"] = {}
    }
    input_area.focus()
}

function onPlayerStateChange(event) {}

function createNoteLi(currTime, noteText) {
    // Reuse existing note if possible (edit note)
    let li = document.getElementById(currTime)
    if (!li) {
        li = document.createElement("li");
        li.addEventListener('click', e => {
            e.preventDefault()
            player.pauseVideo()
            player.seekTo(currTime, true)
            input_area.value = data.notes[currTime]
            input_area.focus()
        })
        li.id = currTime
        // Show new lines in notes
        li.setAttribute('style', 'white-space: pre;');
        li.classList.add('list-group-item')
        li.classList.add('cursor-pointer')
        // TODO create two columns and allow click only on one for time
        // TODO the same for video.js
        li.title = `Seek video to time ${format_current_time(currTime)} and edit note`
    }

    li.textContent = `${format_current_time(currTime)}: ${noteText}`;
    return li
}
