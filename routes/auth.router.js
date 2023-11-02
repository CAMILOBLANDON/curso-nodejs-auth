const express = require('express');
const passport = require('passport');
const validatorHandler = require('./../middlewares/validator.handler');
const { chagePasswordSchema } = require('../schemas/auth.schema');
const router = express.Router();
const AuthService = require('../services/auth.service');

const service = new AuthService();
router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = service.signToken(req.user);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);
router.post('/recovery', async (req, res, next) => {
  try {
    const { email } = req.body;
    const rta = await service.resetRecovery(email);
    res.json(rta);
  } catch (error) {
    next(error);
  }
});
router.post(
  '/change-password',
  validatorHandler(chagePasswordSchema, 'body'),
  async (req, res, next) => {
    try {
      const { token, newPassword } = req.body;
      const rta = await service.chagePassword(token, newPassword);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
