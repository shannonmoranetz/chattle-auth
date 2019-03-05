import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import Chatkit from '@pusher/chatkit-server';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const chatkit = new Chatkit({
  instanceLocator: "v1:us1:246b3612-b77d-450d-824f-85cf24e32654",
  key: "951c2259-2aea-459a-ac49-fa4e39a18a34:/Guh5OXpxpfG2czfeaNGwOd8oHh7sgMfLGlXZ7Mv1/E="
});

app.post('/users', async (req, res) => {
  const { username, avatar } = req.body;
  try {
    await chatkit.createUser({
      id: username,
      name: username,
      avatarURL: avatar || 'https://i.imgur.com/QTYK0v0.jpg'
    });
    console.log('User created successfully');
    res.sendStatus(201);
  } catch (error) {
    if (error.error === 'services/chatkit/user_already_exists') {
      console.log(`The username ${username} already exists.`);
      res.sendStatus(200);
    } else {
      console.log(error);
    }
  }
});

app.post('/auth', (req, res) => {
  const authData = chatkit.authenticate({
    userId: req.query.user_id
  });
  res.status(authData.status).send(authData.body);
});

export default app;