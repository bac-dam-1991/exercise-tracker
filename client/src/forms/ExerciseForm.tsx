import {LoadingButton} from '@mui/lab';
import {Stack, TextField} from '@mui/material';
import {useForm} from 'react-hook-form';
import {joiResolver} from '@hookform/resolvers/joi';
import Joi from 'joi';
import {JOI_SCHEMA_ERRORS} from '../adapters/joiAdapter';

const {STRING_EMPTY, STRING_MAX, STRING_MIN} = JOI_SCHEMA_ERRORS;

export type ExerciseFormFields = {
  name: string;
};

export const exerciseFormSchema = Joi.object({
  name: Joi.string()
    .required()
    .max(20)
    .min(3)
    .messages({
      [STRING_EMPTY]: 'Exercise name is required.',
      [STRING_MIN]: 'Exercise name needs at least {#limit} characters.',
      [STRING_MAX]: 'Exercise name cannot be more than {#limit} characters.',
    }),
});

export interface ExerciseFormProps {
  defaultValues?: ExerciseFormFields;
  onSubmit: (formData: ExerciseFormFields) => Promise<void>;
  loading?: boolean;
}

export const ExerciseForm = ({
  defaultValues,
  onSubmit,
  loading,
}: ExerciseFormProps) => {
  const {register, handleSubmit, formState} = useForm<ExerciseFormFields>({
    defaultValues,
    resolver: joiResolver(exerciseFormSchema),
  });
  const {errors} = formState;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction='column' spacing={2}>
        <TextField
          fullWidth
          InputProps={{...register('name')}}
          helperText={errors && errors.name?.message}
          error={Boolean(errors.name)}
          size='small'
          label='Name'
          autoFocus
        />
        <LoadingButton variant='contained' type='submit' loading={loading}>
          Save
        </LoadingButton>
      </Stack>
    </form>
  );
};
