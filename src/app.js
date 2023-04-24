import express from 'express';
import * as dotenv from 'dotenv';
import SearchController from './controller/SearchController.js';

dotenv.config();
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.post('/search', SearchController.search);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
