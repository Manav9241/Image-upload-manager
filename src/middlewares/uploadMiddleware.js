const multer = require("multer");
const path = require("path");

// multer.diskStorage is a function that is being invoked to create a storage engine for multer
const storage = multer.diskStorage({
    destination: function (req , file , cb) {
        // req: This parameter refers to the HTTP request object 
        // file: This parameter represents the file object that is being uploaded. It contains information about the uploaded file, such as the file's original name, fieldname, mimetype, size, and more.
        // cb: This parameter stands for "callback" and is a function that you need to call once you have determined the destination directory 
        //     where the uploaded file should be saved. The cb function accepts two arguments: an error object (or null if no error occurred) 
        //     and the destination directory path.
        cb(null , "../uploads/");
    },
    filename: function (req , file , cb) {
        cb(null, Date.now() + '-' + file.originalname); // Set the filename
        // cb(null , file.originalname);
        // cb: The cb parameter stands for "callback" and is a function that you need to call once you have determined 
        //     the desired filename for the uploaded file. The cb function accepts two arguments: an error object 
        //     (or null if no error occurred) and the filename to be used.
    }
});


// fileFilter function: This function is used to filter the uploaded files based on their file type.
const fileFilter = function(req , file , cb) {

    const allowedMimeTypes = ["image/jpeg" , "image/jpg" , "image/png"];    //  array for the allowed types
    const allowedExtensions = [".jpeg" , ".jpg" , ".png"];     //  array for the allowed Extensions

    const fileExtension = path.extname(file.originalname).toLowerCase();
    //  path.extname(): This method is used to extract the extension from a file path or filename. It takes a string argument 
    //        representing the file path or filename and returns the file extension (including the dot) as a string.

    // checking if the file type and extensions are valid (file.mimetype property, which represents the MIME type of the uploaded file)
    if(allowedMimeTypes.includes(file.mimetype)  &&  allowedExtensions.includes(fileExtension)){
        cb(null , true);    // the callback function cb is called with null as the first argument (indicating no error) , true means that the file is accepted and can proceed with the upload process.
    }
    else{
        cb(new Error("Invalid file type. Only JPEG, JPG and PNG files are allowed"));    //  the callback function cb is called with an error object as the first argument. In this case, an Error object is created.
    }
};

const upload = multer({
    storage: storage,
    limits: {
        filesize: 5* 1024 * 1024 // file size limit set to 5MB
    },
    fileFilter: fileFilter
});

module.exports = {
    uploadMiddleware: upload.single("file")
};