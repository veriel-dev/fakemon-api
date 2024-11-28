import mongoose from "mongoose";
import dotenv from "dotenv"
import chalk from 'chalk'
dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/fakemon"

export const conenctDB = async () =>{
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('='.repeat(50));
        console.log(chalk.cyan('➜') + chalk.green(' MongoDB conectado exitosamente'));
        console.log(chalk.yellow('🚀 ') + chalk.green('Url MongoDB: ')  + chalk.green(MONGODB_URI));
        console.log('='.repeat(50));
        console.log('');
    } catch (error) {
        console.error('Error conectando a MongoDB:', error);
        process.exit(1);
    }
}
