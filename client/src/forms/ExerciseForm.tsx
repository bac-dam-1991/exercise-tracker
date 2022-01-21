import {LoadingButton} from '@mui/lab';
import {Stack, TextField} from '@mui/material';
import {useSnackbar} from 'notistack';
import {useForm} from 'react-hook-form';
import {joiResolver} from '@hookform/resolvers/joi';
import Joi from 'joi';

export type ExerciseFormFields = {
  name: string;
};

export const exerciseFormSchema = Joi.object({
  name: Joi.string().required().max(50).min(3),
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
