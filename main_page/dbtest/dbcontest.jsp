<%@ page language="java" contentType="text/html; charset=UTF-8page import="java.sql.*""
    pageEncoding="UTF-8"%>
<html>

<head>
    <title>VS CODE에서 JSP 동작시키기</title>
</head>

<body>
    <h1> dbcontest.jsp 페이지입니다.</h1>
    <%
    String url = "http://dongguk-taxi.kro.kr:3306"; // 데이터베이스 url
    String user = "dongguk_admin"; // 데이터베이스 사용자명
    String password = "dkehdgod0128!"; // 데이터베이스 비밀번호

    Class.forName("mysql-connector-j-8.2.0"); // MySQL JDBC 드라이버 로드
    Connection conn = DriverManager.getConnection(url, user, password); // 데이터베이스 연결
    %>
</body>

</html>




