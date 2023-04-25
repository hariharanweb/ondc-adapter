import express from 'express';
import * as dotenv from 'dotenv';
import SearchController from './controller/SearchController.js';
import LoggingService from './utility/LoggingService.js';

dotenv.config();
const app = express();
const port = 3000;
const logger = LoggingService.getLogger('App');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Adapter');
});
app.post('/search', SearchController.search);
app.listen(port, () => {
  logger.info(`Example app listening on port ${port}`);
});
