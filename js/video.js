const main = document.querySelector("main");
const videoId = new URLSearchParams(window.location.search).get("videoId");

const notes = localStorage.getItem(videoId);
const list_group = document.createElement('ul')
list_group.classList.add('list-group-flush', 'list-group')

const edit_note_form = document.getElementById('edit-note-form')
const delete_note_form = document.getElementById('delete-note-form')

const edit_note_input_area = document.getElementById('edit-note-input-area')

const start_notetaking_button = document.getElementById('start-notetaking-btn')

const data = JSON.parse(notes)

for (let [key, value] of Object.entries(data.notes)) {
    const li = document.createElement('li')
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center')

    const div1 = document.createElement('div')
    div1.classList.add('d-flex', 'align-items-center')
    const div2 = document.createElement('div')
    div2.classList.add('d-flex', 'align-items-center')

    const timestamp = document.createElement('p')
    timestamp.classList.add('m-1')
    timestamp.textContent = format_current_time(key)
    const note = document.createElement('p')
    note.classList.add('m-1')
    note.setAttribute('style', 'white-space: pre-wrap; overflow-wrap: break-word;');
    note.textContent = value

    const edit_btn = document.createElement('button')
    edit_btn.classList.add('btn', 'btn-warning', 'm-1')
    edit_btn.type = "button"
    edit_btn.dataset.toggle = "modal"
    edit_btn.dataset.target = "#editNoteModal"
    edit_btn.textContent = "Edit"
    edit_btn.addEventListener('click', () => {
        // Remember, which note to edit
        edit_note_form.dataset.note_id = key
        edit_note_input_area.value = value
    })

    const delete_btn = document.createElement('button')
    delete_btn.classList.add('btn', 'btn-danger', 'm-1')
    delete_btn.type = "button"
    delete_btn.dataset.toggle = "modal"
    delete_btn.dataset.target = "#deleteNoteModal"
    delete_btn.textContent = "Delete"
    delete_btn.addEventListener('click', () => {
        // Remember, which note to delete
        delete_note_form.dataset.note_id = key
    })

    div1.appendChild(timestamp)
    div1.appendChild(note)
    div2.appendChild(edit_btn)
    div2.appendChild(delete_btn)
    li.appendChild(div1)
    li.appendChild(div2)
    list_group.append(li)
}

main.append(list_group)

// Note editing handling

edit_note_form.addEventListener('submit', (e) => {
    e.preventDefault()
    key = e.target.dataset.note_id
    data.notes[key] = edit_note_input_area.value.trim()
    localStorage.setItem(videoId, JSON.stringify(data));
    location.reload()
})

delete_note_form.addEventListener('submit', (e) => {
    e.preventDefault()
    key = e.target.dataset.note_id
    delete data.notes[key]
    localStorage.setItem(videoId, JSON.stringify(data));
    location.reload()
})

start_notetaking_button.addEventListener('click', () => {
    window.location.href = `notetaking.html?videoId=${videoId}`
})

// Note export handling

const export_md_form = document.getElementById('export-md-form')
const export_text_form = document.getElementById('export-text-form')
const export_json_form = document.getElementById('export-json-form')

const filename_md = document.getElementById('filename-md')
const no_timestamps_md = document.getElementById('no-timestamps-md')
const timestamps_text_md = document.getElementById('timestamps-text-md')
const timestamps_list_md = document.getElementById('timestamps-list-md')
const timestamps_headings_md = document.getElementById('timestamps-headings-md')
const md_as_link = document.getElementById('md-as-link')
const md_insert_link = document.getElementById('md-insert-link')

const filename_text = document.getElementById('filename-text')
const insert_link_text = document.getElementById('insert-link-text')

const filename_json = document.getElementById('filename-json')

no_timestamps_md.addEventListener('change', (e) => {
    md_as_link.checked = false
    md_as_link.disabled = true
});

[timestamps_text_md, timestamps_list_md, timestamps_headings_md]
.forEach(elm => {
    elm.addEventListener('change', (e) => {
        md_as_link.disabled = false
    })
})

export_md_form.addEventListener('submit', (e) => {
    e.preventDefault()
    let file_content = ""
    for (let [key, value] of Object.entries(data.notes)) {
        let timestamp = ""
        if (md_as_link.checked) {
            link = `https://www.youtube.com/watch?v=${videoId}&t=${key}`
            timestamp = `[${format_current_time(key)}](${link})`
        } else {
            timestamp = format_current_time(key)
        }
        if (timestamps_text_md.checked) {
            file_content += `${timestamp}\n\n`
        }
        if (timestamps_list_md.checked) {
            file_content += `- ${timestamp}\n\n`
        }
        if (timestamps_headings_md.checked) {
            file_content += `# ${timestamp}\n\n`
        }
        file_content += value + "\n\n"
    }
    if (md_insert_link.checked) {
        file_content += `[source](https://www.youtube.com/watch?v=${videoId})\n\n`
    }
    const dataStr = "data:text/plain;charset=utf-8," + encodeURIComponent(file_content)
    const downloadAnchorNode = document.createElement('a');
    let filename = filename_md.value
    if (filename.length === 0) {
        filename = videoId
    }
    if (!filename.endsWith(".md")) {
        filename += ".md"
    }
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", filename);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
})

export_text_form.addEventListener('submit', (e) => {
    e.preventDefault()
    let file_content = ""
    for (let [key, value] of Object.entries(data.notes)) {
        if (insert_link_text.checked) {
            file_content += `${format_current_time(key)}\n\n`
        }
        file_content += value + "\n\n"
    }

    const dataStr = "data:text/plain;charset=utf-8," + encodeURIComponent(file_content)
    const downloadAnchorNode = document.createElement('a');
    let filename = filename_text.value
    if (filename.length === 0) {
        filename = videoId
    }
    if (!filename.endsWith(".txt")) {
        filename += ".txt"
    }
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", filename);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
})

export_json_form.addEventListener('submit', (e) => {
    e.preventDefault()
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(notes)
    const downloadAnchorNode = document.createElement('a');
    let filename = filename_json.value
    if (filename.length === 0) {
        filename = videoId
    }
    if (!filename.endsWith(".json")) {
        filename += ".json"
    }
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", filename);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
})

// Helper functions

function format_current_time(current_time) {
    let hrs = Math.floor(current_time / 3600).toString();
    let mins = Math.floor((current_time % 3600) / 60).toString();
    let secs = Math.floor(~~current_time % 60).toString();
    return `${hrs.padStart(2,"0")}:${mins.padStart(2,"0")}:${secs.padStart(2,"0")}`;
}