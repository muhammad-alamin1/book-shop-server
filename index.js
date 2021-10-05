const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
// const MongoClient = require("mongodb").MongoClient;
const app = express();
const PORT = 7070 || process.env.PORT;
const uri = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASS}@cluster0.r9dh9.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('books'));
app.use(fileUpload());


client.connect(err => {
  const collection = client.db(`${process.env.DATABASE_NAME}`).collection(`${process.env.DATABASE_COLLECTION}`);
  console.log('Database connected');
  // root get
  app.get('/', (req, res) => {
    res.send('Hello from db it is not  working');
  })

  // fake data send to database
  app.post('/addBook', (req, res) => {
    const book = req.body;
    // console.log(book);
    collection.insertMany(book)
      .then(result => {
        console.log(result);
        res.send(insertedCount > 0)
      })
  })

  // admin single data send to database
  app.post('/newAddBook', (req, res) => {
    const file = req.files.file
    const files = req.body.file
    const title = req.body.title
    const author = req.body.author
    const bookCode = req.body.bookCode
    const price = req.body.price
    file.mv(`${__dirname}/books/${file.name}`, err => {
      if (err) {
        console.log(err)
        return res.status(500).send({ msg: 'Failed to upload image' })
      }
      return res.send({ name: file.name, path: `${file.name}` })
    })
    // console.log(title, author, bookCode, price, file)
    const book = req.body;
    // console.log(book);
    collection.insertOne(book)
      .then(result => {
        console.log(result);
        res.send(insertedCount > 0)
      })
  })

  // query all books data
  app.get('/books', (req, res) => {
    collection.find({})
      .toArray((error, document) => {
        res.send(document);
      })
  })

  // Delete method
  app.delete('/delete/:id', (req, res) => {
    // console.log(req.params.id);
    collection.deleteOne({ _id: ObjectId(req.params.id)})
      .then((result) => {
        console.log(result);
      })
  })

  // client.close();
});



app.listen(PORT, () => {
  console.log(`Listening on ${PORT} is Running`);
})