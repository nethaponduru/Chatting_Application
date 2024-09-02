//import grid from 'gridfs-stream';
//import mongoose from 'mongoose';

// const url = 'http://localhost:8000';


// let gfs, gridfsBucket;
// const conn = mongoose.connection;
// conn.once('open', () => {
//     gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
//         bucketName: 'fs'
//     });
//     gfs = grid(conn.db, mongoose.mongo);
//     gfs.collection('fs');
// });


// export const uploadImage = (request, response) => {
//     if(!request.file) 
//         return response.status(404).json("File not found");
    
//     const imageUrl = `${url}/file/${request.file.filename}`;

//     response.status(200).json(imageUrl);    
// }

// export const getImage = async (request, response) => {
//     try {   
//         const file = await gfs.files.findOne({ filename: request.params.filename });
//         // const readStream = gfs.createReadStream(file.filename);
//         // readStream.pipe(response);
//         const readStream = gridfsBucket.openDownloadStream(file._id);
//         readStream.pipe(response);
//     } catch (error) {
//         response.status(500).json({ msg: error.message });
//     }
// }

import grid from 'gridfs-stream';
import mongoose from 'mongoose';
const url="http://localhost:8000";

let gfs, gridFsBucket;
const conn = mongoose.connection;
conn.once('open', () => {
    gridFsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'fs'
    });
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('fs');
});


export const uploadFile = async(request,response) =>{
    try {
        if (!request.file) {
          return response.status(404).json("File not found");
        }
    
        const imageUrl = `${url}/file/${request.file.filename}`;
        return response.status(200).json(imageUrl);
    
    } catch (error) {
        console.error(error); // Log the error for debugging
        return response.status(500).json({ message: "Error uploading file" });
    }   
}

export const getImage = async (request, response) => {
    try {   
        const file = await gfs.files.findOne({ filename: request.params.filename });
        //const readStream = gfs.createReadStream(file.filename);
        //readStream.pipe(response);
        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(response);
    } catch (error) {
        return response.status(500).json(error.message );
    }
}
