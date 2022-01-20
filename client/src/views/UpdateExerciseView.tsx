import {PageContainer} from '../components/PageContainer';
import {Box, Stack, IconButton, Tooltip} from '@mui/material';
import {Typography} from '../components/Typography';
import {ExerciseForm, ExerciseFormFields} from '../forms/ExerciseForm';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import {useNavigate, useParams} from 'react-router-dom';
import {ExercisePayload, updateExerciseApi} from '../apis/exercisesApis';
import {useEffect} from 'react';
import {useLoadExerciseById} from '../hooks/useExercises';

export const UpdateExerciseView = () => {
  const params = useParams();
  const navigate = useNavigate();
  const {loadExerciseById, exercise} = useLoadExerciseById();

  useEffect(() => {
    loadExerciseById(params.id as string);
  }, [loadExerciseById]);

  const updateExercise = async (formData: ExerciseFormFields) => {
    const {name} = formData;
    const payload: ExercisePayload = {name};
    await updateExerciseApi(params.id as string, payload);
    navigate('/exercises');
  };
  return (
    <PageContainer>
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
          Update exercise {exercise && exercise.name}
        </Typography>
      </Stack>
      {exercise && (
        <Box sx={{maxWidth: 400, margin: 'auto'}}>
          <ExerciseForm
            performNextAction={updateExercise}
            defaultValues={{name: exercise.name}}
          />
        </Box>
      )}
    </PageContainer>
  );
};
