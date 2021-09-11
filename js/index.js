const form = document.getElementById('form')

form.addEventListener('submit', e => {
    const params = new URL(e.target.url.value).searchParams
    const video = params.get("v")
    if (!video) {
        e.preventDefault()
        handleError("Problem with url, no parameters")
        return false
    }
    e.target.videoId.value = video
    e.target.url.disabled = true
    return true
})

const handleError = (error) => {
    console.log(error);
}