import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import Feature from './Feature'


const FeatureList = ({strings}) => {
  const [view, toggleView] = useState(false);

  if (!view)
    return (
      <Button size="small" color="primary" onClick={(e) => toggleView(!view)}>
        Learn More
      </Button>
    )
    return (
      <div className='featureTitle'>
        <Button size="small" color="primary" onClick={(e) => toggleView(!view)}>
          Close
        </Button>
        { strings.map((values, i) => <Feature {...values} time={1000+i*1000}/>) }
      </div>
    )
};

export default FeatureList;