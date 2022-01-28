import {LoadingButton} from '@mui/lab';
import {Stack, TextField} from '@mui/material';
import {useForm} from 'react-hook-form';
import {joiResolver} from '@hookform/resolvers/joi';
import Joi from 'joi';
import {JOI_SCHEMA_ERRORS} from '../adapters/joiAdapter';

const {STRING_EMPTY, STRING_MAX, STRING_MIN} = JOI_SCHEMA_ERRORS;

export type MealFormFields = {
  name: string;
};

export const mealFormSchema = Joi.object({
  name: Joi.string()
    .required()
    .max(20)
    .min(3)
    .messages({
      [STRING_EMPTY]: 'Meal name is required.',
      [STRING_MIN]: 'Meal name needs at least {#limit} characters.',
      [STRING_MAX]: 'Meal name cannot be more than {#limit} characters.',
    }),
});

export interface MealFormProps {
  defaultValues?: MealFormFields;
  onSubmit: (formData: MealFormFields) => Promise<void>;
  formId?: string;
}

export const MealForm = ({
  defaultValues,
  onSubmit,

  formId,
}: MealFormProps) => {
  const {register, handleSubmit, formState} = useForm<MealFormFields>({
    defaultValues,
    resolver: joiResolver(mealFormSchema),
  });
  const {errors} = formState;

  return (
    <form onSubmit={handleSubmit(onSubmit)} id={formId}>
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
      </Stack>
    </form>
  );
};
