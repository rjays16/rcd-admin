const middleware = {}

middleware['auth'] = require('..\\middleware\\auth.js')
middleware['auth'] = middleware['auth'].default || middleware['auth']

middleware['getToken'] = require('..\\middleware\\getToken.js')
middleware['getToken'] = middleware['getToken'].default || middleware['getToken']

middleware['isAuth'] = require('..\\middleware\\isAuth.js')
middleware['isAuth'] = middleware['isAuth'].default || middleware['isAuth']

export default middleware
