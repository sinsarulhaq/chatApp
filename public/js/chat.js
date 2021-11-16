const socket = io()

const $messageForm = document.querySelector('#message-form')
const $messageFormInput = document.querySelector('input')
const $messageFormButton = document.querySelector('button')
const $messages = document.getElementById('messages')
const $sendLocationButton = document.querySelector('#send-location')

// socket.on('countUpdated', (count) => {
//     console.log('The count has been updated', count)
// })

// document.querySelector('#increment').addEventListener('click', () => {
//     console.log('Clicked')
//     socket.emit('increment')
// })

//Templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationMessageTemplate = document.querySelector('#location-message-template').innerHTML

socket.on('message', (message) => {
    const html = Mustache.render(messageTemplate, {
        message
    })
    $messages.insertAdjacentHTML('afterbegin', html)
})//for listen messages thath send from server side

socket.on('locationMessage', (location) => {
    const html = Mustache.render(locationMessageTemplate, {
        location
    })
    $messages.insertAdjacentHTML('afterbegin', html)
})

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault()
    $messageFormButton.setAttribute('disabled', 'disabled')
    const message = e.target.elements.message.value //document.querySelector('input').value  
    socket.emit('sendMessage', message, (callback) => {
        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value = ''
        $messageFormInput.focus()

        if (callback) {
            return console.log(callback)
        }

        console.log('message deliverd')
    })
})


$sendLocationButton.addEventListener('click', (e) => {
    e.preventDefault()
    if (!navigator.geolocation) {
        return alert('Geolacation is not supported in your browser')
    }

    $sendLocationButton.setAttribute('disabled', 'disabled')

    navigator.geolocation.getCurrentPosition((position) => {
        // console.log(position)
        socket.emit('SendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, (callback) => {
            $sendLocationButton.removeAttribute('disabled')
            console.log(callback)
        })
    })

})