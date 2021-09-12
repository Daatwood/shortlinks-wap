import { TextField, Button, InputAdornment } from '@material-ui/core';
import PlayForWorkIcon from '@material-ui/icons/PlayForWork';
import axios from 'axios';
import React, { useState } from 'react';


function Converter() {
  const limit = 2048
  const [url, setUrl] = useState("");
  const [url64, setUrl64] = useState("");
  const [short, setShort] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copyMsg, setCopyMsg] = useState('Click to copy');
  const regex = new RegExp(/https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/gi)
  const base = 'https://api.daa.best';

  const shorten = async () => {
    if(!url64) return;
    setLoading(true);
    const res = await axios.post(base+'/links/'+url64,{}).catch(() => setLoading(false));
    if (res && res.status === 200) 
      setShort(base+res.data.shortcode)
    else 
      console.log(res)
    setLoading(false);
  }

  const update = (val) => {
    setUrl(val);
    if (!val) return setError(false)    
    const enc = btoa(val);
    const urlLong = enc.length > limit
    if (val.match(regex) && !urlLong) {
      setUrl64(enc)
      setError(false)
    } else {
      setUrl64(urlLong ? "Url is too long!" : "Not a valid url!")
      setError(true)
    } 
  }

  const copyToClipboard = () => {
    const copyTextarea = document.querySelector('#shortcode');
    let copySuccess;
    copyTextarea.focus();
    copyTextarea.select();
    try {
      var successful = document.execCommand('copy');
      copySuccess = successful ? 'successfully' : 'unsuccessfully';   
    } catch (err) {
      console.log(err);
    }
    setCopyMsg(`Copy ${copySuccess}!`)
  }

  return (
    <form className='converter' noValidate autoComplete="off" style={{width: '90%', color: '#e1f5fe'}}>
      <TextField style={{ color: '#e1f5fe'}} id="input" label="https://..." placeholder='https://daa.best' variant='outlined' fullWidth value={url} onChange={(e) => update(e.target.value)} error={error}/>
      <Button variant={!error && !!url ? "contained" : "outlined" } disabled={loading || !url64 || error} color="primary" onClick={shorten} style={{marginTop: '20px'}}>
        Shrink!
      </Button>
      {/* <TextField id="encoded" label="Base64" fullWidth value={url64}/> */}
      {short && <TextField id="shortcode" label="Short url" fullWidth 
        value={short} onClick={copyToClipboard} 
        InputProps={{
          endAdornment: <InputAdornment position="end">{copyMsg}</InputAdornment>,
        }}
      />}
    </form>
  );
}

export default Converter;
