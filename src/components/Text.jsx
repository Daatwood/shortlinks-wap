import React from 'react';

import { Typography } from '@material-ui/core';


export default Text = ({s, v, c, options}) => {
  return <Typography variant={v} component={c} {...options}>
    {s}
  </Typography>
}