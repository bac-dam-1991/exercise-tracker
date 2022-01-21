import {
  Autocomplete,
  Grid,
  MenuItem,
  Button,
  Stack,
  TextField,
  IconButton,
} from '@mui/material';
import {useEffect} from 'react';
import {useLoadAllExercises} from '../hooks/useExercises';
import {FieldErrors, useFieldArray, useForm} from 'react-hook-form';
import {LoadingButton} from '@mui/lab';
import Joi from 'joi';
import {joiResolver} from '@hookform/resolvers/joi';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export interface ExerciseRoutine {
  exercise: string;
  setType: 'rep' | 'time';
  amount: string;
  setCount: string;
}

export interface RoutineDayFormFields {
  dayIndex: number;
  exercises: ExerciseRoutine[];
}

export const RoutineDaySchema = Joi.object({
  dayIndex: Joi.number().required(),
  exercises: Joi.array().items({
    exercise: Joi.string()
      .required()
      .messages({'string.empty': 'Please select an exercise.'}),
    setType: Joi.string().valid('rep', 'time').required(),
    amount: Joi.string()
      .pattern(/[0-9]/)
      .optional()
      .required()
      .messages({'string.empty': 'This field is required.'}),
    setCount: Joi.string()
      .pattern(/[0-9]/)
      .required()
      .messages({'string.empty': 'Set count is required.'}),
  }),
});

export interface RoutineDayFormProps {
  defaultValues?: RoutineDayFormFields;
}

export const RoutineDayForm = ({defaultValues}: RoutineDayFormProps) => {
  const {loading, exercises, loadAllExercises} = useLoadAllExercises();
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: {errors},
  } = useForm<RoutineDayFormFields>({
    defaultValues,
    resolver: joiResolver(RoutineDaySchema),
  });

  const {fields, append, remove} = useFieldArray({
    control,
    name: 'exercises',
  });

  useEffect(() => {
    loadAllExercises();
  }, [loadAllExercises]);

  const onSubmit = (formData: any) => {
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction='column' spacing={2}>
        {fields.map((item, index) => {
          const {name, ...rest} = register(`exercises.${index}.exercise`);
          const errorExercises = errors.exercises;
          let currentErrors: FieldErrors<ExerciseRoutine> = {};
          if (errorExercises) {
            currentErrors = errorExercises[index];
          }

          const setTypeWatch = watch(`exercises.${index}.setType`);

          return (
            <Stack
              direction='row'
              spacing={2}
              key={item.id}
              alignItems={'center'}>
              <Grid container spacing={2} style={{marginLeft: '-16px'}}>
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    fullWidth
                    isOptionEqualToValue={(option, value) =>
                      option.name === value.name
                    }
                    getOptionLabel={(option) => option.name}
                    options={exercises}
                    loading={loading}
                    size='small'
                    {...rest}
                    renderInput={(params) => {
                      return (
                        <TextField
                          error={Boolean(
                            currentErrors && currentErrors.exercise
                          )}
                          helperText={
                            currentErrors &&
                            currentErrors.exercise &&
                            currentErrors.exercise.message
                          }
                          name={name}
                          {...params}
                          label='Exercise'
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: <>{params.InputProps.endAdornment}</>,
                          }}
                        />
                      );
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    label='Set type'
                    fullWidth
                    size='small'
                    InputProps={{...register(`exercises.${index}.setType`)}}
                    defaultValue={'rep'}
                    error={Boolean(currentErrors && currentErrors.setType)}
                    helperText={
                      currentErrors &&
                      currentErrors.setType &&
                      currentErrors.setType?.message
                    }>
                    <MenuItem value='time'>Time-based</MenuItem>
                    <MenuItem value='rep'>Rep-based</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label={setTypeWatch === 'rep' ? 'Count' : 'Duration (mins)'}
                    size='small'
                    fullWidth
                    InputProps={{...register(`exercises.${index}.amount`)}}
                    error={Boolean(currentErrors && currentErrors.amount)}
                    helperText={
                      currentErrors &&
                      currentErrors.amount &&
                      currentErrors.amount?.message
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label='Set'
                    size='small'
                    fullWidth
                    type={'number'}
                    InputProps={{...register(`exercises.${index}.setCount`)}}
                    error={Boolean(currentErrors && currentErrors.setCount)}
                    helperText={
                      currentErrors &&
                      currentErrors.setCount &&
                      currentErrors.setCount?.message
                    }
                  />
                </Grid>
              </Grid>
              <IconButton onClick={() => remove(index)}>
                <HighlightOffIcon />
              </IconButton>
            </Stack>
          );
        })}

        <Stack
          sx={{width: '100%'}}
          direction={'row'}
          justifyContent={'space-between'}>
          <Button onClick={() => append({})}>Add exercise</Button>
          <LoadingButton type='submit' variant='contained'>
            Save
          </LoadingButton>
        </Stack>
      </Stack>
    </form>
  );
};
