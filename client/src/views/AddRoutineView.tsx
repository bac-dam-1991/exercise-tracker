import {PageContainer} from '../components/PageContainer';
import {Stack, IconButton, Tooltip} from '@mui/material';
import {Typography} from '../components/Typography';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import {useNavigate} from 'react-router-dom';
import {
  RoutineBasicDetailsForm,
  RoutineBasicDetailsFormFields,
} from '../forms/RoutineBasicDetailsForm';
import {FormContainer} from '../components/FormContainer';
import {createNewRoutineApi} from '../apis/routineApis';
import {useState} from 'react';
import {useSnackbar} from 'notistack';

export const AddRoutineView = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const {enqueueSnackbar} = useSnackbar();

  const addNewRoutine = async ({
    name,
    duration,
  }: RoutineBasicDetailsFormFields) => {
    try {
      setLoading(true);
      const result = await createNewRoutineApi({
        name,
        duration: parseInt(duration),
      });
      navigate(`/routines/${result._id}/update`);
    } catch (error) {
      enqueueSnackbar((error as Error).message, {variant: 'error'});
    }
  };

  return (
    <PageContainer>
      <Stack direction='column' spacing={2}>
        <Stack
          direction='row'
          alignItems={'center'}
          spacing={2}
          sx={{marginBottom: 2}}>
          <Tooltip title='Return' arrow placement={'top'}>
            <IconButton onClick={() => navigate('/routines')}>
              <ChevronLeftRoundedIcon />
            </IconButton>
          </Tooltip>
          <Typography variant='page-title'>Add new routine</Typography>
        </Stack>
        <FormContainer>
          <RoutineBasicDetailsForm onSubmit={addNewRoutine} loading={loading} />
        </FormContainer>
      </Stack>
    </PageContainer>
  );
};
