const QRCode = require('qrcode')

const opts = { 
  errorCorrectionLevel: 'H', 
  color: {
    dark:"#012b3c",
    light:"#f5f3f4"
  }
}

const generateQR = (url, elm) => {
  if (!elm) return;
  QRCode.toCanvas(elm, url, opts, (error) => {
   if (error) console.error(error);
 });
}

export default generateQR;