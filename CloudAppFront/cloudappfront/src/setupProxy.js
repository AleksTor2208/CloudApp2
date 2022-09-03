const { createProxyMiddleware } = require('http-proxy-middleware');

const context = [
    "/cloud"//"/weatherForecast",
];

module.exports = function (app) {
    const appProxy = createProxyMiddleware(context, {
        target: 'https://localhost:7027/',
        secure: true
    });

    app.use(appProxy);
};
