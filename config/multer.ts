import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination:(req, res, cb) => {
        cb(null, path.join('./files/'));
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + file.originalname);
    }
})

const fileFilter = (_req: any, file: { mimetype: string; }, cb: (arg0: Error, arg1: boolean) => void) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new Error('Not an image! Please upload an image.'), false);
    }
};

const  upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 6
    },
    fileFilter: fileFilter
});

export { upload }