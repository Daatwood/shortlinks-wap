import { Button, InputAdornment, Container, CircularProgress, Typography } from '@material-ui/core';
import { Check, Error, Visibility } from '@material-ui/icons';
import { styled } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import Qrcode from './Qrcode';
import clipboardCopy from '../utils/clipboardCopy' 
import highlightTarget from '../utils/highlight' 
import StyledInput from './StyledInput'
import validateUrl, { shortcodeUrl } from '../utils/validateUrl';
import { shortenUrl, viewUrl } from '../actions';
import Stats from './Stats'

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
  const [decoding, setDecoding] = useState(() => {
    const shortcode = window.location.pathname.replace('/','')
    return !shortcode ? false : shortcode 
  });
  const [stats, setStats] = useState(false);
  const [redirecting, setRedirecting] = useState(() => {
    return !!window.location.pathname.replace('/','')
  });

  // Redirect if given a shortcode in url
  useEffect(() => {
    if (redirecting && decoding && !stats)  {
      console.log('shortcode found '+ decoding)
      expand();
    }
  })

  const shorten = () => {
    if(!url64) return;
    setLoading(true);
    shortenUrl(url64, (newUrl) => {
      setLoading(false);
      setShort(newUrl);
      setBtnText(strings.btnDone);
    }, (err) => {
      setLoading(false);
      console.log(err);
      setBtnText(strings.btnError);
    });
  }

  const expand = () => {
    if (!decoding) return;
    setLoading(true);
    viewUrl(decoding, (res) => {
      setLoading(false);
      setStats(res);
      if (redirecting){
        setRedirecting(false)
        if (res) {
          update(res.link)
          if (!window.location.search)
            window.location.href = res.link
        } else 
        update("Unknown shortcode "+ decoding)
      } else 
        setBtnText(strings.btnDone);
    }, (err) => {
      console.log(err);
      setLoading(false);
      setBtnText(strings.btnError);
    });
  }

  const update = (val) => {
    val = val.trim();
    if ((short || stats) && val !== url) {
      setBtnText(strings.btnGo);
      setLastShort(short)
      setShort(false);
      setStats(false);
    }

    setUrl(val);
    if (!val) { // Clear error; value is blank
      setError(false);
      return;
    }

    const scode = shortcodeUrl(val);
    if(scode){ // User entered a shortcode url
      setError(false)
      setDecoding(scode);
      setBtnText(strings.btnView);
      return;
    }

    const validUrl = validateUrl(val);
    if (!!validUrl){ // User entered a valid url
      setUrl64(btoa(validUrl))
      setError(false)
      setBtnText(strings.btnGo);
    } else {
      setError(true);
    }

    if (!!decoding) setDecoding(null);
  }

  const copy = () => ( clipboardCopy('#shortcode', (bool) => {
    setCopyMsg(bool ? strings.copySuccess : strings.copyFailed )
  })); 

  if (!!redirecting ) {
    return (
      <div  className='App-link'>
        <Typography variant='h1'>Redirecting to...</Typography>
        <Typography variant='subtitle1'>{stats ? stats.link : 'Unknown' }</Typography>
      </div>
    )
  }

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
              decoding ? 
                <Visibility color='primary' fontSize="large"/> :
                <Check color='primary' fontSize="large"/> : 
              <Error fontSize="large" color='secondary'/> ,
          }}
        />
        { btnText !== strings.btnDone && 
          <MinifyButton 
            color="primary" 
            onClick={!decoding ?  shorten : expand}
            variant={(!error && !!url) || short ? "contained" : "outlined" } 
            disabled={loading || !url || error}
          >
            { loading ? <CircularProgress /> : btnText }
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
        <Stats data={stats}/>
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
