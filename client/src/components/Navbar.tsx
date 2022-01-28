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
          <Button color='inherit' component={Link} to='/exercises'>
            Exercises
          </Button>
          <Button color='inherit' component={Link} to='/routines'>
            Routines
          </Button>
          <Button color='inherit' component={Link} to='/calendar'>
            Calendar
          </Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};
