const path = require("path");
const fs = require("fs"); 

async function uploadFile(req , res) {
    try {
        if (req.file) {
            const file = req.file;
            const { destination , filename} = file;
            const filePath = path.join(destination, filename);
            
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    console.error("Error reading uploaded file:", err);
                    return res.status(500).send("Error reading uploaded file.");
                }
    
                fs.writeFile(filePath, data, (err) => {
                    if (err) {
                        console.error("Error storing uploaded file:", err);
                        return res.status(500).send("Error storing uploaded file.");
                    }
    
                    res.send("File type and extension are valid.");
                });
            });
        } else {
            res.status(400).send("No file uploaded.");
        }
    } catch (error) {
        console.error("Error occured while running the uploads Controller",error);
        return res.json(error);
    }
};

module.exports = {
    uploadFile
};