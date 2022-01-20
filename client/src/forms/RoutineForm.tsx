import {Autocomplete, Grid, MenuItem, Stack, TextField} from '@mui/material';
import {useEffect, useState} from 'react';
import {useLoadAllExercises} from '../hooks/useExercises';
import CircularProgress from '@mui/material/CircularProgress';

export interface RoutineFormProps {}

export const RoutineForm = () => {
  const [open, setOpen] = useState<boolean>(false);

  const {loading, exercises, loadAllExercises} = useLoadAllExercises();

  useEffect(() => {
    loadAllExercises();
  }, [loadAllExercises]);

  return (
    <Grid container spacing={2} style={{marginLeft: '-16px'}}>
      <Grid item xs={12}>
        <Autocomplete
          fullWidth
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          isOptionEqualToValue={(option, value) => option.name === value.name}
          getOptionLabel={(option) => option.name}
          options={exercises}
          loading={loading}
          size='small'
          renderInput={(params) => {
            return (
              <TextField
                {...params}
                label='Exercise'
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading ? (
                        <CircularProgress color='inherit' size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            );
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField select label='Set type' fullWidth size='small'>
          <MenuItem value='time'>Time-based</MenuItem>
          <MenuItem value='rep'>Rep-based</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={6}>
        <TextField label='Rep' size='small' fullWidth />
      </Grid>
      <Grid item xs={6}>
        <TextField label='Set' size='small' fullWidth />
      </Grid>
    </Grid>
  );
};
