const express = require('express');
const puppeteer = require('puppeteer');
const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
    const browser = await puppeteer.launch({headless: "new"});
    const page = await browser.newPage();

    // await page.setViewport({ width: 800, height: 800 });

    const qrCodeText = 'Hello world 2!!';
    const qrCodeDataUrl = await QRCode.toDataURL(qrCodeText);

    const htmlContent = `
        <html>
            <body>
                <img src="${qrCodeDataUrl}"  style="width: 400px; height: 400px;" />
            </body>
        </html>
    `;
    await page.setContent(htmlContent);

    const qrCodeImage = await page.screenshot();
    await browser.close();

    fs.writeFileSync('qr.png', qrCodeImage);
    const abso = path.join(__dirname, './qr.png');
    res.sendFile(abso);
});

app.listen(3000, () => console.log('connected'));
