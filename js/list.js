const main = document.querySelector("main");

let notes = [];

const list_group = document.createElement('div')
list_group.classList.add("list-group")

for (let i = 0; i < localStorage.length; i++) {
    notes.push(
        `<a class="list-group-item list-group-item-action" href="video.html?videoId=${localStorage.key(i)}">${localStorage.key(i)}</a>`
    );
}

notes.forEach((note) => {
    const a = document.createElement('a')
    a.innerHTML = note;
    list_group.append(a)
});

main.append(list_group)
