import React from 'react';
import { Typography } from '@material-ui/core';


const Footer = ({link, creator}) => {
  const year = new Date().getFullYear();
  return (
    <div className='footer'>
      <Typography variant='overline'>
        © {year}
      </Typography>
      <Typography variant='caption'>
        Made with ❤️ 
      </Typography>
      <Typography variant='overline' style={{float: 'right'}}>
        <a href={link} target='_blank' rel='noreferrer' >{creator}</a>
      </Typography>
    </div>
  )
}
export default (Footer);