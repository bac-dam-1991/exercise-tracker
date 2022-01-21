import {PageContainer} from '../components/PageContainer';
import {Box, Stack, IconButton, Tooltip} from '@mui/material';
import {Typography} from '../components/Typography';
import {ExerciseForm, ExerciseFormFields} from '../forms/ExerciseForm';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import {useNavigate, useParams} from 'react-router-dom';
import {ExercisePayload, updateExerciseApi} from '../apis/exercisesApis';
import {useEffect, useState} from 'react';
import {useLoadExerciseById} from '../hooks/useExercises';
import {useSnackbar} from 'notistack';

export const UpdateExerciseView = () => {
  const params = useParams();
  const navigate = useNavigate();
  const {loadExerciseById, exercise} = useLoadExerciseById();
  const [loading, setLoading] = useState<boolean>(false);
  const {enqueueSnackbar} = useSnackbar();

  useEffect(() => {
    if (!params.id) {
      return;
    }
    loadExerciseById(params.id);
  }, [loadExerciseById]);

  const updateExercise = async (formData: ExerciseFormFields) => {
    try {
      setLoading(true);
      const {name} = formData;
      const payload: ExercisePayload = {name};
      await updateExerciseApi(params.id as string, payload);
      navigate('/exercises');
    } catch (error) {
      enqueueSnackbar((error as Error).message, {variant: 'error'});
    }
  };
  return (
    <PageContainer>
      {exercise && (
        <>
          <Stack
            direction='row'
            alignItems={'center'}
            spacing={2}
            sx={{marginBottom: 2}}>
            <Tooltip title='Return' arrow placement={'top'}>
              <IconButton onClick={() => navigate('/exercises')}>
                <ChevronLeftRoundedIcon />
              </IconButton>
            </Tooltip>
            <Typography variant='page-title'>
              Update exercise {exercise.name}
            </Typography>
          </Stack>

          <Box sx={{maxWidth: 400, margin: 'auto'}}>
            <ExerciseForm
              onSubmit={updateExercise}
              defaultValues={{name: exercise.name}}
              loading={loading}
            />
          </Box>
        </>
      )}
    </PageContainer>
  );
};
