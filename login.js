const mysql = require('mysql2');
async function submitLoginForm(event) {
  event.preventDefault();

  const form = document.getElementById('login-form');
  const formData = new FormData(form);

  const response = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: formData.get('username'),
      password: formData.get('password')
    })
  });

  const { success } = await response.json();

  if (success) {
    window.location.href = 'success.html';
  } else {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = 'Invalid username or password';
  }
}


// function submitLoginForm(event) {
//   event.preventDefault();

//   const username = document.getElementById('username').value;
//   const password = document.getElementById('password').value;

//   const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'nishith',
//     password: '152128',
//     database: 'login_page'
//   });

//   connection.query(
//     'SELECT * FROM users WHERE username = ? AND password = ?',
//     [username, password],
//     (error, results, fields) => {
//       if (error) {
//         console.error(error);
//         return;
//       }

//       if (results.length > 0) {
//         alert('Login successful!');
//       } else {
//         alert('Incorrect username or password.');
//       }
//     }
//   );
// }

document.getElementById('loginForm').addEventListener('submit', submitLoginForm);

