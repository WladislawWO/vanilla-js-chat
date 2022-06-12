const messages = document.querySelector('.message-list')
const btn = document.querySelector('.btn')
const input = document.querySelector('#chat-input')
const nameBnt = document.querySelector('.name-btn')
const nameInput = document.querySelector('.name-input')
const nameForm = document.querySelector('.name-form')

let userName = 'Unknown';
let broadcastChannel = new BroadcastChannel('broadcastChannel');

btn.addEventListener('click', sendMessage)
input.addEventListener('keyup', function(e){ if(e.keyCode == 13) sendMessage() })

nameInput.addEventListener('keyup', function(e){ if(e.keyCode == 13) setName() })
nameBnt.addEventListener('click', setName)

broadcastChannel.onmessage = (messageEvent) => {
  const { name, msg } = JSON.parse(messageEvent.data);
  writeLine(msg, name, 'item-primary');
}

function sendMessage(){
   let msg = input.value;
   input.value = ''
   writeLine(msg)
   broadcastChannel.postMessage(JSON.stringify({ name: userName, msg }))
}

function setName(){
  userName = nameInput.value;
  nameInput.value = '';
  nameForm.style.display = 'none'
}

function writeLine(text, name, className){
   let message = document.createElement('li')

   message.classList.add('message-item', (className || 'item-secondary'))
   message.innerHTML = `${name || userName}: ${text}`
   messages.appendChild(message)
   messages.scrollTop = messages.scrollHeight;
}