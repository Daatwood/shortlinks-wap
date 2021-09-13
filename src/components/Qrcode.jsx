import React from 'react';
import generateQR from '../utils/genQR';

const Qrcode = ({url}) => {
  generateQR(url, document.getElementById('canvas'))
  return (
    <div >
      <canvas id="canvas"></canvas>
    </div>
  )
}
export default Qrcode;