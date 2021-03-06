const cloudinary = require('cloudinary').v2;
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  // cloudinary: cloudinary,
  cloudinary,
  params: {
    folder: 'lemon-squeezy',
  },
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(null, file.originalname); // The file on cloudinary would have the same name as the original file name
  },
});

// storage: storage
const uploadCloud = multer({storage});

module.exports = uploadCloud;

// How to upload
/* cloudinary.v2.uploader.upload("https://www.example.com/mysample.jpg",
  { public_id: "sample_woman" }, 
  function(error, result) {console.log(result); }); */
