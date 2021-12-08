import React, { useEffect } from 'react';
import { Typography } from '@material-ui/core';
import redirect from '../utils/redirectShortcode'

const Header = ({title, caption}) => {

  useEffect(() => {
    redirect();
  })

  return (
    <div className="App-header" >
      <Typography variant="h2" >{title}</Typography>
      <Typography variant="caption" >{caption}</Typography>
    </div>
  )
}
export default (Header);