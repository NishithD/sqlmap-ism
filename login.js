const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'nishith',
    password: '152128',
    database: 'login_page'
});

function authenticateUser(username, password) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM users WHERE username = ?';
        connection.query(sql, [username], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                if (results.length > 0) {
                    const user = results[0];
                    if (user.password === password) {
                        resolve({ success: true, username: user.username });
                    } else {
                        resolve({ success: false, message: "Incorrect password" });
                    }
                } else {
                    resolve({ success: false, message: "Username not found" });
                }
            }
        });
    });
}

const form = document.getElementById('login-form');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = form.elements['username'].value;
    const password = form.elements['password'].value;

    try {
        const result = await authenticateUser(username, password);
        if (result.success) {
            window.location.href = 'success.html';
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error(error);
        alert('An error occurred while trying to authenticate your login.');
    }
});
