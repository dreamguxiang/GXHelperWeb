const { createProxyMiddleware } = require('http-proxy-middleware')
 
module.exports = function (app) {
    app.use(
        createProxyMiddleware('/api', { 
            target: 'https://oridata.api.qingyuga.me',
            changeOrigin: true,
            pathRewrite: { '^/api': '' }
        }),
    )
}