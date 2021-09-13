import { Button, InputAdornment, Container, CircularProgress, Typography } from '@material-ui/core';
import { Check, Error } from '@material-ui/icons';
import { styled } from '@material-ui/core/styles';
import React, { useState } from 'react';
import Qrcode from './Qrcode';
import clipboardCopy from '../utils/clipboardCopy' 
import highlightTarget from '../utils/highlight' 
import StyledInput from './StyledInput'
import validateUrl from '../utils/validateUrl';
import { shortenUrl } from '../actions';

const white = '#edf6f9';

const MinifyButton = styled(Button)({
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(105, 105, 105, .3)',
  color: white,
  height: 48,
  padding: '0 30px',
  backgroundColor: 'rgba(0,0,0,0.4)',
})

const CopyMessage = styled(InputAdornment)({
  marginRight: 4,
  '& p': {
    color: white
  }
})

const Converter = ({strings}) => {
  const [url, setUrl] = useState("");
  const [url64, setUrl64] = useState("");
  const [short, setShort] = useState('');
  const [lastShort, setLastShort] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copyMsg, setCopyMsg] = useState(strings.copyDefault);
  const [btnText, setBtnText] = useState(strings.btnGo);

  const shorten = () => {
    if(!url64) return;
    setLoading(true);
    shortenUrl(url64, (newUrl) => {
      setShort(newUrl);
      setBtnText(strings.btnDone);
    }, (err) => {
      console.log(err);
      setBtnText(strings.btnError);
    });
    setLoading(false);
  }

  const update = (val) => {
    if (short && val !== url) {
      setBtnText(strings.btnGo);
      setLastShort(short)
      setShort(false)
    }

    setUrl(val);
    if (!val) {
      setError(false);
      return;
    }

    const validUrl = validateUrl(val.trim());
    if (!!validUrl){
      setUrl64(btoa(validUrl))
      setError(false)
    } else {
      setError(true);
    }
  }

  const copy = () => ( clipboardCopy('#shortcode', (bool) => {
    setCopyMsg(bool ? strings.copySuccess : strings.copyFailed )
  })); 

  return (
    <Container maxWidth="sm">
      <form className='converter' noValidate autoComplete="off">
        <StyledInput 
          fullWidth 
          id="input" 
          label={strings.inputLabel} 
          placeholder={strings.ph} 
          value={url}  
          error={error} 
          onChange={(e) => update(e.target.value)} 
          onClick={() => highlightTarget('input')}
          InputProps={{
            endAdornment: !url ? '' : !error ? 
              <Check color='primary' fontSize="large"/> : 
              <Error fontSize="large" color='secondary'/> ,
          }}
        />
        { btnText !== strings.btnDone && 
          <MinifyButton 
            color="primary" 
            onClick={shorten}
            variant={(!error && !!url) || short ? "contained" : "outlined" } 
            disabled={loading || !url || error}
          >
          { loading ? '' : btnText }
          { loading && <CircularProgress /> }
          </MinifyButton>
        }
        { short && <Qrcode url={short}/> }
        { short && 
          <StyledInput 
            fullWidth 
            id="shortcode" 
            label={strings.outputLabel} 
            value={short} 
            onClick={copy} 
            onBlur={() => setCopyMsg(strings.copyDefault)}
            InputProps={{
              endAdornment: <CopyMessage position="end">{copyMsg}</CopyMessage>,
            }}
          />
        }
      </form>
      { lastShort && 
        <div className='last-url'>
          <Typography variant='caption'>last url: </Typography>
          <Typography variant='overline'>{lastShort}</Typography>
        </div>
      }
    </Container>
  );
}

export default Converter;
