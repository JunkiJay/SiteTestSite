import React from 'react';
import SmallDollarIcon from '@entities/game/assets/small-dollar.svg';
import { Box, styled, Typography } from '@mui/material';
import { useAppSelector } from '@app/model/root-store';
import { selectFormattedCapitalValue } from '@entities/game/model';

const Root = styled(Box)`
  display: flex;
  z-index: 1;
  align-items: center;
  position: relative;
`;

export const CAPITAL_ROOT_ID = 'capital-root';

export const CapitalValue = () => {
  const formattedCapital = useAppSelector(selectFormattedCapitalValue);

  return (
    <Root id={CAPITAL_ROOT_ID}>
      <SmallDollarIcon />
      &nbsp;
      <Typography variant="subtitle2" color="primary">
        {formattedCapital}
      </Typography>
    </Root>
  );
};
