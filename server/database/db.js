import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD;


const Connection = async () => {

    const URL = `mongodb://${USERNAME}:${PASSWORD}@whatsappclone-shard-00-00.z6ixy.mongodb.net:27017,whatsappclone-shard-00-01.z6ixy.mongodb.net:27017,whatsappclone-shard-00-02.z6ixy.mongodb.net:27017/?ssl=true&replicaSet=atlas-iwmhi9-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Whatsappclone`;

    //const URL=`mongodb+srv://${USERNAME}:${PASSWORD}@whatsappclone.z6ixy.mongodb.net/?retryWrites=true&w=majority&appName=Whatsappclone`

    try {
        await mongoose.connect(URL,{useUnifiedTopology:true});
        console.log('Database connected successfully');

    } catch (error) {
        console.log('Error while connecting with the database', error.message);
    }
}

export default Connection;