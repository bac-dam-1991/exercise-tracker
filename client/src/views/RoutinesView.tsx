import {IconButton, Stack, Tooltip} from '@mui/material';
import {PageContainer} from '../components/PageContainer';
import {Typography} from '../components/Typography';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import {useNavigate} from 'react-router-dom';

export const RoutinesView = () => {
  const navigate = useNavigate();
  return (
    <PageContainer>
      <Stack direction='column' spacing={2}>
        <Stack
          direction='row'
          alignItems={'center'}
          justifyContent={'space-between'}
          sx={{marginBottom: 2}}>
          <Typography variant='page-title'>Routines</Typography>
          <Tooltip title='Add new exercise' arrow placement={'top'}>
            <IconButton onClick={() => navigate('/routines/add')}>
              <AddCircleOutlineRoundedIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
    </PageContainer>
  );
};
