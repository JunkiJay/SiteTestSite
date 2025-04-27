import { PageTemplate } from '@shared/ui/templates';
import { EarnEvents } from '@src/features/earn-by-events/ui';

export const EarnPage = () => {
  return (
    <PageTemplate withBackButton header="Earn">
      <EarnEvents />
    </PageTemplate>
  );
};
