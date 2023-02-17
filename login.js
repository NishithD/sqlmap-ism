const mysql = require('mysql2');

function submitLoginForm(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'nishith',
    password: '152128',
    database: 'login_page'
  });

  connection.query(
    'SELECT * FROM users WHERE username = ? AND password = ?',
    [username, password],
    (error, results, fields) => {
      if (error) {
        console.error(error);
        return;
      }

      if (results.length > 0) {
        alert('Login successful!');
      } else {
        alert('Incorrect username or password.');
      }
    }
  );
}

document.getElementById('loginForm').addEventListener('submit', submitLoginForm);
