import {MenuItem, Stack, TextField} from '@mui/material';
import {useForm} from 'react-hook-form';
import {joiResolver} from '@hookform/resolvers/joi';
import Joi from 'joi';
import {JOI_SCHEMA_ERRORS} from '../adapters/joiAdapter';
import _ from 'lodash';

const {STRING_EMPTY, STRING_MAX, STRING_MIN} = JOI_SCHEMA_ERRORS;

export const MealTypes = [
  'breakfast',
  'brunch',
  'lunch',
  'dinner',
  'snack',
] as const;
export type MealType = typeof MealTypes[number];

export type MealFormFields = {
  name: string;
  description: string;
  mealType: MealType;
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
  description: Joi.string().optional().max(200).min(3).allow(''),
  mealType: Joi.string()
    .valid(...MealTypes)
    .required()
    .messages({
      [STRING_EMPTY]: 'Meal type is required.',
    }),
});

export interface MealFormProps {
  defaultValues?: MealFormFields;
  onSubmit: (formData: MealFormFields) => Promise<void>;
  formId?: string;
}

export const MealForm = ({defaultValues, onSubmit, formId}: MealFormProps) => {
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
        <TextField
          select
          fullWidth
          InputProps={{...register('mealType')}}
          helperText={errors && errors.mealType?.message}
          error={Boolean(errors.mealType)}
          size='small'
          defaultValue={'breakfast'}
          label='Meal type'>
          {MealTypes.map((item) => {
            return (
              <MenuItem value={item} key={item}>
                {_.capitalize(item)}
              </MenuItem>
            );
          })}
        </TextField>
        <TextField
          fullWidth
          multiline
          minRows={4}
          InputProps={{...register('description')}}
          helperText={errors && errors.description?.message}
          error={Boolean(errors.description)}
          size='small'
          label='Description'
        />
      </Stack>
    </form>
  );
};
