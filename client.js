const socket=io('http://localhost:8000');
const form =document.getElementById("chat-form");
const messageInput = document.getElementById("input-text");
const messageContainer=document.querySelector('.chat-area');
var audio=new Audio('notification.mp3');
const append=(message,position="")=>{
    const messageElement=document.createElement("div");
    const spanElement=document.createElement("span");
    spanElement.innerText=message;
    messageElement.append(spanElement);
    messageElement.classList.add("message");
    if (position!=""){
        messageElement.classList.add(position);
    }
    messageContainer.append(messageElement);
    document.getElementsByClassName("chat-area")[0].scrollTo(0, document.getElementsByClassName("chat-area")[0].scrollHeight)
};
const add_message=(name,message,position_class,position)=>{
    const today=new Date();
    const hour=today.getHours();
    const minute=today.getMinutes();

    const messagediv=document.createElement("div");
    const text_message=document.createElement("p");
    const time_text=document.createElement("div")
    const text_name=document.createElement("p");
    const message_details=document.createElement("div");
    const position_message=document.createElement("div");
    const avatar_img=document.createElement("img");
    avatar_img.src="images/avatar.png";
    avatar_img.id="avatar";
    messagediv.classList.add(position_class);
    position_message.classList.add(position);
    text_name.classList.add("name");
    time_text.classList.add("time");
    text_message.classList.add("text");
    time_text.innerText=hour+":"+minute;
    text_name.innerText=name;
    text_message.innerText=message;
    message_details.append(text_name);
    message_details.append(time_text);
    position_message.append(text_name);
    position_message.append(text_message);
    position_message.append(message_details);
    messagediv.append(avatar_img);
    messagediv.append(position_message);
    messageContainer.append(messagediv);
    document.getElementsByClassName("chat-area")[0].scrollTo(0, document.getElementsByClassName("chat-area")[0].scrollHeight)
    if (position=="left"){
        audio.play();
    }
}
form.addEventListener('submit',function(e){
    e.preventDefault();
    const message=messageInput.value;
    add_message('You: ', message,'right-area','right');  
    socket.emit('send',message);
    messageInput.value="";
});
const username=prompt("Enter your name");
document.getElementById("username").innerHTML="Welcome, "+username;
socket.emit('new-user-joined',username);
socket.on('user-joined',username=>{
    append(`${username} joined the chat`)
})
socket.on('receive',data=>{
    add_message(data.name,data.message,'left-area','left')
})
socket.on('user-left',username=>{
    append(`${username} left the chat`)
});