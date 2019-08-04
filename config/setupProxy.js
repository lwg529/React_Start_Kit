/**
 * What does this file do?
 * https://facebook.github.io/create-react-app/docs/proxying-api-requests-in-development
 *
 * How to configure it?
 * https://github.com/chimurai/http-proxy-middleware
 *
 * Here for convinience there are two arrays presented.
 * `MOCK_ROUTES` is for mock data server and `TEST_ROUTES` is for test server.
 * Just insert a path into an array to proxy the request.
 * If a path is both in two arrays, it will be proxied to test routes.
 */
const proxy = require('http-proxy-middleware');

// put cookies here since test server needs credential
const cookies = {
  sessionid: 'd984c482750b006183208ab5738974ad',
};
const cookieStr = Object.keys(cookies)
  .map(key => `${key}=${cookies[key]}`)
  .join('; ');

// routes proxied to mock server
const MOCK_SERVER = 'https://yapi.bytedance.net/mock/2089';
const MOCK_ROUTES = [
  '/api/*',
  // '/agent/department/*'
  // '/prm-fe/*',
];

// routes proxied to test server
// const TEST_SERVER = 'http://agent-test1.toutiao.com/';
const TEST_SERVER = 'http://10.95.145.75:9999/'; // liuqiang
// const TEST_SERVER = 'http://10.6.131.79:9999/';
const TEST_ROUTES = [
  // '/agent/agent-manage/*',
  // '/agent/department/*',
  // '/agent/finance/*'
  // '/agent/settlement/*'
];

const proxyRoutes = TEST_ROUTES.reduce((prev, route) => ({
  ...prev,
  [route]: {
    changeOrigin: true,
    target: TEST_SERVER,
    onProxyReq: (proxyReq) => {
      proxyReq.setHeader('cookie', cookieStr);
    },
  },
}), MOCK_ROUTES.reduce((prev, route) => ({
  ...prev,
  [route]: {
    changeOrigin: true,
    target: MOCK_SERVER,
  },
}), {}));

module.exports = function (app) {
  Object.keys(proxyRoutes).forEach((route) => {
    const option = proxyRoutes[route];
    app.use(route, proxy(option));
  });
};
