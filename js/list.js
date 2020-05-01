const main = document.querySelector("main");

let notes = [];

for (let i = 0; i < localStorage.length; i++) {
    notes.push(
        `<a href="video.html?videoId=${localStorage.key(i)}">${localStorage.key(i)}</a>`
    );
}

notes.forEach((note) => {
    main.innerHTML += note;
});
