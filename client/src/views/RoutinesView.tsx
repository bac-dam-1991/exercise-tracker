import {IconButton, Stack, Tooltip} from '@mui/material';
import {PageContainer} from '../components/PageContainer';
import {Typography} from '../components/Typography';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import {useNavigate} from 'react-router-dom';
import {useLoadAllRoutines} from '../hooks/useRoutines';
import {useEffect} from 'react';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

export const RoutinesView = () => {
  const navigate = useNavigate();
  const {routines, loadAllRoutines} = useLoadAllRoutines();

  useEffect(() => {
    loadAllRoutines();
  }, [loadAllRoutines]);

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
        {routines.map((item) => {
          return (
            <Stack
              key={item._id}
              direction='row'
              justifyContent={'space-between'}>
              <Typography variant='body-text'>{item.name}</Typography>
              <Stack direction='row' spacing={2}>
                <IconButton
                  onClick={() => navigate(`/routines/${item._id}/update`)}>
                  <EditRoundedIcon />
                </IconButton>
                <IconButton>
                  <DeleteForeverRoundedIcon />
                </IconButton>
              </Stack>
            </Stack>
          );
        })}
      </Stack>
    </PageContainer>
  );
};
