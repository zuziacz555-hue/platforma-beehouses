const axios = require('axios');

async function testRegister() {
    try {
        const res = await axios.post('http://localhost:5000/api/auth/register', {
            email: `test${Date.now()}@example.com`,
            password: 'password123',
            firstName: 'Test',
            lastName: 'User'
        });
        console.log('Success:', res.data);
    } catch (err) {
        if (err.response) {
            console.error('Error Response:', err.response.status, err.response.data);
        } else {
            console.error('Error:', err.message);
        }
    }
}

testRegister();
