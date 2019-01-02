const express = require('express');
const morgan = require('morgan');
const proxy = require('http-proxy-middleware');
const app = express();
const port = process.env.PORT || 3000;


app.use(morgan('dev'));
app.use('/api/reviews/rooms/:roomid', proxy({target: 'http://localhost:3124'}));
app.use('/api/ratings/rooms/:roomid', proxy({target: 'http://localhost:3124'}));
app.use('/rooms/:roomid', express.static("./public"));

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
