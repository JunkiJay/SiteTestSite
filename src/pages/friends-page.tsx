import { PageTemplate } from '@shared/ui/templates';
import { Stack, styled, Typography } from '@mui/material';
import { MembersList } from '@shared/ui/molecules';
import { Panel } from '@src/shared/ui/atoms';
import { useFetchAccountDataQuery } from '@entities/account/api';
import { useHapticFeedback, useUtils } from '@tma.js/sdk-react';
import { useAppSelector } from '@app/model';
import { selectUserId } from '@entities/telegram/model';
import { INVITE_TEXT } from '@shared/constants';

const Wrapper = styled('div')`
  display: grid;
  grid-template-rows: max-content 1fr;
  gap: 16px;
  padding: 0 0 16px;
  overflow-y: auto;
`;

const Tittle = styled(Typography)`
  margin-bottom: 16px;
`;

const Number = styled(Typography)`
  font-family: Nunito, sans-serif;
`;

export const FriendsPage = () => {
  const utils = useUtils();
  const userId = useAppSelector(selectUserId);
  const haptic = useHapticFeedback();
  const { data } = useFetchAccountDataQuery();

  const onInviteFriend = () => {
    haptic.impactOccurred('medium');
    utils.shareURL(`https://t.me/${env.__BOT_NAME__}?start=${userId}`, INVITE_TEXT);
  };

  return (
    <PageTemplate header="Friends" withBackButton>
      <Wrapper>
        <Stack spacing={2}>
          <Panel elevation={1} role="button" onClick={onInviteFriend}>
            <Tittle variant="subtitle1" mb={4}>
              Invite friends and get:
            </Tittle>
            <Number color="success.main" variant="h1">
              $ 1000
            </Number>
          </Panel>

          <Panel onClick={onInviteFriend}>
            <Tittle variant="subtitle1" mb={4}>
              Invite friends with premium and get:
            </Tittle>
            <Number color="success.main" variant="h1">
              $ 5000
            </Number>
          </Panel>
        </Stack>
        <MembersList title="Friends:" members={data?.friends ?? []} />
      </Wrapper>
    </PageTemplate>
  );
};
