<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>동행: 같이타요</title>
    <link rel="stylesheet" href="./matching_roomStyle.css">
    <link rel="stylesheet" href="../lower_bar/lower_barStyle.css">
</head>
<body>
    <div class="matching_room_check_wrap">
        <div class="matching_check">
            <img class = "rotating-image" src="../assets/main/room_list/matching.png" width="40em" height="40em">
            <p>&nbsp;&nbsp;매칭 중...</p>
        </div>
        <div class="matching_room_myroom">
            <p>내 방 가기</p>
        </div>
    </div>
   <div class="wrap" >
        <div class="matching_previous_room">
            <img src="../assets/main/room_list/reverse_arrow.png" width="50%" height="35vh">
        </div>
        <div class="matching_current_room">
            <div class="matching_room_div">
                <h1>#1</h1>
            </div>
            <div class="matching_room_div">
                <p>11월10일</p>
            </div>
            <div class="matching_room_div">
                <p>동국대학교</p>
            </div>
            <div class="matching_room_div">
                <img src="../assets/main/room_list/down_arrow.png" width="40em" height="40em">
            </div>
            <div class="matching_room_div">
                <p>신경주역</p>
            </div>
            <div class="matching_room_gender">
                <img src="../assets/main/room_list/gender_no_matter_what.png" width="60em" height="60em">
            </div>
            <div class="matching_room_div">
                <img src="../assets/main/room_list/person_joined.png" width="40em" height="40em">
                <img src="../assets/main/room_list/person_blank.png" width="40em" height="40em">
                <img src="../assets/main/room_list/person_blank.png" width="40em" height="40em">
                <img src="../assets/main/room_list/person_blank.png" width="40em" height="40em">
            </div>
            <div class="matching_room_button">
                <button>신청</button>
            </div>
        </div>
        <div class="matching_next_room">
            <img src="../assets/main/room_list/arrow.png" width="50%" height="35vh">
        </div>
   </div>
   <div class="lower_bar_wrap">
        <div class="lower_bar">
        <div class="home" onclick="">
            <img src="../assets/main/home.png" width="50%" height="35vh">
        </div>
        <div class="matching" onclick="">
            <img src="../assets/main/search.png" width="50%" height="35vh">
        </div>
        <div class="matching_room" onclick="">
            <img src="../assets/main/list.png" width="50%" height="35vh">
        </div>
        <div class="chatting" onclick="">
            <img src="../assets/main/chats.png" width="50%" height="35vh">     
        </div>
        <div class="setting" onclick="">
            <img src="../assets/main/settings.png" width="50%" height="35vh">
        </div>
    </div>
   </div>
   
</div>
</body>
</html>