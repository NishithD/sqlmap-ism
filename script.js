function sendLoginRequest(username, password) {
	var xhr = new XMLHttpRequest();
	var url = "login.php";
	var params = "username=" + username + "&password=" + password;
	xhr.open("POST", url, true);

	// Set content type header for POST request
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.responseText);
			if (response.success) {
				// Store the username in localStorage
				localStorage.setItem("username", response.username);

				// Redirect the user to success.html
				window.location.href = "success.html";
			} else {
				alert(response.message);
			}
		}
	};

	xhr.send(params);
}

var loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", function(event) {
	event.preventDefault();
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	sendLoginRequest(username, password);
});
