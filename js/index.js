const form = document.getElementById('form')

form.addEventListener('submit', e => {
    const url = e.target.url.value
    const params = url.split("?")
    if (params.length < 2) {
        e.preventDefault()
        handleError("Problem with url, no parameters")
        return false
    }
    console.log({params});
    
    
    const video = params[1].split('&').filter(param => param.split('=')[0] === 'v')
    console.log({video});
    
    if (video.length < 1) {
        e.preventDefault()
        handleError("Problem with url, no video parameter")
        return false
    }
    e.target.videoId.value = video[0].split('=')[1]
    e.target.url.disabled = true
    console.log(e.target);
    return true
})

const handleError = (error) => {
    console.log(error);
    
}