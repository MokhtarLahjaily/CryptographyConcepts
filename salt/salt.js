const { scryptSync, randomBytes, timingSafeEqual } = require('crypto');

const users = [];

function signup(email, password) {
    const salt = randomBytes(16).toString('hex');
    const hashedPassword = scryptSync(password, salt, 64).toString('hex');

    const user = { email, password: `${salt}:${hashedPassword}` };
    users.push(user);

    return user;
}

function login(email, password) {
    const user = users.find(v => v.email === email);

    const [salt, key] = user.password.split(':');
    const hashedBuffer = scryptSync(password, salt, 64);

    const keyBuffer = Buffer.from(key, 'hex');
    const match = timingSafeEqual(hashedBuffer, keyBuffer);

    if (match) {
        return 'login success!';
    } else {
        return 'login fail!';
    }
}

// Example usage
const user = signup('user@example.com', 'password123');
console.log('User signed up:', user);

const loginResult = login('user@example.com', 'password123');
console.log(loginResult);

const wrongLoginResult = login('user@example.com', 'wrongpassword');
console.log(wrongLoginResult);

