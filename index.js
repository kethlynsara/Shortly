import app from './app/app.js';
import db from './app/db.js';
import dotenv from 'dotenv';
dotenv.config();

app.get('/signup/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await db.query('SELECT * FROM users WHERE id = $1', [id]);
        res.send(user.rows);
    }
    catch (e) {
        res.sendStatus(500);
        console.log(e);
    }
});

app.listen(process.env.PORT, () => {
    console.log('Listening on port: ' + process.env.PORT);
});