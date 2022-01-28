import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Tooltip,
  IconButton,
  Box,
  Button,
} from '@mui/material';
import {useEffect, useState} from 'react';
import {PageContainer} from '../components/PageContainer';
import {Typography} from '../components/Typography';
import {useDateFormatter} from '../hooks/useIntl';
import {Calendar} from '../types/Calendar';
import {generateArbitaryArray} from '../utils/utils';
import {
  addDays,
  subDays,
  isSameDay,
  setMinutes,
  format,
  setSeconds,
  setMilliseconds,
} from 'date-fns';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import {Modal, MultiModalControl} from '../components/Modal';
import {MealForm, MealFormFields} from '../forms/MealForm';
import {useSnackbar} from 'notistack';
import {useLoadMealsForCalendarDaysById} from '../hooks/useCalendar';

export type ModalType = 'addMeal';

const defaultMultiModalControlState: MultiModalControl<ModalType> = {
  name: null,
  selectedDate: null,
};

const zeroMinuteSecondAndMilli = (date: Date) => {
  const zeroMinuteDate = setMinutes(date, 0);
  const zeroSecondDate = setSeconds(zeroMinuteDate, 0);
  return setMilliseconds(zeroSecondDate, 0);
};

export const CalendarView = () => {
  const [calendar, setCalendar] = useState<Calendar>({
    startDate: new Date(),
    dayCount: 7,
  });
  const [modalToOpen, setModalToOpen] = useState<MultiModalControl<ModalType>>(
    defaultMultiModalControlState
  );
  const {loadMealsForCalendarDays, meals} = useLoadMealsForCalendarDaysById();

  useEffect(() => {
    const {startDate, dayCount} = calendar;

    const dateFrom = format(startDate, 'yyyy-MM-dd');
    const dateTo = format(addDays(startDate, dayCount), 'yyyy-MM-dd');

    loadMealsForCalendarDays({
      id: '61f46b2f851cfda03c3595fe',
      dateFrom,
      dateTo,
    });
  }, [loadMealsForCalendarDays, calendar]);

  const dateFormatter = useDateFormatter();
  const {enqueueSnackbar} = useSnackbar();

  const prevDays = () => {
    setCalendar((prevState) => {
      return {
        ...prevState,
        startDate: subDays(prevState.startDate, 7),
      };
    });
  };

  const nextDays = () => {
    setCalendar((prevState) => {
      return {
        ...prevState,
        startDate: addDays(prevState.startDate, 7),
      };
    });
  };

  const goToToday = () => {
    setCalendar((prevState) => {
      if (isSameDay(new Date(), prevState.startDate)) {
        return {...prevState};
      }
      return {
        ...prevState,
        startDate: new Date(),
      };
    });
  };

  const openModal = (modalName: ModalType, date: Date) => {
    setModalToOpen({
      name: modalName,
      selectedDate: date,
    });
  };

  const closeModal = () => {
    setModalToOpen(defaultMultiModalControlState);
  };

  const addMeal = async (formData: MealFormFields) => {
    try {
      const date = zeroMinuteSecondAndMilli(modalToOpen.selectedDate as Date);

      closeModal();
    } catch (error) {
      enqueueSnackbar((error as Error).message, {variant: 'error'});
    }
  };

  return (
    <PageContainer>
      <Stack spacing={2} direction={'column'}>
        <Stack
          direction='row'
          alignItems={'center'}
          spacing={2}
          sx={{marginBottom: 2}}
          justifyContent={'space-between'}>
          <Typography variant='page-title'>Calendar</Typography>
          <Stack direction='row' alignItems={'center'} spacing={2}>
            <Tooltip
              arrow
              placement='top'
              title={`Previous ${calendar.dayCount} days`}>
              <IconButton onClick={prevDays}>
                <ChevronLeftRoundedIcon />
              </IconButton>
            </Tooltip>
            <Button onClick={goToToday}>Today</Button>
            <Tooltip
              title={`Next ${calendar.dayCount} days`}
              arrow
              placement='top'>
              <IconButton onClick={nextDays}>
                <ChevronRightRoundedIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
        <Box>
          {generateArbitaryArray(calendar.dayCount).map((_, index) => {
            const day = addDays(calendar.startDate, index);
            const date = dateFormatter.format(day);

            return (
              <Accordion
                key={date}
                defaultExpanded={isSameDay(new Date(), day)}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  {date} {day.toISOString()}
                </AccordionSummary>
                <AccordionDetails>
                  <Stack spacing={2} direction='column'>
                    {meals
                      .filter((meal) => {
                        return isSameDay(new Date(meal.date), day);
                      })
                      .map((meal) => {
                        return <Typography>{meal.name}</Typography>;
                      })}
                  </Stack>
                  <Button onClick={() => openModal('addMeal', day)}>
                    Add meal
                  </Button>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Box>
      </Stack>
      <Modal
        title='Add meal'
        open={modalToOpen.name === 'addMeal'}
        onCancel={closeModal}
        onClose={closeModal}
        formId={`${modalToOpen}-form`}>
        <MealForm onSubmit={addMeal} formId={`${modalToOpen}-form`} />
      </Modal>
    </PageContainer>
  );
};
