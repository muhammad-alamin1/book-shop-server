require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

// import routes & middleware
const { applicationMiddleware } = require('./middleware/appMiddleware');
const allRoutes = require('./routes/routes');

// app
const app = express();

// use middleware
app.use(applicationMiddleware);
allRoutes(app);

// DB uri
const uri = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASS}@cluster0.jdxha.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;

// database connect with mongoose
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
  console.log("Connected successfully");
  // port
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`listening on port http://localhost:${PORT}`);
  });
});