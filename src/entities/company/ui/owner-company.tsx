import React, { FC } from 'react';
import { Avatar, Box, Stack, Typography } from '@mui/material';
import { ArrowSvg, Button, Link, Progress } from '@shared/ui/atoms';
import { MembersList } from '@shared/ui/molecules';
import { formatLongNumber } from '@shared/libs';
import { useFetchCompanyQuery } from '@entities/company/api';
import { styled } from '@mui/material/styles';
import { INVITE_TEXT } from '@shared/constants';
import { useUtils } from '@tma.js/sdk-react';
import { useAppSelector } from '@app/model';
import { selectUserId } from '@entities/telegram/model';

interface OwnerCompanyProps {
  id: string;
}

const Root = styled(Box)`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: max-content 1fr;
  grid-gap: 16px;
  overflow-y: auto;
  margin: 20px 0;
`;

const ButtonStyled = styled(Button)`
  text-align: left;
  padding: 16px;
  justify-content: flex-start;

  & > h2 {
    margin-right: 16px;
  }
`;

export const OwnerCompany: FC<OwnerCompanyProps> = ({ id }) => {
  const { data, isFetching } = useFetchCompanyQuery(id);
  const userId = useAppSelector(selectUserId);
  const utils = useUtils();

  const onInviteFriend = () => {
    utils.shareURL(`https://t.me/${env.__BOT_NAME__}?start=${userId}`, INVITE_TEXT);
  };

  if (isFetching) {
    return <Progress />;
  }

  if (!data) {
    return <Box>Company not Exist</Box>;
  }

  const { name, members, image, earned } = data;

  return (
    <Root>
      <Stack spacing={1} alignItems="center">
        <Avatar src={image} />

        <Typography variant="h6">{name}</Typography>
        <Typography variant="subtitle2" color="primary">
          $ {formatLongNumber(earned)}
        </Typography>

        <ButtonStyled component={Link} to="edit" variant="contained" color="secondary" fullWidth>
          <Typography variant="h2">Settings</Typography> <ArrowSvg />
        </ButtonStyled>
        <ButtonStyled variant="contained" color="secondary" fullWidth onClick={onInviteFriend}>
          <Typography variant="h2">Invation Link</Typography> <ArrowSvg />
        </ButtonStyled>
      </Stack>
      <MembersList members={members} title="Members:" />
    </Root>
  );
};
