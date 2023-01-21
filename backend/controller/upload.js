const multer  = require('multer')
const { GridFsStorage } = require('multer-gridfs-storage');

 
const storage = new GridFsStorage({
    url: "mongodb+srv://abdulbasit:abdulbasit@chatapp.stkxcyo.mongodb.net/chat",
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },

    file: (req, file) => {
        const match = ['image/jpg', 'image/jpeg']

        if (match.indexOf(file.type) === -1) {
            return `${Date.now()}-file-${file.originalname}`
        }
        return {
            bucketName: 'photos',
            fileName: `${Date.now()}-file-${file.originalname}`
        };  

    }
});

module.exports = multer({ storage });