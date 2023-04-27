import fs from 'fs';
import path from 'path';
// import crypto from 'crypto';
// import jsonwebtoken from 'jsonwebtoken';
import User from '../components/user/model';

const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const pathToKey = path.join('keyPair', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');
/* const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8'); */
// At a minimum, you must pass the `jwtFromRequest` and `secretOrKey` properties
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ['RS256'],
};

// app.js will pass the global passport object here, and this function will configure it
export default (passport) => {
  // The JWT payload is passed into the verify callback
  passport.use(
    new JwtStrategy(options, (jwtPayload, done) => {
      // We will assign the `sub` property on the JWT to the database ID of user
      User.findOne({ _id: jwtPayload.sub }, (err, user) => {
        // This flow look familiar?  It is the same as when we implemented
        // the `passport-local` strategy
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      });
    })
  );
};
