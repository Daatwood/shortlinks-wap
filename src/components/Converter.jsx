import { TextField, Button, InputAdornment, Container, CircularProgress } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import axios from 'axios';
import React, { useState } from 'react';

import clipboardCopy from '../utils/clipboardCopy' 
import highlightTarget from '../utils/highlight' 


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
  marginRight: 4,
  '& p': {
    color: white
  }
})

const Converter = ({strings}) => {
  const limit = 2048
  const [url, setUrl] = useState("");
  const [url64, setUrl64] = useState("");
  const [short, setShort] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copyMsg, setCopyMsg] = useState(strings.copyDefault);
  const [btnText, setBtnText] = useState(strings.btnGo);
  const regexBegins = /^((https?):\/\/)/ig;
  const regex = new RegExp(/https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/i)
  const base = 'https://api.daa.best';
  const regexSelf = /api.daa.best/i

  const shorten = async () => {
    if(!url64) return;
    setLoading(true);
    const res = await axios.post(base+'/links/'+url64,{}).catch(() => setLoading(false));
    if (res && res.status === 200)  {
      setShort(base+res.data.shortcode)
      setBtnText(strings.btnDone)
    }
    else {
      console.log(res)
      setBtnText(strings.btnError)
    }
    setLoading(false);
  }

  const update = (val) => {
    if (short && val !== url) {
      setBtnText(strings.btnGo);
      setShort('')
    }
    setUrl(val);
    if (!val) return setError(false)    
    const enc = btoa(val);
    const urlLong = enc.length > limit
    if (!regexSelf.test(val) && regexBegins.test(val) && val.match(regex) && !urlLong) {
      setUrl64(enc)
      setError(false)
    } else {
      setUrl64(urlLong ? strings.errorUrlLong : strings.errorUrlInvalid)
      setError(true)
    } 
  }

  const copy = () => ( clipboardCopy('#shortcode', (bool) => {
    setCopyMsg(bool ? strings.copySuccess : strings.copyFailed )
  })); 

  return (
    <Container maxWidth="sm">
      <form className='converter' noValidate autoComplete="off">
        <StyledInput id="input" label={strings.inputLabel} 
          placeholder={strings.ph} fullWidth value={url}  error={error} 
          onChange={(e) => update(e.target.value)} 
          onClick={() => highlightTarget('input')}
        />
        <MinifyButton variant={(!error && !!url) || short ? "contained" : "outlined" } disabled={loading || !url || error} color="primary" onClick={shorten} >
          { loading ? '' : btnText }
          { loading && <CircularProgress /> }
        </MinifyButton>
        {short && <StyledInput id="shortcode" label={strings.outputLabel} fullWidth 
          value={short} onClick={copy} onBlur={() => setCopyMsg(strings.copyDefault)}
          InputProps={{
            endAdornment: <CopyMessage position="end">{copyMsg}</CopyMessage>,
          }}
        />}
      </form>
    </Container>
  );
}

export default Converter;
