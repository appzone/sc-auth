module.exports = (app) => {
    const auth = require('../controllers/auth.controller.js');

    // Login
    app.post('/sc-auth/login', auth.login);

    // Refresh token
    app.post('/sc-auth/refresh', auth.refreshToken);


}