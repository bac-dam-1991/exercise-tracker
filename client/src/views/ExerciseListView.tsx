import {IconButton, Stack, Tooltip} from '@mui/material';
import {PageContainer} from '../components/PageContainer';
import {Typography} from '../components/Typography';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import {useNavigate} from 'react-router-dom';
import {useCallback, useEffect, useState} from 'react';
import {deleteExerciseByIdApi, ExerciseDto} from '../apis/exercisesApis';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import {useLoadAllExercises} from '../hooks/useExercises';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import {Modal} from '../components/Modal';

export const ExerciseListView = () => {
  const navigate = useNavigate();
  const {exercises, loadAllExercises} = useLoadAllExercises();
  const [exerciseToDelete, setExerciseToDelete] = useState<ExerciseDto | null>(
    null
  );

  useEffect(() => {
    loadAllExercises();
  }, [loadAllExercises]);

  const handleDelete = useCallback(async () => {
    if (!exerciseToDelete) {
      return;
    }
    await deleteExerciseByIdApi(exerciseToDelete._id);
    setExerciseToDelete(null);
    await loadAllExercises();
  }, [exerciseToDelete, loadAllExercises]);

  const openDeleteModal = (exercise: ExerciseDto) => {
    setExerciseToDelete(exercise);
  };

  const closeDeleteModal = () => {
    setExerciseToDelete(null);
  };

  useEffect(() => {
    window.document.onkeyup = (e: KeyboardEvent) => {
      if (e.key === '+') {
        navigate('/exercises/add');
      }
      console.log(e);
    };
    return () => {
      window.document.onkeyup = null;
    };
  }, []);

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
              <IconButton onClick={() => navigate('/exercises/add')}>
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
                    onClick={() => navigate(`/exercises/${item._id}/update`)}>
                    <EditRoundedIcon />
                  </IconButton>
                  <IconButton onClick={() => openDeleteModal(item)}>
                    <DeleteForeverRoundedIcon />
                  </IconButton>
                </Stack>
              </Stack>
            );
          })}
        </Stack>
        <Modal
          open={Boolean(exerciseToDelete)}
          title='Delete exercise'
          onCancel={closeDeleteModal}
          onConfirm={handleDelete}>
          {exerciseToDelete && (
            <Typography>
              Are you sure you want to delete {exerciseToDelete.name}?
            </Typography>
          )}
        </Modal>
      </PageContainer>
    </>
  );
};
