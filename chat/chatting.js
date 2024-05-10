import { ArrayList } from "../util/utilities.js";
const sendBtn = document.querySelector("#send_message");
const previousMessage = document.querySelector(".previous_message");
const chattingList = new ArrayList(10);
const socket = new WebSocket("ws://택시.com:80/DataBase/WebSocket?studentID=" + sessionStorage.key(0) + "&password=" + sessionStorage.getItem(sessionStorage.key(0)));

socket.addEventListener("open", (event) => {
});

socket.addEventListener("message", (event) => {
    const obj = JSON.parse(event.data);
    chattingList.addI(0, obj.chat_information[0]);
    const list = new ArrayList(1);
    list.add(obj.chat_information[0]);
    const chatWrap = document.querySelector(".chat");
    const maxY = chatWrap.scrollHeight - (chatWrap.clientHeight+1);
    createChatGUI(list);
    const locationY = chatWrap.scrollTop;
    if(locationY >= maxY) { //나중에 resize 이벤트가 발생했을때 마지막에 스크롤이였음 그것도 마지막 스크롤로 이동하게
        chatWrap.scrollTo(0, chatWrap.scrollHeight);
    }
});

previousMessage.addEventListener("click", function() {
    const maxY = document.querySelector(".chat").scrollHeight;
    const date = new Date();
    const dateTime = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();
    const formDate = new FormData();
    formDate.append("studentID", sessionStorage.key(0));
    formDate.append("password", sessionStorage.getItem(sessionStorage.key(0)));
    formDate.append("dateTime", dateTime);
    const loadedChatNumber = chattingList.size() < 1 ? -1 : chattingList.get(chattingList.size()-1).chatNumber;
    formDate.append("loadedChatNumber", loadedChatNumber);
    const payload = new URLSearchParams(formDate);
    fetch('../DataBase/loadChat', {
        method: 'post',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: payload
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        const Json = JSON.stringify(json);
        const obj = JSON.parse(Json);
        if(obj.chat_information.length > 0) {
            chattingList.addAll(obj.chat_information);
            const chatDiv = document.querySelector(".chat");
            chatDiv.children[1].innerHTML = "";
            createChatGUI(chattingList);
            const newMaxY = document.querySelector(".chat").scrollHeight;
            document.querySelector(".chat").scrollTo(0, newMaxY - maxY);
        }
    });
});

sendBtn.addEventListener("click", function() {
    const date = new Date();
    const dateTime = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();
    const message = document.querySelector("#message");
    const formDate = new FormData();
    if(message.value == "") {
        return;
    }
    formDate.append("studentID", sessionStorage.key(0));
    formDate.append("password", sessionStorage.getItem(sessionStorage.key(0)));
    formDate.append("content", replaceSpecialChar(message.value));
    formDate.append("dateTime", dateTime);
    const payload = new URLSearchParams(formDate);
    fetch('../../DataBase/chat', {
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: payload
    })
    .then(function(response) {
        return response.text();
    })
    .then(function(txt){
        const result = parseInt(txt);
        if(result == 1) {
            const msg = "studentID:" + sessionStorage.key(0) + ", password:" + sessionStorage.getItem(sessionStorage.key(0)) + ", " + "dateTime:" + dateTime
            socket.send(msg);
        }
    });
    message.value = "";
});

function createChatGUI(chatList) {
    for(let i = chatList.size() - 1; i >= 0; i--) {
        const chat = chatList.get(i);
        const divElement = document.createElement("div");
        divElement.classList.add("chat_format");
        const ulElement = document.createElement("ul");
        const liElement = document.createElement("li");

        const senderDiv = document.createElement("div");
        senderDiv.classList.add("sender");
        const span1Element = document.createElement("span");
        span1Element.innerHTML = chat.studentID + " " + chat.name;
        senderDiv.appendChild(span1Element);
        liElement.appendChild(senderDiv);

        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message");
        line(chat.content, messageDiv);
        liElement.appendChild(messageDiv);

        const timeDiv = document.createElement("div");
        timeDiv.classList.add("time");
        const span3Element = document.createElement("span");
        span3Element.innerHTML = chat.time;
        
        timeDiv.appendChild(span3Element);
        liElement.appendChild(timeDiv);

        ulElement.appendChild(liElement);
        divElement.appendChild(ulElement);
        
        const chatDiv = document.querySelector(".chat");
        chatDiv.children[1].appendChild(divElement);
    }
}

function line(str, div) {
    if(str.includes("\n")) {
        const strSplit = str.split("\n");
        str = "";
        for(let i = 0; i < strSplit.length; i++) {
            const span2Element = document.createElement("span");
            if(i != 0) {
                const brElement = document.createElement("br");
                div.appendChild(brElement);
            }
            span2Element.innerHTML = strSplit[i];
            div.appendChild(span2Element);
        }
    }
    else {
        const span2Element = document.createElement("span");
        span2Element.innerHTML = str;
        div.appendChild(span2Element);
    }
}

function replaceSpecialChar(str) {
    let msg = str;
    if(str.includes("\n")) {
        console.log("n");
        msg = msg.replace(/\n/g, "\\n");
    }
    if(str.includes("\\n")) {
        console.log("\\n");
        msg = msg.replace(/\\n/g, "\\\\n");
    }
    if(message.value.includes("\"")) {
        console.log("\"");
        msg = msg.replace(/"/g, "\\\"");
    }
    return msg;
}

function getChatLog(studentID, password) {
    const date = new Date();
    const dateTime = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();
    const formDate = new FormData();
    formDate.append("studentID", studentID);
    formDate.append("password", password);
    formDate.append("dateTime", dateTime);
    formDate.append("loadedChatNumber", -1);
    const payload = new URLSearchParams(formDate);
    fetch('../DataBase/loadChat', {
        method: 'post',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: payload
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        const Json = JSON.stringify(json);
        const obj = JSON.parse(Json);
        if(obj.chat_information.length < 1) {
            return;
        }
        chattingList.addAll(obj.chat_information);
        createChatGUI(chattingList);
    });
}

window.onload = function() {
    if(sessionStorage.key(0) == null) {
        location.href = "../index.html";
        return;
    }
    let formDate = new FormData();
    formDate.append("studentID", sessionStorage.key(0));
    formDate.append("password", sessionStorage.getItem(sessionStorage.key(0)));
    const payload = new URLSearchParams(formDate);
    fetch('../DataBase/loginCheck', {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: payload
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        const userJson = JSON.stringify(json);
        const obj = JSON.parse(userJson);
        if(obj.result == "failure") {
            location.href = "../index.html";
        }
        else {
            getChatLog(obj.result.success.studentID, obj.result.success.password);
        }
    });
}