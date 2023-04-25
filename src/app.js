import express from 'express';
import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import SearchController from './controller/SearchController.js';
import LoggingService from './utility/LoggingService.js';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

dotenv.config({ path: `${dirname}/.env` });
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
