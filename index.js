import app from './src/app/app.js';
import dotenv from 'dotenv';
dotenv.config();

app.listen(process.env.PORT, () => {
    console.log('Server is up and running on port: ' + process.env.PORT);
});