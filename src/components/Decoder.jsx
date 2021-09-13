import React, { useState } from 'react';
import { Paper } from '@material-ui/core';
import axios from 'axios';

const Decoder = ({strings}) => {
  const [shortLink, setShort] = useState('')
  const [fullLink, setLink] = useState('')
  const [error, setError] = useState(false);

  return (
    <Paper>

    </Paper>
  )
}
export default Decoder;