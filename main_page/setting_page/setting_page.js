// function redirectDevInfo() {
//     window.location.href = "http://dongguk-taxi.kro.kr/dongguk_dh/main_page/setting_page/dev_info/dev_info.html";
//   }

  /*const handle = document.getElementById("handle");
  const drawer = document.getElementById("drawer");*/
  const mainWrap = document.querySelectorAll(".wrap_main");
  const handle = document.querySelectorAll(".setting_detail1:not(.policy, .dev_info)");
  const drawers = document.querySelectorAll(".drawer");
  
  function drawerClose(){
    drawers.forEach((drawer)=> {
      var drawerid = document.getElementById(drawer.id);
      if (drawerid.classList.contains("drawer_open")) {
        console.log("drawer Closed!");
        drawerid.classList.remove("drawer_open");
        drawerid.classList.add("drawer_close");
      }
    });
  }
  
  handle.forEach((handle) => handle.addEventListener("click", function(){
    drawers.forEach((drawer)=> {

      var handleid = document.getElementById(handle.id);
      var drawerid = document.getElementById(drawer.id);
      if(handleid.contains(drawerid)){
        if (drawerid.classList.contains("drawer_close")) {
          for(let i=0; i<drawers.length; i++){
            if(drawers[i].classList.contains("drawer_open")){
              drawers[i].classList.remove("drawer_open");
              drawers[i].classList.add("drawer_close");
            }
          }
          console.log("drawer Open!");
          drawerid.classList.remove("drawer_close");
          drawerid.classList.add("drawer_open");
        }
        else if (drawerid.classList.contains("drawer_open")) {
          console.log("drawer Closed");
          drawerid.classList.remove("drawer_open");
          drawerid.classList.add("drawer_close");
        }
      }
    });
  }));

  mainWrap.forEach((e) => e.addEventListener("click", drawerClose));

  /**드로어 슬라이드 이벤트*/
  document.addEventListener("DOMContentLoaded", function(){
    const slideBar = document.querySelectorAll("hr");
    var x;
    var y;
    
    //터치 시작
    slideBar.forEach((bar) => bar.addEventListener("touchstart",(event)=>{
      x = event.touches[0].pageX;
      y = event.touches[0].pageY;
      console.log("event: touchstart x: ", x, "y: ", y);
    }));

    //터치 중
    slideBar.forEach((bar) => bar.addEventListener("touchmove", function(e){
      console.log("event:touchmove Start");
      var movingX = e.touches[0].pageX;
      var movingY = e.touches[0].pageY;
      //var screenHeight = window.screen.height;
      var Ygap = y-movingY;
      drawers.forEach((drawer)=>{
        
        if(Ygap > 0){ //위로 슬라이드 할 때
          if(drawer.classList.contains("drawer_open")){
            console.log(movingY);
            drawer.style.transition = "0.7s ease-in-out";
            //var fuck = screenHeight-y
            drawer.style.top=`${movingY}px`;
            drawer.style.transform = `translateY(${Ygap}px);`
          }

        }else if(Ygap < 0){ //아래로 슬라이드 할 때
          if(drawer.classList.contains("drawer_open")){
            drawer.style.transition = "0.7s ease-in-out";
            drawer.style.top=`-${movingY}px`;
          drawer.style.transform = `translateY(-${Ygap}px);`
            //아니 이거 스크롤 이슈가 너무 큼 ㄹㅇ
          }
        }
      });
    }));

    //터치 끝난 시점
    slideBar.forEach((bar) => bar.addEventListener("touchend", function(e){
      var moveX = e.changedTouches[0].pageX;
      var moveY = e.changedTouches[0].pageY;
      if(430<moveY){
        drawers.forEach((drawer)=>{
          if(drawer.classList.contains("drawer_open")){
            drawer.classList.remove("drawer_open");
            drawer.classList.add("drawer_close");
            drawer.style.top="58%";
            console.log("drawer closed!");
          }
        });
      }
      console.log("event: touchend x: ", moveX, "y: ", moveY);
    }));
  });
  

  const imageUpload = document.getElementById("imageUpload");

  imageUpload.addEventListener("change", function(event) {
  const file = event.target.files[0];
  
  // 파일 처리 로직 추가
});


const contact_name = document.getElementById("contact_name");
const contact_email = document.getElementById("contact_email");
const contact_massage = document.getElementById("contact_message");

const send = document.getElementById("send");
send.addEventListener("click", function(){
        // 웹훅에 전송할 데이터
        console.log(contact_name.value);
        // 웹훅에 전송할 데이터
        const date = new Date();
        date.setHours(date.getHours() - 9);
        let timeStamp = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + "T";
        const hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        const minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        timeStamp += hour + ":" + minute;
        const webhookUrl = "https://discord.com/api/webhooks/1181191735611764847/UzVdP2-SsDjO9NdHt075SMifzfb2GIC90r3QX2Osc5PWrO1zw8HrAk0zbt_DeNDb9dTH"; // 디스코드 웹훅 URL을 입력하세요.
        
        const contact_message = document.getElementById("contact_message").value;
        if (contact_message.trim() === "") {
          // 메시지 입력 안하면 전송 안됨 
          alert("메시지 내용을 입력해주세요.");
          return;
        }

        const payload = {
            content: "고객센터 문의가 접수되었습니다.",
            embeds: [
                {
                    "title": "제목: " + contact_name.value,
                    "description": "회신용 이메일: "+ contact_email.value +"\n문의 내용: "+contact_massage.value,
                    "color": 11009959,
                    "author": {
                        "name": "동행: 같이타요"
                    },
                    "timestamp": timeStamp
                }
            ],
            attachments: [],
            username: "웹훅 봇" // 웹훅 메시지의 사용자명
        };
  
        // 웹훅 전송 요청
        fetch(webhookUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        })
        .then((response) => {
            if (response.ok) {
            console.log("웹훅 전송 성공!");
            } else {
            console.error("웹훅 전송 실패!");
            }
        })
        .catch((error) => {
            console.error("웹훅 전송 중 오류 발생:", error);
        });//END
});

function createProfile(studentID, name) {
  const wrap = document.querySelector(".user_info_inner");
  wrap.children[0].innerHTML = studentID + " " + name;
}

window.onload = function() {
  if(sessionStorage.key(0) == null) {
      location.href = "../../index.html";
      return;
  }
  let formData = new FormData();
  formData.append("studentID", sessionStorage.key(0));
  formData.append("password", sessionStorage.getItem(sessionStorage.key(0)));
  const payload = new URLSearchParams(formData);
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
          location.href = "../index.html";
      }
      else {
        createProfile(obj.result.success.studentID, obj.result.success.name);
      }
  });
}
function logOut() {
  const expired = new Date();
  expired.setDate(expired.getDate() - 1);
  let cookie = "";
  cookie += sessionStorage.key(0) + "=";
  cookie += sessionStorage.getItem(sessionStorage.key(0)) + ";";
  cookie += "path=/;"
  cookie += "Expires=" + expired.toUTCString();
  document.cookie = cookie
  sessionStorage.clear();
  location.href = "/index.html"
}

// const homeBar = document.querySelector(".home");
// homeBar.addEventListener("click", function() {
   
// });

// document.addEventListener('touchmove', function (event) {
//     if (event.scale !== 1) { event.preventDefault(); }
//   }, { passive: false });

//   document.documentElement.addEventListener('touchstart', function (event) {
//     if (event.touches.length > 1) {
//          event.preventDefault(); 
//        } 
// }, false);

// var lastTouchEnd = 0; 

// document.documentElement.addEventListener('touchend', function (event) {
//     var now = (new Date()).getTime();
//     if (now - lastTouchEnd <= 300) {
//          event.preventDefault(); 
//        } lastTouchEnd = now; 
// }, false);



// $('#name').keyup(function(){
//   $('.name').addClass('typing');
//   if( $(this).val().length == 0 ) {
//       $('.name').removeClass('typing');
//   }
// });
// $('#email').keyup(function(){
//   $('.email').addClass('typing');
//   if( $(this).val().length == 0 ) {
//       $('.email').removeClass('typing');
//   }
// });
// $('#message').keyup(function(){
//   $('.message').addClass('typing');
//   if( $(this).val().length == 0 ) {
//       $('.message').removeClass('typing');
//   }
// });


