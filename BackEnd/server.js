import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';
import productRouter from './routes/productRoutes.js';
import pg from 'pg';

dotenv.config();

const app = express();

const PORT= process.env.PORT;

const db = new pg.Client({
  user:process.env.user,
  host:process.env.host,
  password:process.env.password,
  database:process.env.database,
  port:process.env.db_port
})

db.connect();

async function initDb(){
    try{
        await db.query(
            `CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                image VARCHAR(255) NOT NULL,
                price DECIMAL(10, 2) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`
        )
        console.log("Database initialized successfully");
    } catch(error){
        console.log("Error initializing Database : ", error);
    }
}

initDb().then(()=>{
    app.listen(3000, ()=>{
        console.log('Server is running on port 3000');
    })
})

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use('/api/products', productRouter);

app.get('/',(req,res)=>{
    res.send('Hello World');
})
