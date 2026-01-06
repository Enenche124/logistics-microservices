require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db');

connectDB();

const PORT = process.env.PORT || 4001;

app.listen(PORT, ()=>{
    console.log(`Auth service is running on port ${PORT}`);
})