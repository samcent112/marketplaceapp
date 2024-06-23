const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const HTTP_PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Configuration
const db = 'mongodb+srv://Samuel:Chemistrygo112@cluster0.woemcb8.mongodb.net/Marketplace?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Import Routes
const productRoutes = require('./routes/productRoutes');

// Use Routes
app.use('/api', productRoutes);

// Welcome route
app.get('/', (req, res) => {
  res.send('Welcome to dress store application');
});

// Start the server
app.listen(HTTP_PORT, () => {
  console.log(`Server running on port ${HTTP_PORT}`);
});



// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const app = express();
// const HTTP_PORT = process.env.PORT || 8080;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // MongoDB Configuration
// const db = 'mongodb+srv://Samuel:Chemistrygo112@cluster0.woemcb8.mongodb.net/Marketplace?retryWrites=true&w=majority';

// // Connect to MongoDB
// mongoose.connect(db, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log('MongoDB connected...'))
// .catch(err => console.log(err));

// // Import Routes
// const productRoutes = require('./routes/productRoutes');

// // Use Routes
// app.use('/api/products', productRoutes);

// // Welcome route
// app.get('/', (req, res) => {
//   res.send('Welcome to dress store application');
// });

// // Start the server
// app.listen(HTTP_PORT, () => {
//   console.log(`Server running on port ${HTTP_PORT}`);
// });
