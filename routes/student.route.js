const express = require('express');
const studentRoute = express.Router();
const multer = require('multer');

const app = express();
const path = require('path');

const storage = multer.diskStorage({ 
    destination: function(req,file,cb){  //set Destination
        cb(null, 'client/public/images');
    },
    filename: function(req,file,cb){     // set filename
        cb(null, file.originalname);
    }
});

//Prepare a function for img file upload 
const fileFilter = function(req, file, cb){
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

    if(!allowedTypes.includes(file.mimetype)){
        const error = new Error("Wrong file type");
        error.code = "LIMIT_FILE_TYPES";
        return cb(error, false);
    };

    cb(null, true);
};
const MAX_SIZE = 200000;
const upload = multer({
    storage: storage,
   
    fileFilter: fileFilter
});




//Student model
let StudentModel = require(path.join(__dirname,'../models/Student'));

//Get all data
studentRoute.route('/').get((req, res, next)=> {
    StudentModel.find((error, data) => {
        if(error){
            return next(error);
        } else {
            res.json(data);
            
        }
    })
})

//Upload single Img file
studentRoute.route('/upload').post(upload.single('file'),(req,res) => {
    res.json({file: req.file});
});
app.use(function(err, req, res,next){
    if(err.code === "LIMIT_FILE_TYPES"){
        res.status(422).json({error: "Only images are allowed"});
        return;
    }
    if(err.code === "LIMIT_FILE_SIZE"){
        res.status(422).json({error: "Too Large."});
        return;
    }
});


//Create Student data
studentRoute.route('/create-student').post((req,res,next) =>{
    
    StudentModel.create(req.body, (error, data) =>{
        if(error){
            return next(error);
        }else{
            res.json(data);
            
        }
    })
})

//Edit Student data
studentRoute.route('/edit-student/:id').get((req,res,next)=>{
    StudentModel.findById(req.params.id, (error, data)=>{
        if(error){
            return next(error)
        } else{
            res.json(data);
        }
    })
})

//Prepare the function to delete img file
const fs = require('fs').promises;
async function deleteFile(filePath) {
    await fs.unlink(filePath)
    .then(console.log(`Deleted ${filePath}`))
    .catch((error)=>{console.error(`Got an error trying to delete the file: ${error.message}`);});
}

//Update Student data
studentRoute.route('/update-student/:id').put((req,res,next) =>{
    StudentModel.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error,data)=>{
        if (error){
            return next(error);
        }else {
            console.log(data.img);
            deleteFile(`client/public/images/${data.img}`);
            res.json(data);
            console.log('Student successfully updated');
        }
    })
})

//Delete Student data
studentRoute.route('/delete-student/:id').delete((req,res,next)=>{
    StudentModel.findByIdAndDelete(req.params.id,(error,data) => {
        if(error){
            return next(error)
        } else {
            console.log(data);
            console.log(data.img);
            deleteFile(`client/public/images/${data.img}`);
            res.status(200).json({
                msg:data
            });
        }
    })
})

module.exports =studentRoute