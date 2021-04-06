const express = require('express');
const app = express();
const cors = require('cors');
const _ = require('lodash');
const db = require('./models')



app.use(express.json());

app.use(cors());


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use(require('./routes/index'));

app.listen(3000, () => console.log(`notes-app listening on port 3000!`), db.sequelize.sync());


