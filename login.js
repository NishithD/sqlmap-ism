const mysql = require('mysql2/promise');

const connection = await mysql.createConnection({
    host: 'localhost',
    port: '8080',
    user: '<nishith>',
    password: '<152128>',
    database: '<login_page.sql>'
});

function authenticateUser(username, password) {
    return new Promise(async (resolve, reject) => {
        try {
            const [rows, fields] = await connection.execute('SELECT * FROM users WHERE username = ?', [username]);

            if (rows.length > 0) {
                const user = rows[0];

                if (user.password === password) {
                    resolve({ success: true, username: user.username });
                } else {
                    resolve({ success: false, message: 'Incorrect password' });
                }
            } else {
                resolve({ success: false, message: 'Username not found' });
            }
        } catch (err) {
            reject(err);
        }
    });
}
