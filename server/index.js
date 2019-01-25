const nr = require('newrelic');
const express = require('express');
const morgan = require('morgan');
const proxy = require('http-proxy-middleware');
const app = express();
const port = process.env.PORT || 3000;


app.use(morgan('dev'));

// Reviews - James
app.use('/api/reviews/rooms/:roomid', proxy({target: 'http://54.183.178.35:3124'}));
app.use('/api/ratings/rooms/:roomid', proxy({target: 'http://54.183.178.35:3124'}));

// Image Gallery - Josh
app.use('/rooms/:id/photos', proxy({target: 'http://localhost:1337'}));

// Booking - Kevin
app.use('/api/rooms/:id', proxy({target: 'http://localhost:8080'}));

// Recommendations - Eric
app.use('/house', proxy({target: 'http://localhost:3123'}));

app.use('/rooms/:roomid', express.static("./public"));

app.get('/loaderio-b94e7f2ffd7aa9aa6820957ffba5aa68', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/dist', 'loaderio-b94e7f2ffd7aa9aa6820957ffba5aa68.txt'))
})

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
