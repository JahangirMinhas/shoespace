const db = require('./config/db')
const express = require('express');
const app = express();
const cors = require('cors');

const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const productRoutes = require('./routes/api/products');
const signupRoutes = require('./routes/api/signup');
const authRoutes = require('./routes/api/auth');

app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
};
app.use(cors(corsOptions));

const sessionStore = new MySQLStore({
  pool: db,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'shoespace',
  table: 'sessions',
  clearExpired: true,
  expiration: 60000
});

app.use(session({
  secret: '798114502ShoeSpace1!',
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: { maxAge: 30000 }
}));

// API routes
app.use('/api/products', productRoutes);
app.use('/api/signup', signupRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});