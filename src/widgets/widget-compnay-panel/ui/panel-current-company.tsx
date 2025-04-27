import { FC } from 'react';
import { Button, Link } from '@shared/ui';
import { PATHS } from '@src/pages';
import { useAppSelector } from '@app/model/root-store';
import { Avatar, Box, ButtonProps, Stack, Typography } from '@mui/material';
import { ArrowSvg } from '@shared/ui/atoms';
import { styled } from '@mui/material/styles';
import { selectCurrentCompany } from '@entities/account/model';
import { formatLongNumber } from '@shared/libs';

interface PanelCurrentCompanyProps extends ButtonProps {}

const Root = styled(Box)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  width: 100%;
`;

const StyledButton = styled(Button)`
  width: 100%;
  height: 76px;
`;

export const PanelCurrentCompany: FC<PanelCurrentCompanyProps> = (props) => {
  const userCompany = useAppSelector(selectCurrentCompany);

  return (
    <Root>
      {userCompany ? (
        <StyledButton
          component={Link}
          to={`${PATHS.companies}/${userCompany.id}`}
          variant="contained"
          color="secondary"
          {...props}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar src={userCompany.image} alt={userCompany.name} />
            <Stack alignItems="flex-start">
              <Typography variant="h2">{userCompany.name}</Typography>
              <Typography>$ {formatLongNumber(userCompany.earned)}</Typography>
            </Stack>
          </Stack>
        </StyledButton>
      ) : (
        <Button
          component={Link}
          to={PATHS.companies}
          variant="contained"
          color="secondary"
          fullWidth
          sx={{ padding: '14px 0' }}
          {...props}
        >
          <Typography variant="h2" sx={{ margin: '0 16px 0 0' }}>
            Join The Company
          </Typography>
          <ArrowSvg />
        </Button>
      )}
    </Root>
  );
};
