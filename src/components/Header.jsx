import React from 'react';
import { Typography } from '@material-ui/core';

const Header = ({title, caption}) => {
  return (
    <div className="App-header" >
      <Typography variant="h2" >{title}</Typography>
      <Typography variant="caption" >{caption}</Typography>
    </div>
  )
}
export default (Header);