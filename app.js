const express = require('express');
const authRouter = require('./routes/authintacationRoutes');
const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRoutes');
const groupRouter = require('./routes/groupRoutes');
const adminRouter = require('./routes/adminrouts');
const globalErrorHandler = require('./middlewares/errorMiddleware');

const app = express();

app.use(express.json()); 
app.get('/', (req, res) => {
  res.status(200).send('Welcome to Blog System API!');
});
app.use('/auth', authRouter);
app.use('/posts', postRouter);
app.use('/users', userRouter);
app.use('/groups', groupRouter);
app.use('/admin', adminRouter);
app.use(globalErrorHandler);

module.exports = app;
