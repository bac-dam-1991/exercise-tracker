import {AppBar, Button, Toolbar} from '@mui/material';
import {Link} from 'react-router-dom';

export const Navbar = () => {
  return (
    <>
      <AppBar>
        <Toolbar>
          <Button color='inherit' component={Link} to='/'>
            Home
          </Button>
          <Button color='inherit' component={Link} to='/profile'>
            Profile
          </Button>
          <Button color='inherit' component={Link} to='/exercise'>
            Exercises
          </Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};
