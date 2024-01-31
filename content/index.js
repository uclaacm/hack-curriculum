const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 8080;

app.use(cors());

// allow access to modules, workshops, and labs
app.use(express.static("public"));

app.get('/', (_, res) => {
    res.send("Hack Curriculum Server: use /workshops for a list of workshops or access content files directly using their path");
});

// return list of workshops
// TODO: figure out why CORS freaks out when i name this /workshops
app.get('/workshop-list', (_, res) => {
    const workshopsPath = path.join(__dirname, 'public', 'workshops');
    fs.readdir(workshopsPath, (err, files) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            const folders = files.filter(file => fs.statSync(path.join(workshopsPath, file)).isDirectory());
            res.json(folders);
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
