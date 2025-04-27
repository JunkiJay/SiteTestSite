import { styled, Typography } from '@mui/material';
import { FC, memo } from 'react';
import { useAppSelector } from '@app/model/root-store';
import { selectEnergy, selectEnergyPercent, selectMaxEnergy } from '@entities/game/model';

const Wrapper = styled('div')`
  position: absolute;
  height: 80%;
  right: 20px;
  top: 0;
`;

const EnergyTrack = styled('div')`
  //TODO theme variables
  width: 13px;
  height: 100%;
  border: 1px solid #373737;
  background: rgb(129, 129, 131);
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  position: relative;
`;

const Energy = styled('div')`
  background: linear-gradient(0deg, #cc0909 8.22%, #f58a0b 27.88%, #feff59 47.13%, #1fdc6b 75.5%);
  width: 11px;
  height: 100%;
  border-radius: 20px;
`;

const EnergyOverlay = styled('div')<{ energy: number }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 11px;
  background: rgb(129, 129, 131);
  height: 100%;
  transform: translateY(-${(props) => props.energy}%);
`;

const EnergyValue = styled(Typography)`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
`;

export const EnergyBar: FC = memo(() => {
  const energy = useAppSelector(selectEnergy);
  const energyPercent = useAppSelector(selectEnergyPercent);
  const maxEnergyReserve = useAppSelector(selectMaxEnergy);

  return (
    <Wrapper>
      <EnergyTrack>
        <EnergyOverlay energy={energyPercent} />
        <Energy />
      </EnergyTrack>
      <EnergyValue>
        {energy}&nbsp; /&nbsp;{maxEnergyReserve}
      </EnergyValue>
    </Wrapper>
  );
});
