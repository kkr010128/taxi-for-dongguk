let pg_v = document.querySelector(".pg_v");
let pg = document.querySelector(".innerCircle");
let c = 0;
const drawer = document.querySelector(".drawer");
const reviewBtn = document.querySelector("#reviewBtn");
let c1 = -10; // 온도 그라데이션 표현을 위한것
// let degree = 300; // 이 값 수정하면 온도 바뀜 0~360

let reviewRoomNum;

// 30~40 사이 값으로 변환해서 저장. toFixed(1)은 소수점 1자리까지
// let temper = (30 + (degree / 360) * 10).toFixed(1);
let temper;
let degree;

//온도에 따라 달라지는 코멘트
let degreeComent = null;

//온도계 돌아가는 애니메이션 setInterval({}, 1) 는 {}안에 이벤트, 1ms 마다 갱신
function animation() {
  if (degree < 100) {
    degreeComent = "좋지 않아요..";
  } else if (100 <= degree && degree < 200) {
    degreeComent = "보통이에요 :)";
  } else if (200 <= degree && degree < 300) {
    degreeComent = "좋아요!";
  } else if (300 <= degree) {
    degreeComent = "최고에요!";
  }
  document.getElementById("degree-value").textContent =
    temper + "도. " + degreeComent;
  let plus = setInterval(() => {
    c += 1;
    c1 += 1;
  
    document.getElementById("temperature").textContent = ((c / 360) * 99).toFixed(1); // 숫자 띠리리링 하게
  
    pg.style.background = `conic-gradient(orange ${c1}deg, white ${c}deg)`; // 대충 큰 원이 잠수함 레이더처럼 한바퀴 돌면서 주황색으로 변함
    pg_v.innerHtml = Math.floor((c / 360) * 100) + "%"; // 그리고 안에 하얀색 살짝 작은 원으로 가려서 원형 프로그레스바 처럼 보이는것
  
    // 설정한 온도 이상으로 c가 올라가면 정지
    if (c >= degree) {
      clearInterval(plus);
      document.getElementById("temperature").textContent = temper;
    }
  }, 1);
}

//스케쥴 코멘트
// let scheduleTime = 10; // 팟 시간 변수
// let departure = "경주역"; // 팟 출발지 변수
// let destination = "동국대"; // 팟 목적지 변수
// document.getElementById("schedule-text").textContent =
//   scheduleTime + "시 " + departure + " - " + destination + " 팟이 있어요";

window.onload = function () {
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
        temper = obj.result.success.kindness;
        degree = (temper / 99) * 360;
        animation();
        getSchedule(obj.result.success.studentID, obj.result.success.password);
      }
    });
}

function getSchedule(studentID, password) {
  let formDate = new FormData();
  formDate.append("studentID", studentID);
  formDate.append("password", password);
  const payload = new URLSearchParams(formDate);
  fetch('../DataBase/mySchedule', {
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
      const result = JSON.stringify(json);
      const obj = JSON.parse(result);
      const myRoom = obj.room_information;
      const dateTime = new Date();
      let x = dateTime.getFullYear() + "-" + (dateTime.getMonth()+1) + "-";
      if(dateTime.getDate() < 10){
        let a = "0" + dateTime.getDate();
        x = x+a;
      }
      // const z = myRoom[0].time.split(":");
      if(myRoom == "없음" || myRoom == "오류" ) {
        document.getElementById("schedule-text").textContent = "일정이 없습니다.";
      }
      else {
        document.getElementById("schedule-text").textContent = 
        myRoom.date + " " + myRoom.time + " " + myRoom.from + " -> " + myRoom.to;
      }
      reviewGUI(studentID, password);
    });
}

function reviewGUI(studentID, password) {
  const formDate = new FormData();
  formDate.append("studentID", studentID);
  formDate.append("password", password);
  const payload = new URLSearchParams(formDate);
  fetch('../DataBase/review', {
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
    const result = JSON.stringify(json);
    const obj = JSON.parse(result);
    const roomInformation = obj.room_information;
    if(roomInformation == "없음") {
      return;
    }
    reviewRoomNum = roomInformation.number;
    drawer.classList.remove("drawer_close");
    drawer.classList.add("drawer_open");
    const members = obj.user_information;
    const title = document.querySelector("#reviewTitle");
    title.innerHTML = roomInformation.date + " " + roomInformation.time + " " + roomInformation.from + " -> " + roomInformation.to;
    const docUserArray = document.getElementsByClassName("drawer_lines");
    for(let i = 0; i < members.length; i++) {
      const member = members[i];
      const docUser = docUserArray[i];
      docUser.style.display = "flex";
      const userName = docUser.children[0];
      const studentID = docUser.children[1];
      userName.innerHTML = member.name;
      studentID.innerHTML = member.studentID;
    }
  });
}

/*function openDrawer() {
  document.getElementById("user_log").style.height = "800px";
} 이용내역 네모 누르면 밑에 내역 쭈르륵 나오게 하고 싶엇는데 일단 보류 그냥 새 창 만들고 연결하던가 네모 누르면 드르륵 밑에 열리게 연결하던가..*/

function open_log() {
  window.location.href = "use_log/use_log.html"; // 이용내역 페이지로 이동
}


reviewBtn.addEventListener("click", function(){
  var formData = new FormData();
  const docUserArray = document.getElementsByClassName("drawer_lines");
  const members = new Array(3);
  const sender = sessionStorage.key(0);
  const password = sessionStorage.getItem(sender);
  formData.append("sender", sender);
  formData.append("password", password);
  formData.append("roomNumber" , reviewRoomNum);
  const stars = document.getElementsByName("stars");
  for(let i = 0; i < docUserArray.length; i++) {
    const docUser = docUserArray[i];
    if(docUser.style.display == "flex") {
      const studentID = docUser.children[1].innerHTML;
      const starScore = [-2.5, -1, 0, 1, 2.5];
      let count = 0;
      for(let j = i * 5; j < (i+1)*5; j++) {
        if(stars[j].checked) {
          count = j%5;
        }
      }
      formData.append(studentID, starScore[count]);
    }
  }
  const payload = new URLSearchParams(formData);
  fetch('../DataBase/sendReview', {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: payload
  });

  drawer.classList.remove("drawer_open");
  drawer.classList.add("drawer_close");
});