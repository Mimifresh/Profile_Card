

function timeUpdate(){
    const timeStamp = document.querySelector('[data-testid="test-user-time"]')
    timeStamp.textContent = Date.now()
}

setInterval(timeUpdate, 1000)
