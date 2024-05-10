import { myRoomList, setMyRoomList } from "./matching_roomDate.js";
const previousCalendar = document.querySelector(".calendar_previous");
const nextCalendar = document.querySelector(".calendar_next");
const previousRoom = document.querySelector(".matching_previous_room");
const nextRoom = document.querySelector(".matching_next_room");
const signBtn = document.querySelector("#matchingRoomSign");
const weightPopup = document.querySelector("#weight_popup");
const signPopUp = document.querySelector("#sign_popup");
const signPopUpBtn = document.querySelector("#sign_popup_button");
let initDate = new Date();
let nowYear;
let nowMonth;
let nowDate;
let roomList;
let roomPage = 0;

for(let i = 0; i < weight_button.length; i++) {
    weight_button[i].addEventListener("click", function() {
        weightPopup.style.display = "none";
        const formDate = new FormData();
        formDate.append("studentID", sessionStorage.key(0));
        formDate.append("password", sessionStorage.getItem(sessionStorage.key(0)));
        formDate.append("roomNumber", roomList[roomPage].number);
        const weight = weight_button[i].innerHTML == "YES" ? 2: 1;
        formDate.append("weight", weight)
        const payload = new URLSearchParams(formDate);
        fetch('../../DataBase/matchingRoomSign', {
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
            signPopUp.style.display = "flex";
            let comment = "해당 방은 짐이 너무 많아 가입이 불가능합니다.";
            const result = parseInt(txt);
            switch(result) {
                case -2:
                    comment = "짐 없이만 탑승이 가능합니다."
                    break;
                case -1:
                    comment = "해당 방 가입에 실패하였습니다."
                    break;
                case 0:
                    comment = "해당 방은 인원 초과되었습니다."
                    break;
                case 1:
                    comment = "해당 방 가입에 성공하였습니다."
                    break;
                case 2:
                    comment = "해당 방에 이미 사용자가 존재합니다."
                    break;
            }
            signPopUp.children[0].children[0].innerHTML = comment;
        });
    });
}

previousCalendar.addEventListener("click", function() {
    createCalendar(nowYear, nowMonth - 1);
});

nextCalendar.addEventListener("click", function() {
    createCalendar(nowYear, nowMonth + 1);
});

previousRoom.addEventListener("click", function() {
    roomPage = roomPage > 0 ? roomPage -1 : 0;
    setRoomPage();
});

nextRoom.addEventListener("click", function() {
    roomPage = roomPage < (roomList.length -1) ? roomPage + 1 : roomPage;
    setRoomPage();
});

signBtn.addEventListener("click", function() {
    weightPopup.style.display = "flex";
});

signPopUpBtn.addEventListener("click", function() {
    signPopUp.style.display = "none";
});

function onClickDate(tmpDate) {
    tmpDate.addEventListener("click", function() {
        const dateNode = tmpDate.children[0];
        let formDate = new FormData();
        formDate.append("year", nowYear);
        formDate.append("month", nowMonth + 1);
        formDate.append("date", dateNode.innerHTML);
        nowDate = dateNode.innerHTML;
        const payload = new URLSearchParams(formDate);
        if(dateNode.style.color != "lightgray") {
            fetch('../../DataBase/MatchingRoomList', {
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
                roomList = JSON.parse(roomJson).room_information;
                const calendarWrap = document.querySelector(".calendar_wrap");
                calendarWrap.style.display = "none";
                setRoomPage();
                const matchingRoomWrap = document.querySelector(".wrap");
                matchingRoomWrap.style.display = "flex";
            });
        }   
    });
}

function createCalendar(year, month) {
    let nowCalendarDate = new Date(year, month, 1);
    nowYear = nowCalendarDate.getFullYear();
    nowMonth = nowCalendarDate.getMonth();
    const calendar_now = document.querySelector(".calendar_now");
    const calendar_nowNodes = calendar_now.children;
    if(calendar_nowNodes[0] != null) {
        calendar_now.removeChild(calendar_nowNodes[0]);
    }
    const pElement = document.createElement("p");
    pElement.setAttribute("id", "yearAndMonth")
    pElement.innerHTML = nowCalendarDate.getFullYear() + "년 " + (nowCalendarDate.getMonth()+1) + "월";
    calendar_now.appendChild(pElement);

    const date_wrap = document.querySelector(".date_wrap");
    const date_wrapNodes = date_wrap.children;
    if(date_wrapNodes.length > 0) {
        const length = date_wrapNodes.length;
        for(let y = 0; y < length; y++) {
            date_wrap.removeChild(date_wrapNodes[0]);
        }
    }
    for(let i = 0; i < 6; i++) {
        const date_week = document.createElement("div"); 
        date_week.classList.add("date_week");
        for(let j = 0; j < 7; j++) {
            const dateElement = document.createElement("div"); 
            dateElement.classList.add("date");
            onClickDate(dateElement);
            // const hrElement = document.createElement("hr");
            // hrElement.style.border = "solid 1px lightgray";
            const pElement = document.createElement("p");
            if(i == 0) {
                if(j < nowCalendarDate.getDay()) {
                    const tmpCalendar = new Date(year, month);
                    tmpCalendar.setDate(tmpCalendar.getDate() - (nowCalendarDate.getDay() - j));
                    pElement.style.color = "lightgray";
                    pElement.innerHTML = tmpCalendar.getDate();
                }
                else {
                    nowCalendarDate.setDate(nowCalendarDate.getDate() + (j-nowCalendarDate.getDay()));
                    pElement.innerHTML = nowCalendarDate.getDate();
                    if(j == 0 || j == 6) {
                        pElement.style.color = "red";
                    }
                    else {
                        pElement.style.color = "#424242";
                    }
                }
            }
            else {
                nowCalendarDate.setDate(nowCalendarDate.getDate() + 1);
                pElement.innerHTML = nowCalendarDate.getDate();
                if(j == 0 || j == 6) {
                    pElement.style.color = "red";
                }
                else {
                    pElement.style.color = "#424242";
                }
            }
            if(nowCalendarDate.getMonth() != nowMonth) {
                pElement.style.color = "lightgray";
            }
            // dateElement.appendChild(hrElement);
            dateElement.appendChild(pElement);
            date_week.appendChild(dateElement);
        }
        date_wrap.appendChild(date_week);
    }
}

createCalendar(initDate.getFullYear(), initDate.getMonth());

function setRoomPage() {
    if(roomList.length < 1) {
        const div = document.querySelector(".matching_current_room_none");
        div.style.display = "flex";
        div.children[0].innerHTML = nowYear + "년" + (nowMonth+1) + "월" + nowDate + "일에 해당하는 방이 없습니다."
        return;
    }
    document.querySelector(".matching_current_room").style.display = "flex";
    const roomInfo = roomList[roomPage];
    const divElement = document.getElementsByClassName("matching_room_div");
    const h1Element = divElement[0].children[0];
    h1Element.innerHTML = "#" + (roomPage+1);
    const date = roomInfo.date.split("-");
    const time = roomInfo.time.split(":");
    divElement[1].children[0].innerHTML = date[1] + "월" + date[2] + "일 " + time[0] + "시 " + time[1] + "분";
    divElement[2].children[0].innerHTML = roomInfo.from;
    divElement[4].children[0].innerHTML = roomInfo.to;
    let imgElement = divElement[5].children[0];
    imgElement.setAttribute("width", "60em");
    imgElement.setAttribute("height", "60em");
    if(roomInfo.gender == "남자") 
        imgElement.setAttribute("src", "../assets/main/room_list/gender_indicator_male.png");
    else if(roomInfo.gender == "여자") 
        imgElement.setAttribute("src", "../assets/main/room_list/gender_indicator_female.png");
    else 
        imgElement.setAttribute("src", "../assets/main/room_list/gender_no_matter_what.png");
    const peopleElement = divElement[6];
    if(peopleElement.children.length > 0) {
        const length = peopleElement.children.length;
        for(let i = 0; i < length; i++) {
            peopleElement.removeChild(peopleElement.children[0]);
        }
    }
    for(let i = 0; i < roomInfo.maximum; i++) {
        imgElement = document.createElement("img");
        imgElement.setAttribute("width", "40em");
        imgElement.setAttribute("height", "40em");
        if(i == 0) 
            imgElement.setAttribute("src", "../assets/main/room_list/person_joined.png");
        else {
            if(roomInfo.members[i - 1] != "0") 
                imgElement.setAttribute("src", "../assets/main/room_list/person_joined.png");
            else
                imgElement.setAttribute("src", "../assets/main/room_list/person_blank.png");
        }
        peopleElement.appendChild(imgElement);
    }
}

function checkMatchingRoom(studentID, password) {
    const wrap = document.querySelector(".matching_room_check_wrap");
    let formDate = new FormData();
    formDate.append("studentID", studentID);
    formDate.append("password", password);
    const payload = new URLSearchParams(formDate);
    fetch('../DataBase/myRoom', {
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
        const room = obj.room_information;
        if(obj.is_matching == null) {
            const divElement = document.createElement("div"); 
            divElement.classList.add("matching_room_myroom");
            const pElement = document.createElement("p");
            pElement.innerHTML = "방이 존재하지 않습니다."
            divElement.appendChild(pElement);
            wrap.appendChild(divElement);
        }
        else {
            setMyRoomList(room);
            if(obj.is_matching == "true") {
                const divElement = document.createElement("div"); 
                divElement.classList.add("matching_check");
                const imgElement = document.createElement("img");
                imgElement.setAttribute("src", "../assets/main/room_list/matching.png");
                imgElement.classList.add('rotating-image');
                imgElement.setAttribute("width", "40em");
                imgElement.setAttribute("height", "40em");
                divElement.appendChild(imgElement);
                const pElement = document.createElement("p");
                pElement.innerHTML = "&nbsp;&nbsp;매칭 중..."
                divElement.appendChild(pElement);
                wrap.appendChild(divElement);
            }
            else if(obj.is_matching == "false") {
                const divElement = document.createElement("div"); 
                divElement.classList.add("matching_room_myroom");
                const pElement = document.createElement("p");
                pElement.innerHTML = "내 방 가기"
                divElement.appendChild(pElement);
                wrap.appendChild(divElement);
            }
        }
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
            checkMatchingRoom(obj.result.success.studentID, obj.result.success.password);
        }
    });
}