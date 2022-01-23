import {Box, Tabs, Stack, Tab, Tooltip, IconButton, Paper} from '@mui/material';
import {SyntheticEvent, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {PageContainer} from '../components/PageContainer';
import {a11yProps, TabPanel} from '../components/TabPanel';
import {Typography} from '../components/Typography';
import {RoutineDayForm, RoutineDayFormFields} from '../forms/RoutineDayForm';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import {useNavigate} from 'react-router-dom';
import {useLoadRoutineById} from '../hooks/useRoutines';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import {Modal} from '../components/Modal';
import {
  addExerciseToRoutineApi,
  AddExerciseToRoutineApiPayload,
} from '../apis/routineApis';
import {useLoadAllExercises} from '../hooks/useExercises';
import {useSnackbar} from 'notistack';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

export const UpdateRoutineView = () => {
  const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);
  const navigate = useNavigate();
  const params = useParams();
  const {loadRoutineById, routine} = useLoadRoutineById();
  const [dayIndexToAddExercise, setDayIndexToAddExercise] = useState<
    number | null
  >(null);

  const {loadAllExercises, exercises} = useLoadAllExercises();
  const [loading, setLoading] = useState<boolean>(false);
  const {enqueueSnackbar} = useSnackbar();

  const handleTabChange = (_: SyntheticEvent, newValue: number) => {
    setCurrentTabIndex(newValue);
  };

  useEffect(() => {
    loadAllExercises();
  }, [loadAllExercises]);

  useEffect(() => {
    if (!params.id) {
      return;
    }
    loadRoutineById(params.id);
  }, [loadRoutineById]);

  const closeAddExerciseModal = () => {
    setDayIndexToAddExercise(null);
  };

  const addExerciseToRoutine = async (formData: RoutineDayFormFields) => {
    try {
      setLoading(true);
      const {dayIndex, amount, setCount, setType, name} = formData;
      const selectedExercise = exercises.find((item) => item.name === name);
      if (!selectedExercise) {
        throw new Error(`${name} does not exist in exercise list.`);
      }
      const payload: AddExerciseToRoutineApiPayload = {
        dayIndex,
        amount: parseInt(amount),
        setCount: parseInt(setCount),
        setType,
        id: selectedExercise._id,
      };
      const routineId = params.id as string;
      await addExerciseToRoutineApi(routineId, payload);
      await loadRoutineById(routineId);
      closeAddExerciseModal();
    } catch (error) {
      enqueueSnackbar((error as Error).message, {variant: 'error'});
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      {routine && (
        <>
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
              <Typography variant='page-title'>{routine.name}</Typography>
            </Stack>
            <Box sx={{flexGrow: 1, display: 'flex'}}>
              <Tabs
                orientation='vertical'
                value={currentTabIndex}
                onChange={handleTabChange}
                aria-label='Vertical tabs for routine days'
                variant='scrollable'
                sx={{borderRight: 1, borderColor: 'divider'}}>
                {Object.keys(Array.from(Array(routine.duration))).map(
                  (item, index) => {
                    return (
                      <Tab
                        label={`Day ${index + 1}`}
                        key={item}
                        {...a11yProps(index)}
                      />
                    );
                  }
                )}
              </Tabs>
              {Object.keys(Array.from(Array(routine.duration))).map(
                (item, index) => {
                  const currentDayRoutine = routine.exerciseRoutines.filter(
                    (routine) => routine.dayIndex === index
                  );

                  return (
                    <TabPanel
                      key={item}
                      value={currentTabIndex}
                      index={index}
                      sx={{width: '100%'}}>
                      <Stack direction='column' spacing={2}>
                        <Stack
                          direction='row'
                          alignItems={'center'}
                          justifyContent={'space-between'}
                          sx={{marginBottom: 2}}>
                          <Typography variant='heading'>
                            Day {index + 1}
                          </Typography>
                          <Tooltip
                            title='Add exercise to routine'
                            arrow
                            placement={'top'}>
                            <IconButton
                              onClick={() => setDayIndexToAddExercise(index)}>
                              <AddCircleOutlineRoundedIcon />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                        {currentDayRoutine.length ? (
                          currentDayRoutine.map((routine) => {
                            const isRepBased = routine.setType === 'rep';

                            return (
                              <Paper
                                key={routine.exercise._id}
                                sx={{padding: 2}}>
                                <Stack direction='column' spacing={1}>
                                  <Stack
                                    direction='row'
                                    alignItems={'center'}
                                    justifyContent={'space-between'}>
                                    <Typography variant='sub-heading'>
                                      <strong>{routine.exercise.name}</strong>
                                    </Typography>
                                    <Tooltip
                                      title='Edit'
                                      arrow
                                      placement={'top'}>
                                      <IconButton>
                                        <EditRoundedIcon />
                                      </IconButton>
                                    </Tooltip>
                                  </Stack>
                                  <Stack direction='row' spacing={2}>
                                    <Typography variant='body-text'>
                                      {isRepBased
                                        ? 'Number of reps'
                                        : 'Duration (mins)'}
                                      : {routine.amount}
                                    </Typography>
                                    <Typography variant='body-text'>
                                      Number of sets: {routine.setCount}
                                    </Typography>
                                  </Stack>
                                </Stack>
                              </Paper>
                            );
                          })
                        ) : (
                          <Typography variant='sub-heading'>
                            Rest day
                          </Typography>
                        )}
                      </Stack>
                    </TabPanel>
                  );
                }
              )}
            </Box>
          </Stack>
        </>
      )}
      <Modal
        open={dayIndexToAddExercise !== null}
        title='Add exercise'
        onClose={closeAddExerciseModal}
        onCancel={closeAddExerciseModal}
        loading={loading}
        formId='add-exercise-to-routine-form'>
        <RoutineDayForm
          defaultValues={{dayIndex: dayIndexToAddExercise as number}}
          formId='add-exercise-to-routine-form'
          onFormSubmit={addExerciseToRoutine}
        />
      </Modal>
    </PageContainer>
  );
};
