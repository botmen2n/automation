const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = 3000;

app.get('/spinland', (req, res) => {
  exec('node main.js', (error, stdout, stderr) => {
    if (error) {
      return res.status(500).send(`Ошибка: ${error.message}`);
    }
    if (stderr) {
      return res.status(500).send(`stderr: ${stderr}`);
    }
    res.send(`✅ Выполнено:\n${stdout}`);
  });
});

app.listen(port, () => {
  console.log(`Spinland сервер работает на http://localhost:${port}`);
});
