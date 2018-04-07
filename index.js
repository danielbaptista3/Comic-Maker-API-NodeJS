const express = require('express');
const app = express();
const RouterManager = require('./routes');

app.listen(8080, () => {
    console.log('Server started at 8080');
});

RouterManager.use(app);