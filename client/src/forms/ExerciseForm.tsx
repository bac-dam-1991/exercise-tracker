import {LoadingButton} from '@mui/lab';
import {Stack, TextField} from '@mui/material';
import {useSnackbar} from 'notistack';
import {useState} from 'react';
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
  performNextAction: (formData: ExerciseFormFields) => Promise<void>;
}

export const ExerciseForm = ({
  defaultValues,
  performNextAction,
}: ExerciseFormProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const {enqueueSnackbar} = useSnackbar();
  const {register, handleSubmit, formState} = useForm<ExerciseFormFields>({
    defaultValues,
    resolver: joiResolver(exerciseFormSchema),
  });
  const {errors} = formState;

  const onSubmit = async (formData: ExerciseFormFields) => {
    try {
      setLoading(true);
      await performNextAction(formData);
    } catch (error) {
      enqueueSnackbar((error as Error).message, {variant: 'error'});
    } finally {
      setLoading(false);
    }
  };

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
