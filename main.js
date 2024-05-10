const confirmBtn = document.querySelector('#confirm');
const popup = document.querySelector('.login_popup');
const login_form = document.querySelector("#login_form");

/**html 로드 시 쿠키 남아있으면 자동 로그인 이벤트 - 미구현 */
document.addEventListener("DOMContentLoaded", function(){
    const cookie = document.cookie;
    if(cookie != "") {
        const cookieSplit = cookie.split("=");
        login(cookieSplit[0], cookieSplit[1]);
    }
});


login_form.addEventListener("submit", function(e) {
    e.preventDefault();
    const formData = new FormData(login_form);
    const userId = formData.get("userId");
    const password = formData.get("password");
    if(!Number.isInteger(parseInt(userId))) {
        popup.children[1].innerHTML = "아이디는 본인 학번을 입력해주세요."
        popup.classList.add('login_open_popup');
        return; 
    }
    login(userId, password);
});

confirmBtn.addEventListener('click', function() {
    popup.classList.remove('login_open_popup');
});

function login(studentID, password) {
    const formData = new FormData();
    formData.append("userId", studentID);
    formData.append("password", password);
    const payload = new URLSearchParams(formData);
    fetch('../../../DataBase/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: payload,
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        const userJson = JSON.stringify(json);
        const obj = JSON.parse(userJson);
        if(obj.result == "failure") {
            popup.children[1].innerHTML = "아이디 혹은 비밀번호가 일치하지 않습니다."
            popup.classList.add('login_open_popup');
        }
        else { 
            const userDate = obj.result.success;
            location.href = "../home/home.html";
            sessionStorage.setItem(userDate.studentID, userDate.password);
            if(isChecked()){
                setCookie(userDate.studentID, userDate.password);
            }
            webViewCallBack();
        }
    });
}

/**회원가입 페이지로 이동시키는 함수*/
function gotoSignUp(){
    window.location.href="../register/register.html";
}

/**입력값 이메일인지 체크해서 툴팁 띄우기*/
function checkEmail() {
    var emailInput = document.querySelector('input[type="email"]');
    var tooltip = document.getElementById('tooltip');
    var pattern = /^[a-zA-Z0-9._%+-]+@dongguk\.ac.kr$/;

    if (!pattern.test(emailInput.value)) { //이메일 패턴 일치하지 않을 때

        LoginBtn.disabled = true;
        tooltip.style.display = "inline"; //툴팁 보이기
        LoginBtn.style.cursor = "default";//입력 안됬을 때는 못 누르게
        LoginBtn.style.background = "#d3d3d3"; //배경
        LoginBtn.style.color = "white"; //글자

    } else { //이메일 형식이 일치할 때만 로그인버튼 활성화

        LoginBtn.style.color= "white"; // 글자색
        var lcolor = "rgb(194, 68, 46)"; // 버튼 좌측 색깔
        var rcolor = "rgb(255, 155, 47)"; // 버튼 우측 색깔

        LoginBtn.style.cursor = "pointer"; //커서 변환
        LoginBtn.style.background = `linear-gradient(to left, ${lcolor}, ${rcolor})`;
        LoginBtn.disabled = false; //버튼 클릭 불가 해제
        tooltip.style.display = "none"; // 툴팁 숨기기
    }
}

/**체크박스 체크 시 TODO: 로그인 정보 저장 어떻게 할 건지 구현*/
function isChecked(){ 
    var checkBox = document.getElementById("checkBox");
    var checker = false;
    if(checkBox.checked){
        checker = true;
    }
    /*checkBox.addEventListener("change", function(){
        if(this.checked) {
            checker = true;
        }else{
            checker = false;
        }
    });*/
    return checker;
}


/**쿠키값을 세팅*/
function setCookie (cookieName, cookieValue) {
    const expired = new Date();
    expired.setFullYear(expired.getFullYear() + 1);
    let cookie = "";
    cookie += cookieName + "=";
    cookie += cookieValue + ";";
    cookie += "Expires=" + expired.toUTCString();
    document.cookie = cookie
    //httpOnly 옵션 추가해야 댐 (서버)
}

/**쿠키 조회 */
function getCookie (cookieName){
    var name = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return null;
}

/**쿠키 삭제 - 로그아웃 시*/
function deleteCookie (cookieName) {
    document.cookie = `${cookieName}=0; max-age=0;`;
};

function webViewCallBack() {
    const studentID = parseInt(sessionStorage.key(0));
    WebViewCallbackInterface.sendFCMToken(studentID, sessionStorage.getItem(sessionStorage.key(0)));
}
