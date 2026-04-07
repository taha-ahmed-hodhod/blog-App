module.exports = (err, req, res, next) => { 
  console.log('Error Handler reached!'); 

  if (err.code === 11000) {
  err.message = 'This email is already registered, please try another one!';
  err.statusCode = 400;
}
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack 
  });
};