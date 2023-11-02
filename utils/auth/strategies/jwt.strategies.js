const { Strategy, ExtractJwt } = require('passport-jwt');

const { config } = require('../../../config/config');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret,
};

const JwtStategy = new Strategy(options, (payload, done) => {
  try {
    if (payload.sub) {
      return done(null, payload);
    }
    done(null, false);
  } catch (error) {
    done(error, false);
  }
});

module.exports = JwtStategy;
