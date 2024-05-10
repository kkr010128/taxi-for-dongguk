const blockContainer = document.getElementById("log_container");
const today = new Date();

function getUseLog(studentID) {
  let formDate = new FormData();
  formDate.append("studentID", studentID);
  formDate.append("year", today.getFullYear());
  formDate.append("month", today.getMonth() + 1);
  formDate.append("date", today.getDate());
  formDate.append("hour", today.getHours());
  formDate.append("minute", today.getMinutes());
  const payload = new URLSearchParams(formDate);
  fetch('../../DataBase/useLog', {
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
    const useLogList = JSON.parse(roomJson).room_information;
    createUseLogGUI(useLogList);
  });
}

function createUseLogGUI(useLogList) {
  const blockCount = useLogList.length;
  for (let i = 0; i < blockCount; i++) {
    const useLog = useLogList[i];
    const block = document.createElement("div");
    block.classList.add("log");

    const dateElement = document.createElement("p");
    dateElement.innerHTML = useLog.date + " " + useLog.time;
    block.appendChild(dateElement);

    const placeElement = document.createElement("p");
    placeElement.innerHTML = useLog.from + " -> " + useLog.to;
    block.appendChild(placeElement);

    blockContainer.appendChild(block);
  }
}

function back() {
  window.location.href = "../home.html"; // 화살표 누르면 홈화면으로
}

window.onload = function () {
  if(sessionStorage.key(0) == null) {
      location.href = "../index.html";
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
        location.href = "../index.html";
      }
      else {
        getUseLog(obj.result.success.studentID);
      }
    });
}
