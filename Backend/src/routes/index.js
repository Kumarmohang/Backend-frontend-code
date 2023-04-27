import { Router } from 'express';
import passport from 'passport';
import userRoute from '../components/user/route';
import { errorHandler } from '../middlewares/errorHandler';
import clubRoute from '../components/club/route';
import collectorRoute from '../components/collector/route';
import driverRoute from '../components/driver/route';
import dealerRoute from '../components/dealer/route';
import circuitRoute from '../components/circuit/route';
import vinRoute from '../components/vin/route';
import homeRoute from '../components/home/route';
import Compare from '../components/compare/route';
import CarRoute from '../components/car/route';
import ValuationRoute from '../components/valuation/route';
import suggestionRoute from '../components/suggestions/route';
import AdvancerSeachController from '../components/advanceSearch/route';

import { ApiError } from '../util/error';

const router = Router();

/**
 * Add authentication middleware
 * @param {string} route - The route to be used.
 * @param {Router} subRoute  - Route Controller.
 * @returns {Void} - Nothing.
 */
const addAuthRoute = (route, subRoute) => {
  router.use(
    route,
    [
      (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, user) => {
          if (err) {
            return next(err);
          }

          // authentication error
          if (!user) {
            next(new ApiError('Invalid Authorization token', 401));
          }
          // success
          req.logIn(user, (loginErr) => {
            if (loginErr) {
              return next(loginErr);
            }
            return next();
          });
        })(req, res, next);
      },
      errorHandler,
    ],
    subRoute
  );
};

router.use('/users', userRoute);
addAuthRoute('/clubs', clubRoute);
addAuthRoute('/compare', Compare);
addAuthRoute('/influencers', collectorRoute);
addAuthRoute('/drivers', driverRoute);
addAuthRoute('/dealers', dealerRoute);
addAuthRoute('/circuits', circuitRoute);
addAuthRoute('/vin', vinRoute);
addAuthRoute('/cars', CarRoute);
addAuthRoute('/advanceSearchResults', AdvancerSeachController);
addAuthRoute('', homeRoute);
addAuthRoute('/get-valuation', ValuationRoute);
addAuthRoute('/suggestions', suggestionRoute);

router.use(errorHandler);
export default router;
