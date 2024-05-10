function getChatList(studentID, password) {
    let formDate = new FormData();
    formDate.append("studentID", studentID);
    formDate.append("password", password);
    const payload = new URLSearchParams(formDate);
    fetch('../../DataBase/chatList', {
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
        const roomJson = JSON.stringify(json);
        const obj = JSON.parse(roomJson);
        createChatListGUI(obj.room_information, studentID);
    });
}

function enterChattingRoom(chatID, studentID) {
    const formDate = new FormData();
    formDate.append("studentID", studentID);
    formDate.append("chatID", chatID);
    const payload = new URLSearchParams(formDate);
    fetch('../../DataBase/chatSelect', {
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: payload
    })
    .then(function(response) {
        return response.text();
    })
    .then(function(txt) {
        location.href = txt;
    });
}

function createChatListGUI(roomList, studentID) {
    const chatElement = document.querySelector(".chat-room-list");
    const blockCount = roomList.length;
    for (let i = 0; i < blockCount; i++) {
        const room = roomList[i];
        const divElement = document.createElement("div");
        divElement.classList.add("chat-room");
        divElement.setAttribute("onclick", "enterChattingRoom(" + room.number + ", " + studentID + ")");
    
        const h2Element = document.createElement("h2");
        const roomDateSplit = room.date.split("-");
        const roomTimeSplit = room.time.split(":");
        h2Element.innerHTML = room.number + "번 " + roomDateSplit[1] + "월 " + roomDateSplit[2] + "일 " + roomTimeSplit[0] + "시 " + roomTimeSplit[1] + "분";
        divElement.appendChild(h2Element);

        const pElement = document.createElement("p");
        pElement.innerHTML = room.from + " -> " + room.to;
        divElement.appendChild(pElement);
    
        chatElement.appendChild(divElement);
    }
}

window.onload = function () {
    if(sessionStorage.key(0) == null) {
        location.href = "../../index.html";
        return;
    }
    let formDate = new FormData();
    formDate.append("studentID", sessionStorage.key(0));
    formDate.append("password", sessionStorage.getItem(sessionStorage.key(0)));
    const payload = new URLSearchParams(formDate);
    fetch('../../DataBase/loginCheck', {
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
          location.href = "../../index.html";
        }
        else {
            getChatList(obj.result.success.studentID, obj.result.success.password);
        }
    });
  }