const express = require('express');
const QRCode = require('qrcode');

const app = express();


app.get('/', async (req, res) => {
    try{
        const qrCodeSVG = await QRCode.toString('Hello World', {type: 'svg'}); 
        res.setHeader('Content-Type', 'image/svg+xml');
        res.send(qrCodeSVG);

    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})
app.listen(3000, () => console.log('Connected'));