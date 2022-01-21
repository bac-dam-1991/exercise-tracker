import {PageContainer} from '../components/PageContainer';
import {Box, Stack, IconButton, Tooltip} from '@mui/material';
import {Typography} from '../components/Typography';
import {ExerciseForm, ExerciseFormFields} from '../forms/ExerciseForm';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import {useNavigate} from 'react-router-dom';
import {ExercisePayload, insertNewExerciseApi} from '../apis/exercisesApis';
import {useState} from 'react';
import {useSnackbar} from 'notistack';

export const AddNewExerciseView = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const {enqueueSnackbar} = useSnackbar();

  const addExercise = async (formData: ExerciseFormFields) => {
    try {
      setLoading(true);
      const {name} = formData;
      const payload: ExercisePayload = {name};
      await insertNewExerciseApi(payload);
      navigate('/exercises');
    } catch (error) {
      enqueueSnackbar((error as Error).message, {variant: 'error'});
    }
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
        <Typography variant='page-title'>Add new exercise</Typography>
      </Stack>
      <Box sx={{maxWidth: 400, margin: 'auto'}}>
        <ExerciseForm onSubmit={addExercise} loading={loading} />
      </Box>
    </PageContainer>
  );
};
