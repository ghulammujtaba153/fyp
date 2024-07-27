import express, {json} from 'express';
import cors from 'cors';
import { connection } from './database/db.js';
import dotenv from 'dotenv';
import router from './routes/patientRoutes/index.js';



dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(json());

connection();
app.use("/api/", router)

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
