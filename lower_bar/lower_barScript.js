function showLowerBar() {  
  const head = document.getElementsByTagName("head"); //css 파일을 html과 연결시켜줌
  const cssLinkElement = document.createElement("link");
  cssLinkElement.setAttribute("rel", "stylesheet");
  cssLinkElement.setAttribute("href", "../lower_bar/lower_barStyle.css");
  head[0].appendChild(cssLinkElement); 

  const body = document.getElementsByTagName("body"); 

  const wrapElement = document.createElement("div"); 
  wrapElement.classList.add("lower_bar_wrap");

  const lowerBarElement = document.createElement("div");
  lowerBarElement.setAttribute("class", "lower_bar");

  const tagInformation = [ ["home", "home", ""], // 각종 태그들의 속성 정보를 보관함
                      ["matching", "search", ""],
                      ["matching_room", "list", ""],
                      ["chatting", "chats", ""],
                      ["setting", "settings", ""]
  ];

  for(let i = 0; i < tagInformation.length; i++) { //lower_bar안에 홈, 매칭, 매칭 방 목록, 채팅, 설정 등을 추가해줌
    const tagInf = tagInformation[i];
    const divElement = document.createElement("div");
    divElement.setAttribute("class", tagInf[0]);
    divElement.setAttribute("onclick", tagInf[2]);
    const imageElement = document.createElement("img")
    imageElement.setAttribute("src", "../assets/main/" + tagInf[1] + ".png");
    imageElement.setAttribute("width", "50%");
    imageElement.setAttribute("height", "35vh");
    divElement.appendChild(imageElement);
    lowerBarElement.appendChild(divElement);
  };
  wrapElement.appendChild(lowerBarElement);
  body[0].appendChild(wrapElement);
}

showLowerBar();

document.addEventListener('touchmove', function (event) {
    if (event.scale !== 1) { event.preventDefault(); }
  }, { passive: false });

  document.documentElement.addEventListener('touchstart', function (event) {
    if (event.touches.length > 1) {
         event.preventDefault(); 
       } 
}, false);

var lastTouchEnd = 0; 

document.documentElement.addEventListener('touchend', function (event) {
    var now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
         event.preventDefault(); 
       } lastTouchEnd = now; 
}, false);
