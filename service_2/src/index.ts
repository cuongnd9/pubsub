import * as Express from 'express';
import * as redis from 'redis';
import { logger } from 'juno-js';
import axios from 'axios';

const app = Express();
const subscriber = redis.createClient();

app.get('/name', async (req, res) => {
  const { data } = await axios.get('http://127.0.0.1:9000/api');
  logger.info('transactionId', data.transactionId)
  subscriber.subscribe('name_topic');
  subscriber.on('message', (channel, message) => {
    if (channel === 'name_topic') {
      subscriber.unsubscribe();
      res.json({ message });
    }
  });
});


app.listen(9100, () => logger.info('server started at 127.0.0.1:9100'));

