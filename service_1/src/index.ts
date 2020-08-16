import Express from 'express';
import redis from 'redis';
import { logger } from 'juno-js';
import { diana } from 'diana-js';
import faker from 'faker';

const app = Express();
const publisher = redis.createClient();

app.get('/api', (req, res) => {
  publisher.publish('name_topic', faker.name.firstName());
  res.json({ transactionId: diana() });
});

app.listen(9000, () => logger.info('server started at 127.0.0.1:9000'));
