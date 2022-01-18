import {IconButton, Stack, Tooltip} from '@mui/material';
import {PageContainer} from '../components/PageContainer';
import {Typography} from '../components/Typography';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import {deleteExerciseByIdApi} from '../apis/exercisesApis';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import {useLoadAllExercises} from '../hooks/useExercises';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

export const ExerciseListView = () => {
  const navigate = useNavigate();
  const {exercises, loadAllExercises} = useLoadAllExercises();

  useEffect(() => {
    loadAllExercises();
  }, [loadAllExercises]);

  const handleDelete = async (id: string) => {
    await deleteExerciseByIdApi(id);
    await loadAllExercises();
  };

  return (
    <>
      <PageContainer>
        <Stack direction='column' spacing={2}>
          <Stack
            direction='row'
            alignItems={'center'}
            justifyContent={'space-between'}
            sx={{marginBottom: 2}}>
            <Typography variant='page-title'>Exercise list</Typography>
            <Tooltip title='Add new exercise' arrow placement={'top'}>
              <IconButton onClick={() => navigate('/exercise/add')}>
                <AddCircleOutlineRoundedIcon />
              </IconButton>
            </Tooltip>
          </Stack>
          {exercises.map((item) => {
            return (
              <Stack
                key={item._id}
                direction='row'
                justifyContent={'space-between'}>
                <Typography variant='body-text'>{item.name}</Typography>
                <Stack direction='row' spacing={2}>
                  <IconButton
                    onClick={() => navigate(`/exercise/update/${item._id}`)}>
                    <EditRoundedIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(item._id)}>
                    <DeleteForeverRoundedIcon />
                  </IconButton>
                </Stack>
              </Stack>
            );
          })}
        </Stack>
      </PageContainer>
    </>
  );
};
