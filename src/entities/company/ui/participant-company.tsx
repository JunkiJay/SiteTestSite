import React, { FC, MouseEventHandler } from 'react';
import { Avatar, Box, Stack, Typography } from '@mui/material';
import { formatLongNumber } from '@shared/libs';
import { Button, Progress } from '@shared/ui/atoms';
import { useFetchCompanyQuery, useJoinCompanyMutation, useLeaveCompanyMutation } from '@entities/company/api';
import { useAppSelector } from '@app/model';
import { selectIsCompanyMemberById, selectIsSomeCompanyMember } from '@entities/account/model';
import { MembersList } from '@shared/ui/molecules';
import { styled } from '@mui/material/styles';

interface ParticipantCompanyProps {
  id: string;
}

export const Root = styled(Box)`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: max-content 1fr max-content;
  grid-gap: 16px;
  overflow-y: auto;
`;

export const ParticipantCompany: FC<ParticipantCompanyProps> = ({ id }) => {
  const isSomeCompanyMember = useAppSelector(selectIsSomeCompanyMember);
  const isCurrentCompanyMember = useAppSelector((state) => selectIsCompanyMemberById(state, id));
  const { data, isFetching } = useFetchCompanyQuery(id);
  const [joinCompany, joinCompanyResult] = useJoinCompanyMutation();
  const [leaveCompany, leaveCompanyResult] = useLeaveCompanyMutation();

  if (isFetching) {
    return <Progress />;
  }

  if (!data) {
    return <Box>Company not Exist</Box>;
  }

  const { name, members, image, earned } = data;

  const onClickJoinCompany: MouseEventHandler<HTMLButtonElement> = () => {
    joinCompany(id);
  };

  const onClickLeaveCompany: MouseEventHandler<HTMLButtonElement> = () => {
    leaveCompany(id);
  };

  return (
    <Root>
      <Stack alignItems="center" spacing={1}>
        <Avatar src={image} />
        <Typography variant="h6">{name}</Typography>
        <div>Members: {members.length} </div>
        <Typography variant="subtitle2" color="primary">
          $ {formatLongNumber(earned)}
        </Typography>
      </Stack>
      <MembersList members={members} title="Members:" />
      <Stack spacing={2} width="100%">
        {isCurrentCompanyMember ? (
          <Button
            onClick={onClickLeaveCompany}
            variant="contained"
            fullWidth
            disabled={leaveCompanyResult.isLoading}
            color="error"
          >
            Leave
          </Button>
        ) : (
          <Button
            onClick={onClickJoinCompany}
            variant="contained"
            fullWidth
            disabled={isSomeCompanyMember || joinCompanyResult.isLoading}
          >
            Join
          </Button>
        )}
      </Stack>
    </Root>
  );
};
