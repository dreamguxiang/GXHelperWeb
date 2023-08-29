const { createProxyMiddleware } = require('http-proxy-middleware')
 
module.exports = function (app) {
    app.use(
        createProxyMiddleware('https://oridata.qingyuga.me/api/v1/getDataList', { 
            target: 'https://oridata.api.qingyuga.me',
            changeOrigin: true,
            pathRewrite: { '^/api/v1/getDataList': '/api/v1/getDataList' }
        }),
    )
}