import React, { useEffect } from 'react';
import generateQR from '../utils/genQR';

const Qrcode = ({url}) => {
  useEffect(() => {
    if (url)
      generateQR(url, document.getElementById('canvas'))
  })
  return (<canvas id="canvas"></canvas>)
}
export default Qrcode;