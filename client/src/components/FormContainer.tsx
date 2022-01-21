import {Box} from '@mui/material';
import {styled} from '@mui/material/styles';

export const FormContainer = styled(Box)(({theme}) => {
  return {
    '&.MuiBox-root': {
      margin: 'auto',
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 400,
      },
    },
  };
});
