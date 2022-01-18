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

render(
  <BrowserRouter>
    <SnackbarProvider maxSnack={3}>
      <CssBaseline />
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<HomeView />} />
          <Route path='profile' element={<ProfileView />} />
          <Route path='exercise'>
            <Route index element={<ExerciseListView />} />
            <Route path='add' element={<AddNewExerciseView />} />
            <Route path='update/:id' element={<UpdateExerciseView />} />
          </Route>
        </Route>
      </Routes>
    </SnackbarProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
