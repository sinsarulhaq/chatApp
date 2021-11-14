const socket = io()


// socket.on('countUpdated', (count) => {
//     console.log('The count has been updated', count)
// })

// document.querySelector('#increment').addEventListener('click', () => {
//     console.log('Clicked')
//     socket.emit('increment')
// })

document.querySelector('#message-form').addEventListener('submit', (e)=>{
    e.preventDefault()
    const message = e.target.elements.message.value //document.querySelector('input').value  
    socket.emit('sendMessage', message, (callback)=>{
        if(callback){
            return console.log(callback)
        }
        console.log('message deliverd')
    })
})
socket.on('message', (message)=>{
    console.log(message)
})  //for listen messages thath send from server side 

document.querySelector('#send-location').addEventListener('click',(e) =>{
    e.preventDefault()
    if(!navigator.geolocation){
        return alert('Geolacation is not supported in your browser')
    }
    navigator.geolocation.getCurrentPosition((position)=>{
        // console.log(position)
        socket.emit('SendLocation', {
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        }, (callback) => {
            console.log(callback)
        })
    })
    
})