const main = document.querySelector("main");

let notes = [];

const list_group = document.createElement('div')
list_group.classList.add("list-group")

for (let i = 0; i < localStorage.length; i++) {
    note = JSON.parse(localStorage.getItem(localStorage.key(i)))
    notes.push(
        note
    );
}

notes.forEach((note) => {
    const div = document.createElement('div')
    div.classList.add("list-group-item")
    div.classList.add("list-group-item-action")
    div.classList.add("d-flex")
    div.classList.add("justify-content-between")
    div.classList.add("align-items-center")
    const a = document.createElement('a')
    const {id, title} = note
    a.href = `video.html?videoId=${id}`
    a.textContent = `${title} (${id})`
    div.appendChild(a)
    const btn = document.createElement('button')
    btn.classList.add("btn")
    btn.classList.add("btn-danger")
    btn.textContent = "Delete"
    btn.addEventListener('click', e => {
        e.preventDefault()
        localStorage.removeItem(id)
        location.reload()
    })
    div.appendChild(btn)
    list_group.append(div)
});

main.append(list_group)
