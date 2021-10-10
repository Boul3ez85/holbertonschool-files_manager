import dbClient from '../utils/db';
import sha1 from 'sha1';


export default class UsersController {
  static async postNew(req, res) {
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    try {
      if (!userEmail) {
        return res.status(400).send({ error: 'Missing email' });
      }
      if (!userPassword) {
        return res.status(400).send({ error: 'Missing password' });
      }

      let checkExistingUserByEmail = await dbClient.db.collection('users').findOne({ email: userEmail });
      if (checkExistingUserByEmail) {
        return res.status(400).send({ error: 'Already exist' });
      }

      let userId;
      const hashedPw = sha1(userPassword);
      const newUser = { email: userEmail, password: hashedPw };

      try {
        await dbClient.db.collection('users').insertOne(newUser, (err) => {
          userId = newUser._id;
          return res.status(201).send({ email: userEmail, id: userId });
        });
      } catch (err) {
        return res.status(err.status).send({ 'error': err });
      }
    } catch (error) {
      return res.status(500).send({ error: 'Server error' });
    }
  }
}
