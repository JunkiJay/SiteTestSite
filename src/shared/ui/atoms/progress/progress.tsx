import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { FC, HTMLProps } from 'react';

interface ProgressProps extends Omit<HTMLProps<HTMLElement>, 'ref'> {}
export const Progress: FC<ProgressProps> = (props) => {
  return (
    <Box
      sx={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}
      {...props}
    >
      <CircularProgress />
    </Box>
  );
};
