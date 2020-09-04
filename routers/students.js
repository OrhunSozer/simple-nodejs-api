var express = require('express');
var router = express.Router();

router.get('/', (req, res)=>{
    res.send('GET ile /ogrenciler isteği yapıldı.');
});

router.post('/', (req, res)=>{
    res.send('POST ile /ogrenciler isteği yapıldı.');
});

module.exports = router;