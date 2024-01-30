const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
    res.send("Use /modules/:category/:topic/:flavor to get module content");
});

// Get module content (flavorless)
app.get('/modules/:category/:topic', (req, res) => {
    const { category, topic } = req.params;
    const path = `./modules/${category}/${topic}/README.md`;
    res.sendFile(path, { root: __dirname });
});

// Get module content in flavor
app.get('/modules/:category/:topic/:flavor', (req, res) => {
    const { category, topic, flavor } = req.params;
    const path = `./modules/${category}/${topic}/${flavor}/README.md`;
    res.sendFile(path, { root: __dirname });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
