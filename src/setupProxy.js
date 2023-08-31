const { createProxyMiddleware } = require('http-proxy-middleware')
 
module.exports = function (app) {
    app.use(
        createProxyMiddleware('/api/v1/getDataList', { 
            target: 'https://oridata.api.litebds.com',
            changeOrigin: true,
            //pathRewrite: { '^/api/v1/getDataList': '' }
        }),
    )
}