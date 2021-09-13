import { TextField } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import settings from '../data/settings.json'

const StyledInput = styled(TextField)({
  backgroundColor: 'rgba(0,0,0,0.4)',
  borderRadius: settings.padding,
  boxShadow: '0 3px 5px 2px rgba(105, 105, 105, .3)',
  margin: '30px 6px 30px 0',
  '& label': {
    color: settings.gray,
    paddingLeft: settings.padding * 2,
  },
  '& div': {
    paddingLeft: settings.padding,
    '& input': {
      color: settings.white,
    },
  },
})

export default StyledInput