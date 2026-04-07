module.exports = fn => {
  return (req, res, next) => { 
    console.log('Inside catchAsync: next is', typeof next); 
    fn(req, res, next).catch(next); 
  };
};