import { ArrowSvg, Button } from '@shared/ui/atoms';
import { Drawer, Stack, styled, Typography } from '@mui/material';
import { useUtils } from '@tma.js/sdk-react';
import { useFetchDictionariesQuery } from '@entities/dictionary/api';
import { useBoolean } from '@shared/libs';
import { EarnEvent } from '@entities/dictionary/types';
import { FC } from 'react';
import { useClaimRewardMutation } from '@entities/game/api';

const Reward = styled(Typography)`
  color: ${({ theme }) => theme.palette.success.main};
`;

const StyledButton = styled(Button)`
  padding: 16px;

  &:disabled {
    color: #fff;
    background-color: #181818;
  }
`;

const StyledDrawer = styled(Drawer)`
  padding: 16px;
  border-radius: 10px;
  overflow: hidden;
`;

export const EarnEvents = () => {
  const { data } = useFetchDictionariesQuery();

  return <Stack spacing={1}>{data?.earnEvents.map((event) => <Event key={event.id} {...event} />)}</Stack>;
};

const Event: FC<EarnEvent> = ({ link, title, id, reward, isCompleted }) => {
  const [claimReward, { isLoading }] = useClaimRewardMutation();
  const [isOpen, setIsOpen] = useBoolean();
  const utils = useUtils();

  const onClickEvent = (): void => {
    utils.openTelegramLink(link);
  };

  const onCheckEvent = async () => {
    await claimReward({ id, reward: Number(reward) });
    setIsOpen.off();
  };

  return (
    <>
      <StyledButton onClick={setIsOpen.on} variant="contained" color="secondary" disabled={isCompleted}>
        <Stack alignItems="flex-start" width="100%" spacing={2}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={0.5} width="100%">
            <Typography variant="subtitle1" sx={{ textAlign: 'start' }}>
              {title}
            </Typography>
            {isCompleted ? (
              <Typography
                color="white"
                sx={{ padding: '5px 10px', borderRadius: '4px', backgroundColor: '#0AB04C', textTransform: 'none' }}
              >
                done
              </Typography>
            ) : (
              <ArrowSvg />
            )}
          </Stack>
          <Reward variant="h1">$ {reward}</Reward>
        </Stack>
      </StyledButton>
      <StyledDrawer
        anchor="bottom"
        open={isOpen}
        onClose={setIsOpen.off}
        PaperProps={{ sx: { borderTopLeftRadius: 10, borderTopRightRadius: 10 } }}
      >
        <Stack p={4} gap={2} alignItems="center" justifyContent="center">
          <Typography variant="subtitle1">{title}</Typography>
          <Button variant="contained" onClick={onClickEvent} fullWidth>
            Join
          </Button>
          <Button variant="contained" onClick={onCheckEvent} fullWidth disabled={isLoading}>
            Check
          </Button>
        </Stack>
      </StyledDrawer>
    </>
  );
};
