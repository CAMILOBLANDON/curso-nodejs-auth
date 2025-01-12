const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { config } = require('../config/config');
const nodemailer = require('nodemailer');

const UserServices = require('./user.service');

const service = new UserServices();
class AuthService {
  async getUser(email, password) {
    const user = await service.findbyEmail(email);
    if (!user) throw boom.unauthorized();
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw boom.unauthorized();
    delete user.dataValues.password;
    delete user.dataValues.recoveryToken;
    return user;
  }
  signToken(user) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    const token = jwt.sign(payload, config.jwtSecret);

    return { user, token };
  }
  async resetRecovery(email) {
    const user = await service.findbyEmail(email);
    if (!user) throw boom.unauthorized();
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15m' });
    const link = `http://myfrontend.com/recovery?token=${token}`;
    await service.update(user.id, { recoveryToken: token });
    const mail = {
      from: config.smtpEmail, // sender address
      to: `${user.email}`, // list of receivers
      subject: 'Email to Recover Password', // Subject line

      html: `<b>Ingreas a este Link => ${link} </b>`, // html body
    };
    const rta = await this.sendMail(mail);
    return rta;
  }
  async chagePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.jwtSecret);
      const user = await service.findOne(payload.sub);
      if (user.recoveryToken !== token) throw boom.unauthorized();

      const isMatch = await bcrypt.compare(newPassword, user.password);
      if (isMatch) throw boom.unauthorized();
      const hash = await bcrypt.hash(newPassword, 10);
      await service.update(user.id, { recoveryToken: null, password: hash });
      return { message: 'password changed' };
    } catch (error) {
      throw boom.unauthorized();
    }
  }
  async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465, //587
      secure: true, // true for 465, false for other ports
      auth: {
        user: config.smtpEmail,
        pass: config.smtpPass,
      },
    });
    await transporter.sendMail(infoMail);
    return { message: 'mail sent' };
  }
}
module.exports = AuthService;
