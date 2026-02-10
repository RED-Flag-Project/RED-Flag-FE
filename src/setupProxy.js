const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://cdxfgv2my3.ap-northeast-1.awsapprunner.com",
      changeOrigin: true,
      secure: false,
    }),
  );
};
