const express = require('express');
const bodyParser = require('body-parser');

const placesRoutes = require('./routes/places-routes');


const app = express();

app.use(placesRoutes); // => /api/places





app.listen(5000);