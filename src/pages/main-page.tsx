import { WidgetRank } from '@widgets/widget-rank/ui';
import { PanelCurrentCompany } from '@widgets/widget-compnay-panel/ui/panel-current-company';
import { PageTemplate } from '@shared/ui/templates';
import { Box, Stack, styled } from '@mui/material';
import { ButtonMoney } from '@features/add-capital/ui';
import { EnergyBar } from '@shared/ui/molecules';
import { CapitalValue } from '@entities/game/ui';
import { AppNavigation } from '@src/widgets/widget-app-navigation/ui';
import { Button, TelegramSvg } from '@shared/ui';
import { useUtils } from '@tma.js/sdk-react';
import React from 'react';

const MainLayout = styled('div')`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: max-content max-content 1fr max-content;
  justify-items: center;
`;

const Info = styled('div')`
  margin: 44px 0;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: max-content max-content;
  justify-items: center;
  gap: 24px;
`;

const ContactUsButton = () => {
  const utils = useUtils();

  const onClick = () => {
    utils.openTelegramLink('https://t.me/carat_official');
  };

  return (
    <Button
      onClick={onClick}
      variant="text"
      sx={{ padding: 0, minWidth: 'unset', marginTop: '8px', position: 'absolute', zIndex: 1 }}
    >
      <TelegramSvg />
    </Button>
  );
};

export const MainPage = () => {
  return (
    <PageTemplate>
      <MainLayout>
        <Box mt="20px" width="100%">
          <PanelCurrentCompany />
          <ContactUsButton />
        </Box>
        <Info>
          <CapitalValue />
          <WidgetRank />
        </Info>
        <Box position="relative" width="100%" display="flex" justifyContent="center">
          <ButtonMoney />
          <EnergyBar />
        </Box>
        <Stack alignItems="center" mb="32px" width="100%">
          <AppNavigation />
        </Stack>
      </MainLayout>
    </PageTemplate>
  );
};
