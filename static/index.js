document.addEventListener('DOMContentLoaded', function() {
   
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-button');
    const chatBody = document.getElementById('chat-body');

    
    function addMessageToChat(message, fromMe = true) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(fromMe ? 'from-me' : 'from-them');
        
     
        messageElement.innerHTML = message.replace(/\n/g, '<br>'); 
        chatBody.appendChild(messageElement);

      
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    
    sendButton.addEventListener('click', function() {
        const message = chatInput.value;
        if (message.trim() !== "") {
            addMessageToChat(message); 
            chatInput.value = ""; 
            simulateBotResponse(); 
        }
    });

    
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault(); 
            const message = chatInput.value;
            if (message.trim() !== "") {
                addMessageToChat(message); 
                chatInput.value = ""; 
                simulateBotResponse(); 
            }
        }
    });

   
    function simulateBotResponse() {
        setTimeout(function() {
            const botResponse = "This is a bot response.\nHow can I help you?\nPlease let me know!";
            addMessageToChat(botResponse, false); 
        }, 1000); 
    }
});
