const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');

//socket.ioimplementation
const socketIo = require('socket.io')

const app = express();
const server = http.createServer(app);
const PORT = 3005;

//socket.io calling
const io = socketIo(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"],
  },
});
global.io = io; // Making io globally accessible

app.use(express.json()); 
app.use(cors());


mongoose.connect('mongodb://localhost:27017/taskmaster', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


const signupRoutes = require('./routes/signupRoutes');
const loginRoutes = require('./routes/loginRoutes');
const profileRoutes = require('./routes/profileRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes')

const authenticateToken = require('./middlewares/authenticateToken'); // Assuming you have this from previous instructions


app.use('/', signupRoutes);
app.use('/', loginRoutes);

app.use('/profile', authenticateToken, profileRoutes); 
app.use('/projectapi', authenticateToken, projectRoutes);
app.use('/taskapi', authenticateToken, taskRoutes);
app.use('/analyticsapi', authenticateToken,analyticsRoutes)

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


// Socket.IO connection
io.on('connection', (socket) => {
  console.log('A user connected', socket.id);

  // Disconnect event
  socket.on('disconnect', () => {
    console.log('User disconnected', socket.id);
  });
});


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
