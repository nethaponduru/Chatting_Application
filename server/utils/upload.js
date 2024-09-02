import multer from "multer";
import dotenv from 'dotenv';

import {GridFsStorage} from 'multer-gridfs-storage'

dotenv.config();

const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD;

const storage =new GridFsStorage({
    url:`mongodb://${USERNAME}:${PASSWORD}@whatsappclone-shard-00-00.z6ixy.mongodb.net:27017,whatsappclone-shard-00-01.z6ixy.mongodb.net:27017,whatsappclone-shard-00-02.z6ixy.mongodb.net:27017/?ssl=true&replicaSet=atlas-iwmhi9-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Whatsappclone`,
    

    //url:`mongodb+srv://${USERNAME}:${PASSWORD}@whatsappclone.z6ixy.mongodb.net/?retryWrites=true&w=majority&appName=Whatsappclone`,

    options:{useUnifiedTopology:true,useNewURLPaser:true},
    //options: { useNewUrlParser: true },
    file: (request, file) => {
        const match = ["image/png", "image/jpg"];

        if(match.indexOf(file.mimeType) === -1) 
            return`${Date.now()}-file-${file.originalname}`;

        return {
            bucketName: "photos",
            filename: `${Date.now()}-file-${file.originalname}`
        }
    }


});

export default multer({storage}); 