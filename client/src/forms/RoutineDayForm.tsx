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
import {JOI_SCHEMA_ERRORS} from '../adapters/joiAdapter';
const {ANY_REQUIRED, STRING_EMPTY} = JOI_SCHEMA_ERRORS;

export interface RoutineDayFormFields {
  dayIndex: number;
  name: string;
  setType: 'rep' | 'time';
  amount: string;
  setCount: string;
}

export const RoutineDaySchema = Joi.object({
  dayIndex: Joi.number()
    .required()
    .messages({[ANY_REQUIRED]: 'Missing day index.'}),
  name: Joi.string()
    .required()
    .messages({[STRING_EMPTY]: 'Please select an exercise.'}),
  setType: Joi.string()
    .valid('rep', 'time')
    .required()
    .messages({[STRING_EMPTY]: 'Please select a set type.'}),
  amount: Joi.string()
    .pattern(/[0-9]/)
    .optional()
    .required()
    .messages({[STRING_EMPTY]: 'This field is required.'}),
  setCount: Joi.string()
    .pattern(/[0-9]/)
    .required()
    .messages({[STRING_EMPTY]: 'Set count is required.'}),
});

export interface RoutineDayFormProps {
  defaultValues?: Partial<RoutineDayFormFields>;
  formId?: string;
  onFormSubmit: (formData: RoutineDayFormFields) => Promise<void>;
}

export const RoutineDayForm = ({
  defaultValues,
  formId,
  onFormSubmit,
}: RoutineDayFormProps) => {
  const {loading, exercises, loadAllExercises} = useLoadAllExercises();
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<RoutineDayFormFields>({
    defaultValues,
    resolver: joiResolver(RoutineDaySchema),
  });

  const setTypeWatch = watch('setType');

  useEffect(() => {
    loadAllExercises();
  }, [loadAllExercises]);

  const onSubmit = (formData: RoutineDayFormFields) => {
    onFormSubmit(formData);
  };

  const {name, ...rest} = register('name');

  return (
    <form onSubmit={handleSubmit(onSubmit)} id={formId}>
      <Stack direction='column' spacing={2}>
        <Stack direction='row' spacing={2} alignItems={'center'}>
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
                      error={Boolean(errors && errors.name)}
                      helperText={errors.name && errors.name.message}
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
                InputProps={{...register('setType')}}
                defaultValue={'rep'}
                error={Boolean(errors.setType)}
                helperText={errors.setType && errors.setType?.message}>
                <MenuItem value='time'>Time-based</MenuItem>
                <MenuItem value='rep'>Rep-based</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label={setTypeWatch === 'rep' ? 'Count' : 'Duration (mins)'}
                size='small'
                fullWidth
                InputProps={{...register('amount')}}
                error={Boolean(errors.amount)}
                helperText={errors.amount && errors.amount?.message}
                type='number'
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label='Set'
                size='small'
                fullWidth
                type='number'
                InputProps={{...register('setCount')}}
                error={Boolean(errors.setCount)}
                helperText={errors.setCount && errors.setCount?.message}
              />
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </form>
  );
};
