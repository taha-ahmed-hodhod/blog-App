const ImageKit = require('imagekit');
const multer = require('multer');

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

exports.uploadMiddleware = upload.array('images', 5); 

exports.uploadToImageKit = async (req, res, next) => {
  if (!req.files || req.files.length === 0) return next();

  try {
    const uploadPromises = req.files.map((file) => {
      return imagekit.upload({
        file: file.buffer.toString('base64'),
        fileName: `post-${req.user.id}-${Date.now()}-${file.originalname}`,
        folder: '/posts',
      });
    });

    const responses = await Promise.all(uploadPromises);

    req.body.images = responses.map((res) => res.url);
    req.body.imageIds = responses.map((res) => res.fileId);

    next();
  } catch (err) {
    next(err);
  }
};


module.exports = {
  imagekit, 
  uploadMiddleware: upload.array('images', 5),
  uploadToImageKit: async (req, res, next) => {  }
};