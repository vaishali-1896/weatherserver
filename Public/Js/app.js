const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const message1= document.querySelector('#message-1')
const message2= document.querySelector('#message-2')

weatherform.addEventListener('submit', (e)=>
{
    e.preventDefault()
    const location =  search.value

    //console.log(location)
    message1.textContent='Loading..'
    message2.textContent=''
    fetch('http://localhost:3000/weather?address='+location).then((response)=>
    {
        response.json().then((data1)=>
        {
if(data1.error)
{
message1.textContent=data1.error}
else{
    message1.textContent=data1.location
    message2.textContent=data1.Data
    //console.log(data1.location)
    //console.log(data1.Data)
}
        })
    })
})

// fetch('http://puzzle.mead.io/puzzle').then((response)=>
// {
//     response.json().then((data)=>
//     {
//      console.log(data)
//     })
// })