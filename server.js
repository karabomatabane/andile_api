const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const apiRoute = require("./routes/api");
const path = require('path'); // Import path module
const app = express();
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

app.use(cors({
    origin: '*'
}));

dotenv.config();

mongoose.connect(
    process.env.MONGO_URL
).then(() => console.log("DBConnection Successful!"))
    .catch((err) => {
        console.log(err);
    });

app.use("/", apiRoute);

// // Serve static files from the "dist" directory
// app.use(express.static(path.join(__dirname, 'wwwroot')));
//
// // Catch-all route to serve the main Angular app file
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'wwwroot', 'index.html'));
// });

const port = process.env.PORT || 5000; // Use the specified port in environment variable or default to 3210

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});