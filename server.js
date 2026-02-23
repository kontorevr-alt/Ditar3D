const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname)));

app.get("/api/projects", async (req, res) => {
    try {
        const dir = path.join(__dirname, "projects");
        const files = await fs.promises.readdir(dir);

        const jsonFiles = files
        .filter(f => f.endsWith(".json"))
        .sort();
    
        res.json(jsonFiles);
    } catch (err) {
        res.status(500).json({ error: "Ошибка чтения папки projects" });
    }
});

app.get("/api/projects/:file", async (req, res) => {
try {
    const file = req.params.file;

    if (!/^[\w\-]+\.json$/i.test(file)) {
    return res.status(400).json({ error: "Некорректное имя файла" });
    }

    const fullPath = path.join(__dirname, "projects", file);
    const text = await fs.promises.readFile(fullPath, "utf8");

    res.json(JSON.parse(text));
} catch (err) {
    res.status(404).json({ error: "Файл не найден или JSON битый" });
}
});

app.listen(PORT, () => console.log(`Server running: http://localhost:${PORT}`));
