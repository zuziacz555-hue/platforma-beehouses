const http = require('http');

// Helper for requests
function request(options, data) {
    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                try {
                    resolve({ statusCode: res.statusCode, body: JSON.parse(body) });
                } catch (e) {
                    resolve({ statusCode: res.statusCode, body });
                }
            });
        });

        req.on('error', reject);

        if (data) {
            req.write(JSON.stringify(data));
        }
        req.end();
    });
}

async function run() {
    try {
        console.log('1. Logging in as Admin...');
        const loginRes = await request({
            hostname: 'localhost',
            port: 5000,
            path: '/api/auth/login',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }, {
            email: 'admin@beehouses.org',
            password: 'adminpassword123'
        });

        if (loginRes.statusCode !== 200) {
            console.error('Login failed:', loginRes.statusCode, loginRes.body);
            return;
        }

        const token = loginRes.body.token;
        console.log('Login successful. Token obtained.');

        console.log('2. Creating new user...');
        const createRes = await request({
            hostname: 'localhost',
            port: 5000,
            path: '/api/users',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }, {
            firstName: 'Script',
            lastName: 'Test',
            email: 'scripttest@example.com',
            password: 'password123',
            role: 'user'
        });

        console.log('Create User Response:', createRes.statusCode, createRes.body);

        if (createRes.statusCode === 201) {
            console.log('SUCCESS: User created via script.');
        } else {
            console.error('FAILURE: Could not create user via script.');
        }

    } catch (err) {
        console.error('Script error:', err);
    }
}

run();
