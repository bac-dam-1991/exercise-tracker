import {Box, BoxProps} from '@mui/material';
import {Typography} from './Typography';

export interface TabPanelProps extends BoxProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export const TabPanel = ({children, value, index, ...other}: TabPanelProps) => {
  return (
    <Box
      role='tabpanel'
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{p: 3}}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Box>
  );
};
