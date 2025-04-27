import { PageTemplate } from '@shared/ui/templates';
import { Stack } from '@mui/material';
import { useAppSelector } from '@app/model';
import { selectBoosts } from '@entities/game/model';
import { PanelBoost } from '@src/entities/game/ui';

export const BoostPage = () => {
  const boosts = useAppSelector(selectBoosts);

  return (
    <PageTemplate header="Boost" withBackButton>
      <Stack spacing={2}>
        {Object.values(boosts).map((boost) => (
          <PanelBoost key={boost.type} {...boost} />
        ))}
      </Stack>
    </PageTemplate>
  );
};
