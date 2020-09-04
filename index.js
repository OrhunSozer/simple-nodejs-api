const express = require('express');
const app = express();
const port = process.env.port || 5000;
const studentsRoute = require('./routers/students');
const bodyParser = require('body-parser');

//Middleware: loglama, hata ayıklama gibi işlemleri 
//istek gerçekleşmeden önce tek bir yerden yapmamızı sağlar.
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use((req, res, next)=>{
    console.log(`${req.path} url'ine ${req.method} istek gönderiliyor...`);
    next();
});
app.use('/students', studentsRoute);


//app değişkeni üzerinden routing oluşturma
//Sadece string dönüyoruz..
app.get('/api/status', (req, res) => {
    res.send('active');
})

//Url 'imizden parametre almak istersek
//? işareti ile gelen parametrenin boş olabileceğini belirttik.
app.get('/api/test/:name?', (req, res)=>{
    res.send({
        message: `Merhaba ${req.params.name || ''}`
    });
});

//Post isteği yapmak istersek
app.post('/api/test', (req, res, next)=>{
    res.send({
        message : `Merhaba ${req.body.name || ''}` 
    });
});


//Eğer gelen url hiçbir router 'ımıza uyugun değilse 'Sayfa bulunmadı!' uyarısı veriyoruz.
app.get('*', (req, res)=>{
res.status(400).send('Sayfa Bulunamadı!');
});

app.listen(port, () =>{
   console.log(`localhost:${port} api is live!`);
})