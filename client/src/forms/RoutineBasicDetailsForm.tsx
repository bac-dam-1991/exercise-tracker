import {joiResolver} from '@hookform/resolvers/joi';
import {LoadingButton} from '@mui/lab';
import {TextField, MenuItem, Stack} from '@mui/material';
import Joi from 'joi';
import {useForm} from 'react-hook-form';
import {JOI_SCHEMA_ERRORS} from '../adapters/joiAdapter';

const {STRING_ALPHANUM, STRING_EMPTY, STRING_MAX, STRING_MIN} =
  JOI_SCHEMA_ERRORS;

export const RoutineDurations = [
  {label: 'Weekly', value: 7, default: true},
  {label: 'Fornightly', value: 14, default: false},
];

export interface RoutineBasicDetailsFormFields {
  name: string;
  duration: string;
}

export const RoutineBasicDetailsSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(20)
    .required()
    .messages({
      [STRING_EMPTY]: 'Please enter routine name.',
      [STRING_MIN]:
        'Routine name needs to be at least {#limit} characters long.',
      [STRING_MAX]:
        'Routine name cannot be more than {#limit} characters long.',
      [STRING_ALPHANUM]: 'Routine name can only contain numbers and letters.',
    }),
  duration: Joi.string().valid('7', '14'),
});

export interface RoutineBasicDetailsFormProps {
  defaultValues?: RoutineBasicDetailsFormFields;
  onSubmit: (formData: RoutineBasicDetailsFormFields) => void;
  loading?: boolean;
}

export const RoutineBasicDetailsForm = ({
  defaultValues,
  onSubmit,
  loading,
}: RoutineBasicDetailsFormProps) => {
  const {
    handleSubmit,
    register,
    formState: {errors},
  } = useForm<RoutineBasicDetailsFormFields>({
    defaultValues,
    resolver: joiResolver(RoutineBasicDetailsSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction='column' spacing={2}>
        <TextField
          size='small'
          label='Name'
          autoFocus
          fullWidth
          InputProps={{...register('name')}}
          error={Boolean(errors.name)}
          helperText={errors.name && errors.name.message}
        />
        <TextField
          select
          label='Routine duration'
          size='small'
          fullWidth
          error={Boolean(errors.duration)}
          helperText={errors.duration && errors.duration.message}
          defaultValue={
            defaultValues?.duration ||
            RoutineDurations.find((item) => item.default)?.value
          }
          InputProps={{...register('duration')}}>
          {RoutineDurations.map((item) => {
            return (
              <MenuItem value={item.value.toString()} key={item.label}>
                {item.label}
              </MenuItem>
            );
          })}
        </TextField>
        <LoadingButton variant='contained' type='submit' loading={loading}>
          Create
        </LoadingButton>
      </Stack>
    </form>
  );
};
