function showLowerNav() {  
  const head = document.getElementsByTagName("head"); 
  const cssLinkElement = document.createElement("link");
  cssLinkElement.setAttribute("rel", "stylesheet");
  cssLinkElement.setAttribute("href", "./nav_neumorph.css");
  head[0].appendChild(cssLinkElement); 

  const body = document.getElementsByTagName("body"); 

  const wrapElemnt = document.createElement("div");
  wrapElemnt.classList.add("nav_wrap");

  const navElement = document.createElement("nav"); 
  navElement.classList.add("nav");

  const navChildOptions = [["orange","메인"], 
                          ["red","매칭"], 
                          ["blue", "파티"], 
                          ["green", "채팅"], 
                          ["rebeccapurple", "설정"]];

  const a_href = "http://택시.com/home/home.html"; // 필요할 때 바꾸기 나중에 navChildOption으로 각각 옵션줘도 댐http://택시.com/home/home.html
  const b_href = "http://택시.com/main_page/main_page.html"; // 필요할 때 바꾸기 나중에 navChildOption으로 각각 옵션줘도 댐http://택시.com/main_page/main_page.html
  const c_href = "http://택시.com/matching_room/matching_room.html"; // 필요할 때 바꾸기 나중에 navChildOption으로 각각 옵션줘도 댐http://택시.com/matching_room/matching_room.html
  const d_href = "http://택시.com/chat/chatroom/room.html"; // 필요할 때 바꾸기 나중에 navChildOption으로 각각 옵션줘도 댐
  const e_href = "http://택시.com/main_page/setting_page/setting_page.html"; // 필요할 때 바꾸기 나중에 navChildOption으로 각각 옵션줘도 댐
  const nav_normal = "nav-item";
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 지금 네비 바 a b c d e 이렇게 나뉘어져있고 각 순서대로 색도 정해져 있어서 해당 메뉴를 눌렀을 때 그 페이지로 이동하면서 아래 네비바에도
// 변한 색이 적용되면서 애니메이션이 보여져야하는데 그게 안되고 있어요 수민선생님 도와주세요
// -> 지금 바로 도와드립니다
  for(let i=0; i<navChildOptions.length; i++){
    const navChildSets = navChildOptions[i];
    const navChildElement = document.createElement("a");
    navChildElement.setAttribute("active-color", navChildSets[0]);
    navChildElement.setAttribute("href", a_href);
    if(i==0){
      navChildElement.classList.add(nav_normal);
      navChildElement.classList.add("is-active");
      navChildElement.setAttribute("href", a_href);
    }
    else if(i==1){
      navChildElement.classList.add(nav_normal);
      navChildElement.classList.add("is-active");
      navChildElement.setAttribute("href", b_href);
    }
    else if(i==2){
      navChildElement.classList.add(nav_normal);
      navChildElement.classList.add("is-active");
      navChildElement.setAttribute("href", c_href);
    }
    else if(i==3){
      navChildElement.classList.add(nav_normal);
      navChildElement.classList.add("is-active");
      navChildElement.setAttribute("href", d_href);
    }
    else if(i==4){
      navChildElement.classList.add(nav_normal);
      navChildElement.classList.add("is-active");
      navChildElement.setAttribute("href", e_href);
    }
    else{
      navChildElement.classList.add(nav_normal);
    }
    navChildElement.innerText = navChildSets[1];
    navElement.appendChild(navChildElement);

  }

  
  const navIndicatorElement = document.createElement("span");
  navIndicatorElement.setAttribute("class", "nav-indicator");
  navElement.appendChild(navIndicatorElement);
  wrapElemnt.appendChild(navElement);
  body[0].appendChild(wrapElemnt);
}

  showLowerNav();


const indicator = document.querySelector('.nav-indicator');
const items = document.querySelectorAll('.nav-item');
/*
function handleIndicator(el) {
  items.forEach(item => {
    item.classList.remove('is-active');
    item.removeAttribute('style');
  });
  
  indicator.style.width = `${el.offsetWidth}px`;
  indicator.style.left = `${el.offsetLeft}px`;
  indicator.style.backgroundColor = el.getAttribute('active-color');

  el.classList.add('is-active');
  el.style.color = el.getAttribute('active-color');
}


items.forEach((item, index) => {
  item.addEventListener('click', (e) => { handleIndicator(e.target)});
  item.classList.contains('is-active') && handleIndicator(item);
});*/

/**html 문서 불러올 때 이벤트*/
document.addEventListener("DOMContentLoaded", function(){

  items.forEach((item) => {
    /*const currentTab = item.href;
    
     if(window.location.href == currentTab){ //현재 주소랑 눌려진 a태그 href 값이랑 비교
        item.classList.add("is-active");
        indicator.style.width = `${item.offsetWidth}px`;
        indicator.style.left = `${item.offsetLeft}px`;
        indicator.style.backgroundColor = item.getAttribute('active-color');
        item.style.color = item.getAttribute('active-color');
     }else{
        item.classList.remove("is-active");
     }*/

     const currentTab = window.location.pathname;
     const tabKinds = ["home", "main_page", "matching_room", "chat", "setting_page"];
     for(let i=0; i<tabKinds.length; i++){
      if(currentTab.includes(tabKinds[i]) && item.href.includes(tabKinds[i])){

        if(tabKinds[i]=="main_page" && currentTab.includes(tabKinds[4])){
          items[4].classList.add("is-active");
          indicator.style.width = `${items[4].offsetWidth}px`;
          indicator.style.left = `${items[4].offsetLeft}px`;
          indicator.style.backgroundColor = items[4].getAttribute('active-color');
          items[4].style.color = items[4].getAttribute('active-color');
        }else if(tabKinds[i]=="main_page" && !currentTab.includes(tabKinds[4])){
          items[1].classList.add("is-active");
          indicator.style.width = `${items[1].offsetWidth}px`;
          indicator.style.left = `${items[1].offsetLeft}px`;
          indicator.style.backgroundColor = items[1].getAttribute('active-color');
          items[1].style.color = items[1].getAttribute('active-color');
        }else{
          item.classList.add("is-active");
          indicator.style.width = `${item.offsetWidth}px`;
          indicator.style.left = `${item.offsetLeft}px`;
          indicator.style.backgroundColor = item.getAttribute('active-color');
          item.style.color = item.getAttribute('active-color');
        }
      }
     }
  });
});