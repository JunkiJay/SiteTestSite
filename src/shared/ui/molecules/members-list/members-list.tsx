import { Member } from '@entities/company/types';
import React, { FC } from 'react';
import { Box, Stack, styled, Typography } from '@mui/material';
import { Panel } from '@shared/ui/atoms';

interface MembersListProps {
  members: Member[];
  title: string;
}

const Member = styled(Stack)`
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0 0 4px;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
`;

const Avatar = styled('div')`
  overflow: hidden;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);\
`;

const Img = styled('img')`
  width: 100%;
  height: 100%;
`;

export const MembersList: FC<MembersListProps> = ({ members, title }) => (
  <Panel role="list" elevation={1} sx={{ display: 'grid', overflowY: 'auto', gridTemplateRows: 'max-content 1fr' }}>
    <Typography variant="h2" mb={2}>
      {title}
    </Typography>
    <Box display="grid" gap="12px" sx={{ overflowY: 'scroll' }} gridAutoRows="max-content">
      {members.map(({ login, id, image = '' }) => (
        <Member key={id} direction="row" spacing={1} alignItems="center">
          <Avatar>
            <Img src={image} alt={login} />
          </Avatar>
          <Typography>{login}</Typography>
        </Member>
      ))}
    </Box>
  </Panel>
);
