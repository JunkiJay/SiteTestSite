import { useAppSelector } from '@app/model/root-store';
import { Stack, styled, Typography } from '@mui/material';
import { RANK_ICON } from '@widgets/widget-rank/constants';
import { selectRank } from '@entities/game/model';
import { ArrowSvg } from '@src/shared/ui';

const ArrowWrapper = styled('div')`
  display: flex;
  height: 8px;
  transform: rotate(180deg);
  justify-content: center;
  align-items: center;
  margin-right: 6px;

  & > svg {
    height: 8px;
  }
`;

export const WidgetRank = () => {
  const rank = useAppSelector(selectRank);
  const RankIcon = RANK_ICON[rank];

  return (
    <Stack direction="row" spacing={1} alignItems="center" sx={{ zIndex: 1 }}>
      <RankIcon />
      <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
        <Stack direction="row" alignItems="center" justifyContent="center">
          <ArrowWrapper>
            <ArrowSvg />
          </ArrowWrapper>
          <Typography alignItems="center">{rank}</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};
