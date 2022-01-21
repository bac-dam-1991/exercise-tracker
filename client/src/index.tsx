import {render} from 'react-dom';
import {App} from './App';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {CssBaseline} from '@mui/material';
import {HomeView} from './views/HomeView';
import {ProfileView} from './views/ProfileView';
import {ExerciseListView} from './views/ExerciseListView';
import {AddNewExerciseView} from './views/AddNewExerciseView';
import {UpdateExerciseView} from './views/UpdateExerciseView';
import {SnackbarProvider} from 'notistack';
import {RoutinesView} from './views/RoutinesView';
import {AddRoutineView} from './views/AddRoutineView';
import {UpdateRoutineView} from './views/UpdateRoutineView';

render(
  <BrowserRouter>
    <SnackbarProvider maxSnack={3}>
      <CssBaseline />
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<HomeView />} />
          <Route path='profile' element={<ProfileView />} />
          <Route path='exercises'>
            <Route index element={<ExerciseListView />} />
            <Route path='add' element={<AddNewExerciseView />} />
            <Route path=':id/update' element={<UpdateExerciseView />} />
          </Route>
          <Route path='routines'>
            <Route index element={<RoutinesView />} />
            <Route path='add' element={<AddRoutineView />} />
            <Route path=':id/update' element={<UpdateRoutineView />} />
          </Route>
        </Route>
      </Routes>
    </SnackbarProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
