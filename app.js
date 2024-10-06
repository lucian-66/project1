const express = require('express');


const app = express();
const PORT = 6666;
app.get('/test', (req, res) => {
    console.log('请求来了',req.body)
    res.send('test success.');
  });
app.post('/test', (req, res) => {
  console.log('请求来了',req.body)
  const newImageName = req.body.repository.name
  exec(`./deploy.sh ${newImageName}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).send('Deployment failed.');
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
    res.send('Deployment triggered.');
  });
});

app.listen(PORT, () => {
  console.log(`Webhook server is running on port ${PORT}`);
});