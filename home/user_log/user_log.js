const blockCount = 10; //블록 개수 설정
const blockContainer = document.getElementById("log_container");
blockContainer.innerHTML = ""; // 안에꺼 비우고

//설정한 갯수만큼 블록 생성
for (let i = 1; i <= blockCount; i++) {
  const block = document.createElement("div");
  block.classList.add("log");
  block.innerHTML = `<p>이용내역 ${i}</p>`;
  blockContainer.appendChild(block);
}

function back() {
  window.location.href = "../home.html"; // 화살표 누르면 홈화면으로
}
