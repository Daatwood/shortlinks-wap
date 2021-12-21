import React from 'react';

import { Slide, Card, CardMedia, CardActionArea, CardActions, CardContent } from '@material-ui/core';
import Text from './Text'

const Feature = ({name, description, link, time}) => {
  return (
    <Slide in={true} direction="up" mountOnEnter unmountOnExit timeout={time || 0}>
      <Card className='feature'>
        <CardActionArea>
          <CardContent>
            <Text s={name} v='h5' c='h2' options={'gutterBottom'}/>
            <Text s={description} v='body2' c='p' options={'gutterBottom'}/>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <a href={link} target={'_blank'}>
            Learn more
          </a>
        </CardActions>
      </Card>
    </Slide>
  )
}
export default Feature