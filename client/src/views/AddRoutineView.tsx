import {PageContainer} from '../components/PageContainer';
import {
  Stack,
  IconButton,
  Tooltip,
  TextField,
  MenuItem,
  Tabs,
  Box,
  Tab,
} from '@mui/material';
import {Typography} from '../components/Typography';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import {useNavigate} from 'react-router-dom';
import {ChangeEvent, SyntheticEvent, useEffect, useState} from 'react';
import {TabPanel} from '../components/TabPanel';
import {RoutineDayForm} from '../forms/RoutineDayForm';

export enum RoutineDuration {
  Weekly = 'Weekly',
  Fortnightly = 'Fortnightly',
}

export const RoutineDurationMap: ReadonlyMap<RoutineDuration, number> = new Map(
  [
    [RoutineDuration.Weekly, 7],
    [RoutineDuration.Fortnightly, 14],
  ]
);

const a11yProps = (index: number) => {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
};

export const AddRoutineView = () => {
  const navigate = useNavigate();
  const [routineDuration, setRoutineDuration] = useState<RoutineDuration>(
    RoutineDuration.Weekly
  );
  const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);
  const handleRoutineChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRoutineDuration(e.target.value as RoutineDuration);
  };

  useEffect(() => {
    setCurrentTabIndex(0);
  }, [routineDuration]);

  const handleTabChange = (_: SyntheticEvent, newValue: number) => {
    setCurrentTabIndex(newValue);
  };

  const arbitaryArray: string[] = Object.keys(
    Array.from(Array(RoutineDurationMap.get(routineDuration)))
  );

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
        <TextField size='small' label='Name' />
        <TextField
          select
          label='Routine duration'
          size='small'
          onChange={handleRoutineChange}
          value={routineDuration}>
          {Object.keys(RoutineDuration).map((item) => {
            return (
              <MenuItem value={item} key={item}>
                {item}
              </MenuItem>
            );
          })}
        </TextField>
        <Box sx={{flexGrow: 1, display: 'flex'}}>
          <Tabs
            orientation='vertical'
            value={currentTabIndex}
            onChange={handleTabChange}
            aria-label='Vertical tabs for routine days'
            variant='scrollable'
            sx={{borderRight: 1, borderColor: 'divider'}}>
            {arbitaryArray.map((item, index) => {
              return (
                <Tab
                  label={`Day ${index + 1}`}
                  key={item}
                  {...a11yProps(index)}
                />
              );
            })}
          </Tabs>
          {arbitaryArray.map((item, index) => {
            return (
              <TabPanel
                value={currentTabIndex}
                index={index}
                key={item}
                sx={{width: '100%'}}>
                <Stack direction='column' spacing={2} sx={{width: '100%'}}>
                  <Typography variant='heading'>Day {index + 1}</Typography>
                  <RoutineDayForm
                    defaultValues={{dayIndex: index, exercises: []}}
                  />
                </Stack>
              </TabPanel>
            );
          })}
        </Box>
      </Stack>
    </PageContainer>
  );
};
