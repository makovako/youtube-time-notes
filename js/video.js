const main = document.querySelector("main");
const videoId = new URLSearchParams(window.location.search).get("videoId");

const notes = localStorage.getItem(videoId);
const list_group = document.createElement('ul')
list_group.classList.add('list-group-flush')
list_group.classList.add('list-group')

data = JSON.parse(notes)

for (let [key, value] of Object.entries(data.notes)) {
    const li = document.createElement('li')
    // Show new lines in notes
    li.setAttribute('style', 'white-space: pre;');
    li.classList.add('list-group-item')
    li.textContent = `${key}: ${value}`
    list_group.append(li)
}

main.append(list_group)

const export_button = document.createElement('button')
export_button.classList.add('btn')
export_button.classList.add('btn-outline-success')
export_button.textContent = "Export"

main.append(export_button)

// const exp = document.getElementById('export');

export_button.addEventListener('click', () => {
    // TODO options to export
    // - raw text
    // - json
    // - markdown
    // - without timestamps
    // - with timestamps
    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(notes)
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download",  `${videoId}.json`);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
})
