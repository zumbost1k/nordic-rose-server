const { Email } = require('../models/models');

class EmailController {
  async create(req, res) {
    try {
      const { text } = req.body;
      const candidat = await Email.findOne({ where: { text } });
      if (candidat) {
        return res.status(409).json({ message: 'this email already sented' });
      }
      const email = await Email.create({ text });
      //return in
      return res.json(email);
    } catch (error) {
      return res.status(404).json({ message: 'email create error' });
    }
  }
  async getAll(req, res) {
    try {
      const emails = await Email.findAll();
      return res.json(emails);
    } catch (error) {
      return res.status(404).json({ message: 'get all email error' });
    }
  }
}

module.exports = new EmailController();
