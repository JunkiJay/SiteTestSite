import { Stack, styled, Typography } from '@mui/material';
import { ArrowSvg, Button } from '@shared/ui';
import { Boost } from '@entities/game/types';
import { FC } from 'react';
import { useLevelUpBoostMutation } from '@entities/game/api';
import { BOOST_ICON_BY_TYPE, BOOST_TITLE_BY_TYPE } from '@entities/game/constants/boost-icon-by-id';

interface BoostProps extends Boost {}

const StyledButton = styled(Button)`
  display: grid;
  grid-template-columns: max-content 1fr max-content;
  gap: 32px;
  padding: 16px;
`;

const IconWrapper = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 62px;
  width: 62px;
  border-radius: 10px;
  background: #101010;
`;

const StyledPrice = styled(Typography)`
  margin-right: 16px;
`;

const InfoWrapper = styled('div')`
  display: grid;
  grid-template-rows: repeat(2, max-content);
  gap: 8px;
`;

export const PanelBoost: FC<BoostProps> = ({ type, level, price }) => {
  const [levelUoBoost, { isLoading }] = useLevelUpBoostMutation();

  const onClickBoost = () => {
    levelUoBoost(type);
  };

  return (
    <StyledButton component={Stack} variant="contained" color="secondary" onClick={onClickBoost} disabled={isLoading}>
      <IconWrapper>{BOOST_ICON_BY_TYPE[type]}</IconWrapper>
      <InfoWrapper>
        <Typography variant="subtitle1">{BOOST_TITLE_BY_TYPE[type]}</Typography>
        <Stack direction="row">
          <StyledPrice color="primary">{price}</StyledPrice>

          <Typography sx={{ textTransform: 'none' }} variant="body1">
            {level} lvl.
          </Typography>
        </Stack>
      </InfoWrapper>
      <ArrowSvg />
    </StyledButton>
  );
};
