const socket = new WebSocket("ws://localhost:8080/DataBase/WebSocket");
socket.addEventListener("open", (event) => {
  socket.send("하이");
});

socket.addEventListener("message", (event) => {
    console.log("Message from server: ", event.data);
});