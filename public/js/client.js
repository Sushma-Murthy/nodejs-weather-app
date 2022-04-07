console.log("client side js is loaded")

var weatherForm = document.querySelector('#weather')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msgOne')
const msgTwo = document.querySelector('#msgTwo')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    fetch(`http://localhost:3000/weather?address=${location}`).then(response => {
    response.json().then(data => {
        msgOne.textContent = location
        msgTwo.textContent = data.forecast
    }).catch(error => {
        msgOne.textContent = error
    })
})
})