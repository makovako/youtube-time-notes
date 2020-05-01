const main = document.querySelector("main");
const videoId = new URLSearchParams(window.location.search).get("videoId");

const notes = localStorage.getItem(videoId);

for (let [key, value] of Object.entries(JSON.parse(notes))) {
    main.innerHTML += `<p>${key}: ${value}</p>`
}
main.innerHTML += `<button id="export">Export</button>`
const exp = document.getElementById('export');

exp.addEventListener('click', () => {
    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(notes)
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download",  `${videoId}.json`);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
})
