'use strict';

require('dotenv').config();

const tracer = require ('dd-trace').init({
    service:'matrix-markets-service',
    env: process.env.NODE_ENV || 'development',
    analytics:true,
});

 const express = require('express');
 const helmet = require('helmet');
 const cors = require('cors');
 const rateLimit = require('express-rate-limit');
 const session = require('express-session');
 const passport = require('./config/passport');
 const connectMongoDB = require('./config/database');
 const {getSecrets} = require ('./config/vault');
 const logger = require('./config/logger');
 const errorHandler = require ('./middleware/errorHandler');
 const authRoutes = require ('./routes/auth');
 const orderRoutes = require ('./routes/orders');
 const MongoStore = require('connect-mongo');

async function startServer() {
    try {
        console.log("1. Starting initialization...");
        
        const secrets = process.env.NODE_ENV === 'production'
            ? await getSecrets()
            : {
                MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/matrix_markets',
                SESSION_SECRET: process.env.SESSION_SECRET || 'dev_secret',
            };
        console.log("2. Secrets loaded.");

        await connectMongoDB(secrets.MONGODB_URI);
        console.log("3. MongoDB Connected.");

        const app = express();
        // ... your middleware ...

        const port = process.env.PORT || 8080; // Let's use 8080 since we know it works
        app.listen(port, () => console.log(`4. Server fully LIVE on port:${port}`));

    } catch (err) {
        console.error('SERVER CRASHED AT START:', err.message);
        process.exit(1);
    }
}

startServer();

module.exports = startServer;