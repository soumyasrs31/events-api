const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const morgan = require
('morgan');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const eventRoute = require('./routes/events');
const connectDB = require('./config/db');

// configure environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// connect to db
connectDB();

// middlewares
app.use(helmet()); // security middleware
app.use(cors()); // enable CORS for all origins and methods
app.use(express.json()); // parse JSON bodies
app.use(morgan('dev'))

// routes
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/events', eventRoute);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
