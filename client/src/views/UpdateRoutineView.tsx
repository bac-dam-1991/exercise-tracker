import {Box, Tabs, Stack, Tab, Tooltip, IconButton} from '@mui/material';
import {SyntheticEvent, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {PageContainer} from '../components/PageContainer';
import {a11yProps, TabPanel} from '../components/TabPanel';
import {Typography} from '../components/Typography';
import {RoutineDayForm} from '../forms/RoutineDayForm';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import {useNavigate} from 'react-router-dom';
import {useLoadRoutineById} from '../hooks/useRoutines';

export const UpdateRoutineView = () => {
  const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);
  const navigate = useNavigate();
  const params = useParams();
  const {loadRoutineById, routine} = useLoadRoutineById();

  const handleTabChange = (_: SyntheticEvent, newValue: number) => {
    setCurrentTabIndex(newValue);
  };

  useEffect(() => {
    if (!params.id) {
      return;
    }
    loadRoutineById(params.id);
  }, [loadRoutineById]);

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
                  return (
                    <TabPanel
                      value={currentTabIndex}
                      index={index}
                      key={item}
                      sx={{width: '100%'}}>
                      <Stack
                        direction='column'
                        spacing={2}
                        sx={{width: '100%'}}>
                        <Typography variant='heading'>
                          Day {index + 1}
                        </Typography>
                        <RoutineDayForm
                          defaultValues={{dayIndex: index, exercises: []}}
                        />
                      </Stack>
                    </TabPanel>
                  );
                }
              )}
            </Box>
          </Stack>
        </>
      )}
    </PageContainer>
  );
};
