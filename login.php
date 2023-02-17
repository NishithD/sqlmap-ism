<?php

// Get the POST data
$data = json_decode(file_get_contents("php://input"), true);
$username = $data["username"];
$password = $data["password"];

// Connect to the MySQL database
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "login_page";
$conn = mysqli_connect($host, $user, $pass, $dbname);

// Check for errors
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

// Query the database to authenticate the user
$sql = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";
$result = mysqli_query($conn, $sql);

// Check the result and send a response
if (mysqli_num_rows($result) > 0) {
  $response = array("success" => true);
} else {
  $response = array("success" => false);
}

echo json_encode($response);

// Close the connection
mysqli_close($conn);

?>
