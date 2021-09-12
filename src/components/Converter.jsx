import { TextField, Button, InputAdornment, Container } from '@material-ui/core';
import { makeStyles, styled } from '@material-ui/core/styles';
import axios from 'axios';
import React, { useState } from 'react';

const white = '#edf6f9';

const MinifyButton = styled(Button)({
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(105, 105, 105, .3)',
  color: white,
  height: 48,
  padding: '0 30px',
  backgroundColor: 'linear-gradient(45deg, #83c5be 30%, #006d77 90%)',
})

const StyledInput = styled(TextField)({
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(105, 105, 105, .3)',
  margin: '30px 6px 30px 0',
  '& label': {
    color: white,
    paddingLeft: 8,
  },
  '& div': {
    paddingLeft: 4,
    '& input': {
      color: white,
    },
  },
})

const CopyMessage = styled(InputAdornment)({
  '& p': {
    color: white
  }
})


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
    <Container maxWidth="sm">
      <form className='converter' noValidate autoComplete="off">
        <StyledInput id="input" label="https://..." placeholder='minify your link' fullWidth value={url} onChange={(e) => update(e.target.value)} error={error}/>
        <MinifyButton variant={!error && !!url ? "contained" : "outlined" } disabled={loading || !url || error} color="primary" onClick={shorten} >
          { short ? 'Done!' : 'Shrink!' }
        </MinifyButton>
        {/* <TextField id="encoded" label="Base64" fullWidth value={url64}/> */}
        {short && <StyledInput id="shortcode" label="Short url" fullWidth 
          value={short} onClick={copyToClipboard} onBlur={() => setCopyMsg('')}
          InputProps={{
            endAdornment: <CopyMessage position="end">{copyMsg}</CopyMessage>,
          }}
        />}
      </form>
    </Container>
  );
}

export default Converter;
