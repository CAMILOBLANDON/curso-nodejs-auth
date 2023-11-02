const passport = require('passport');

const localStrategy = require('./strategies/local.strategies');
const JwtStategy = require('./strategies/jwt.strategies');
passport.use(localStrategy);
passport.use(JwtStategy);
