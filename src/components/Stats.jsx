import { Typography, Paper } from '@material-ui/core';

const Stats = ({data}) => {
  if (!data)
    return null

  const { link, redirects, viewers } = data;

  return ( 
    <Paper>
      <Typography variant='caption'>Full Link:</Typography>
      <Typography variant='subtitle1'>{link}</Typography>
      <Typography variant='caption'>Redirects:</Typography>
      <Typography variant='overline'>{redirects}</Typography>
      <Typography variant='caption'>Views:</Typography>
      <Typography variant='overline'>{viewers ? viewers.length : 0 }</Typography>
    </Paper>
  )
}
export default Stats;