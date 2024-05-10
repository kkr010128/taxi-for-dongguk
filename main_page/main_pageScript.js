const script = document.createElement("script");
const personCnt = document.getElementById("maxPerson");
const minusBtn = document.getElementById("minus");
const plusBtn = document.getElementById("plus");
const markers = [null, null]; //중요
const PolyLine = [null]; //중요
const matchFailure = document.querySelector("#match_failure_popup");
const matchPopUp = document.querySelector("#match_popup");
const showPrice = document.getElementById("showPrice");
const matchPopUpBtn = document.getElementById("match_popup_button");
let taxi_prices = 0;

/*script.src = "http://dapi.kakao.com/v2/maps/sdk.js?appkey=?appkey=7bf82169a53be4c855eca8f52959e97e&libraries=services,clusterer,drawing?autoload=false";
script.onload = () => {
    kakao.maps.load(() => {
        console.assert(kakao.maps.Map); 
    });
};
document.body.appendChild(script);*/


// function rotateImage(img) {
    
// };

matchPopUpBtn.addEventListener("click", function() {
    matchPopUp.style.display = "none";
    const mapBox = document.querySelector(".mapBox");
    mapBox.style.visibility = "visible";
});

for(let i = 0; i < create_button.length; i++) {
    create_button[i].addEventListener("click", function() {
        matchFailure.style.display = "none";
        const mapBox = document.querySelector(".mapBox");
        mapBox.style.visibility = "visible";
        if(create_button[i].innerHTML == "YES") {
            const formData = new FormData();
            formData.append("studentID", sessionStorage.key(0));
            formData.append("password", sessionStorage.getItem(sessionStorage.key(0)));
            const payload = new URLSearchParams(formData);
            fetch('../DataBase/createMatchingRoom', {
                method: 'post',
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: payload
            });
        }
    });
}

/**드롭다운 리스트 이벤트 */
document.querySelectorAll("select").forEach(function(e) {
    e.addEventListener("change", function(event){
        if(this.value == "출발지 선택하기" || this.value == "목적지 선택하기") {
            event.preventDefault();
            return;
        }
        if(this.name=="start_location"){
            setMarkers(this.value, "start");
        }else if(this.name=="arrive_location"){
            setMarkers(this.value, "arrive");
        }
    });
});

/**값받기 - 선택한 값 받아서 마커 생성  TODO: 마커 이미지 출/도착 필요 ❤️❤️*/
function setMarkers(values, which){

    var marker;
    var LatLng = [];
    const vertexArr = []; //중요한 놈임

    PolyLine[0]!=null ? PolyLine[0].setMap(null) : null;

    switch(values){
        // case "동국대 정문":
        //     LatLng[0]=35.8625;
        //     LatLng[1]=129.1945;
        //     break;
        case "[동국대] 택시정류장":
            LatLng[0] = 35.861399;
            LatLng[1] = 129.195216;
            break;
        case "[동국대] 기숙사":
            LatLng[0]=35.863833;
            LatLng[1]=129.191140;
            break;
        case "[석장동] 택시정류장":
            LatLng[0]=35.861372;
            LatLng[1]=129.189675;
            break;
        case "[경주시] 연합기숙사":
            LatLng[0]=35.842033;
            LatLng[1]=129.182027;
            break;
        case "[경주시] 예비군 훈련장":
            LatLng[0]=35.854379;
            LatLng[1]=129.237773;
            break;
        case "[신경주역] 택시정류장":
            LatLng[0]=35.798301;
            LatLng[1]=129.140145;
            break;
        case "[경주시] 시외버스터미널":
            LatLng[0]=35.839428;
            LatLng[1]=129.202335;
            break;
        case "[황리단길] 첨성대,대릉원주차장":
            LatLng[0]=35.834694;
            LatLng[1]=129.215668;
            break;
        case "[황리단길] 경주공고":
            LatLng[0]=35.837309;
            LatLng[1]=129.207140;
            break;
        case "[황리단길] 중앙광장,공영주차장":
            LatLng[0]=35.837410;
            LatLng[1]=129.209759;
            break;
    }
    
    if(which=="start"){
        imageSize = new kakao.maps.Size(48, 52), // 마커이미지의 크기입니다
        imageOption = {offset: new kakao.maps.Point(24, 47)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
        var imageSrc = 'https://media.discordapp.net/attachments/1175471776373952572/1178934329993338910/marker_start.png?ex=6577f327&is=65657e27&hm=706b56782aefb14b6658a3b5b3cfa457d34dbbc5040c45ae4b6be4851f5d6f91&=&format=webp&quality=lossless&width=512&height=552'; // 마커이미지의 주소입니다    
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
    }
    else if(which=="arrive"){
        imageSize = new kakao.maps.Size(35, 34), // 마커이미지의 크기입니다
        imageOption = {offset: new kakao.maps.Point(10, 34)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
        var imageSrc = 'https://media.discordapp.net/attachments/1175471776373952572/1178941073549185074/marker_arrive.png?ex=6577f96f&is=6565846f&hm=824c62d35eb3c86f9d3aa2fe83d30c8444aa5014c99e5bebb2e701b312c79ebc&=&format=webp&quality=lossless&width=320&height=308'; // 마커이미지의 주소입니다    
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
    }
    
    marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(LatLng[0], LatLng[1]),
        image: markerImage
        

    });

    //이전 마커 지우기
    if(which=="start" && markers[0]!=null){
        markers[0].setMap(null);
        markers[0] = marker;
    }else if(which=="arrive" && markers[1]!=null){
        markers[1].setMap(null);
        markers[1] = marker;
    }

    which=="start" ? markers[0]=marker : markers[1]=marker;
    marker.setMap(map);

    //지도 중심 이동하기, 경로 생성
    if(markers[0]==null || markers[1]==null){
        map.panTo(new kakao.maps.LatLng(LatLng[0], LatLng[1]));
    }else if(markers[0]!=null && markers[1]!=null) { 

        map.setBounds(new kakao.maps.LatLngBounds(markers[0].getPosition(), markers[1].getPosition()));
        /*var markerInfoWindow = new kakao.maps.InfoWindow({
            map: map,
            position: new kakao.maps.LatLng(33.450701, 126.570667),
            content: '목적지까지의 소요시간: 2시간'
        });
        markerInfoWindow.open(map, markers[0]);*/
        if(vertexArr.length!=0)
            vertexArr.length=0;
        
        var start_x = markers[0].getPosition().getLng();
        var start_y = markers[0].getPosition().getLat();
        var arrive_x = markers[1].getPosition().getLng();
        var arrive_y = markers[1].getPosition().getLat();

        var routeUrl = `https://apis-navi.kakaomobility.com/v1/directions?priority=RECOMMEND&car_type=1&car_fuel=GASOLINE&origin=${start_x},${start_y}&destination=${arrive_x},${arrive_y}`;

        let header = {
            method: "GET",
            headers: {
                Authorization: "KakaoAK a6f9e20a12bfdba4e1ef0fc22d616bcc"
            },
        };
        //Ajax 호출
        fetch(routeUrl, header)
        .then((response) => {
            if (!response.ok) {
                throw new Error("error");
            }
            return response.json();
        })
        .then((data)=> {
            //console.log(data.routes[0].sections[0].roads); //길 정보
            
    
            //겁나 중요한 샛기
            var createRoute = data.routes[0].sections[0].roads.forEach(marker => {
                marker.vertexes.forEach((vertex, num)=>{
                    if(num%2==0){
                        vertexArr.push(new kakao.maps.LatLng(marker.vertexes[num+1], marker.vertexes[num]));
                    }
                });
            })
            
            var taxiPrice = data.routes[0].summary.fare.taxi;
            //var arriveTime = data.routes[0].sections.duration;
            var optionTab = document.querySelector(".options");
            var persons =  parseInt(personCnt.innerText);

            showPrice.style.display = "flex";
            optionTab.style.height = "41vh";
            showPrice.innerText= `예상되는 개인당 금액은 ${Math.floor(taxiPrice/persons)}원이에요 !`; 
            taxi_prices = taxiPrice;

            var roadLine = new kakao.maps.Polyline({
                path: vertexArr,
                strokeWeight: 5,                  
                strokeColor: "#ffc355", 
                strokeOpacity: 1.0,               
                strokeStyle: "shortline"       
            });
            PolyLine[0] = roadLine;
            roadLine.setMap(map);
        })
    }
}

let degree = 0;
/** 출발, 도착 위치 바꾸기 - 마커 바뀌는거까지 구현 완*/
document.getElementById("changeBtn").addEventListener("click", function(){
    let start = document.getElementById("setStart");
    let arrive = document.getElementById("setArrive");
    let temp = start.value;
    let tmpMarker;
    let tmpMarkerImage;

    start.value = arrive.value;
    arrive.value = temp;
    
    // console.log(markers[0].getPosition(), " ", markers[1].getPosition());
    tmpMarker = markers[0];
    markers[0] = markers[1];
    markers[1] = tmpMarker;
    
    tmpMarkerImage = markers[0].getImage();
    markers[0].setImage(markers[1].getImage());
    markers[1].setImage(tmpMarkerImage);


    const img = document.querySelector("#change");
    // console.log(img);
    degree ++;
    img.style.transition = "transform 0.7s ease-in-out";
    img.style.transform = "rotate(" + (180*degree) + "deg)";
    // console.log(markers[0].get, " ", markers[1].getPosition());
});


/**사람 수 조정 +, - 버튼 */
plusBtn.addEventListener("click", function(){
    let temp=0;
    if(parseInt(personCnt.innerText) < 4){
        minusBtn.disabled=false;
        minusBtn.style.borderColor="rgb(255, 194, 85)";
        temp = parseInt(personCnt.innerText)+1;
        personCnt.innerText = temp;
        if(personCnt.innerText==4){
            plusBtn.style.borderColor="#ffffff";
            plusBtn.disabled=true;
        }
    }
    if(showPrice.style.display == "flex"){
        showPrice.innerText=`예상되는 개인당 금액은 ${Math.floor(taxi_prices/personCnt.innerText)}원이에요 !`; 
    }
});

minusBtn.addEventListener("click", function(){
    let temp=0;
    if(parseInt(personCnt.innerText) > 2){
        plusBtn.disabled=false;
        plusBtn.style.borderColor="rgb(255, 194, 85)";
        temp = parseInt(personCnt.innerText)-1;
        personCnt.innerText = temp;
    if(personCnt.innerText==2){
        minusBtn.style.borderColor="#ffffff";
        minusBtn.disabled=true;
        }
    }
    if(showPrice.style.display == "flex"){
        showPrice.innerText=`예상되는 개인당 금액은 ${Math.floor(taxi_prices/personCnt.innerText)}원이에요 !`; 
    }
});

/**취소 버튼 이벤트 */
document.getElementById("cancelBtn").addEventListener('click', function(){
    window.location.reload();
});
   
/**완료버튼 이벤트 TODO: 누를 시 매칭 + 정보를 넘겨주는 기능 추가 필요 */
document.getElementById("setBtn").addEventListener('click', function(){
    // var serverUrl = "http://택시.com/main_page/main_page.html"; //"http://dongguk-taxi.kro.kr";
    
    // var formdata = new FormData();
    // formdata.append("equal_sex",);
    // var swi = document.getElementById("switch1");
    // console.log(swi.Check);
    // var options = {
    //     method: "POST",
    //     body: formdata
    // };
    // fetch(serverUrl, options)
    // .then(response => response.json())
    // .then(data=>{
    //     console.log(data);
    // })
    const formData = matchData();
    if(formData == null) {
        return;
    }
    const payload = new URLSearchParams(formData);
    fetch('../DataBase/matchingStart', {
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
        if(txt == "-1") {
            matchFailure.style.display = "flex";
            matchFailure.children[0].children[0].innerHTML = "조건이 맞는 사람이 존재하지 않습니다. 방을 생성하시겠습니까 ? (생성하지 않으셔도 매칭은 계속 진행됩니다.)"
            const mapBox = document.querySelector(".mapBox");
            mapBox.style.visibility = "hidden";
        }
        else if(txt == "0") {
            matchPopUp.style.display = "flex";
            matchPopUp.children[0].children[0].innerHTML = "이미 매칭 중입니다. 새로운 매칭을 원하시면 취소 후 이용해주세요."
            const mapBox = document.querySelector(".mapBox");
            mapBox.style.visibility = "hidden";
        }
        else if(txt == "1" ) {
            matchPopUp.style.display = "flex";
            matchPopUp.children[0].children[0].innerHTML = "조건 맞는 사람을 찾았습니다."
            const mapBox = document.querySelector(".mapBox");
            mapBox.style.visibility = "hidden";
        }
        else if(txt == "2") {
            matchPopUp.style.display = "flex";
            matchPopUp.children[0].children[0].innerHTML = "이미 해당 날짜에 사용자가 존재합니다."
            const mapBox = document.querySelector(".mapBox");
            mapBox.style.visibility = "hidden";
        }
    });
});

function matchData() {
    const formData = new FormData();
    formData.append("studentID", sessionStorage.key(0));
    formData.append("password", sessionStorage.getItem(sessionStorage.key(0)));
    //const date = new Date();
    const year = new Date();
    const setDate = document.getElementById("setDate").value.split('-');
    const hour = document.querySelector("#setTime");
    const minute = document.querySelector("#setMinute");
    //const dateTime = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + " " + hour.value + ":" + minute.value;
    const dateTime = year.getFullYear() + "-" + (setDate[1] + "-" + setDate[2] + " " + hour.value + ":" + minute.value);
    formData.append("dateTime", dateTime);
    
    const from = document.querySelector("#setStart");
    if(from.value == "출발지 선택하기") {
        return null;
    }
    formData.append("from", from.value);

    const to = document.querySelector("#setArrive");
    if(to.value == "목적지 선택하기") {
        return null;
    }
    formData.append("to", to.value);

    const genderSwitch = document.querySelector("#switch1");
    const gender = genderSwitch.checked ? "동성" : "모두";
    formData.append("gender", gender);

    const t = document.querySelector("#maxPerson");
    formData.append("maximum", parseInt(t.innerHTML));

    const weightSwitch = document.querySelector("#switch1");
    const weight = weightSwitch.checked ? 2 : 1;
    formData.append("weight", weight);
    return formData;
}

window.onload = function() {
    if(sessionStorage.key(0) == null) {
        location.href = "../index.html";
        return;
    }
    let formData = new FormData();
    formData.append("studentID", sessionStorage.key(0));
    formData.append("password", sessionStorage.getItem(sessionStorage.key(0)));
    const payload = new URLSearchParams(formData);
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
    });
}
   
/**지도 생성하기❤️ 
function generateMap(){
    var container = document.getElementById('map'),
    options = {
		center: new kakao.maps.LatLng(35.862192, 129.195048),
		level: 3
	};
	var map = new kakao.maps.Map(container, options);

    var roadLine = new kakao.maps.Polyline({
        strokeWeight: 5,                  //선 두께
        strokeColor: "rgb(255, 155, 47)", //선 색깔
        strokeOpacity: 0.7,               //선 불투명도
        strokeStyle: "shortdashdot"       //선 종류
    });

    return map;
}*/