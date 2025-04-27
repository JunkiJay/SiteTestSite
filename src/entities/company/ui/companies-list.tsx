import React, { FC } from 'react';
import { Company } from '../types';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemButtonProps,
  ListItemIcon,
  ListItemText,
  ListProps,
  styled,
} from '@mui/material';
import { ArrowSvg } from '@shared/ui/atoms';
import { PATHS } from '@src/pages';

interface CompanyListItem {
  id: Company['id'];
  name: Company['name'];
  image?: Company['image'];
}
export interface CompaniesListProps {
  companies: CompanyListItem[];
}

const ListStyled = styled(List)<ListProps>`
  width: 100%;
  display: grid;
  overflow-y: scroll;
`;

export const CompaniesList: FC<CompaniesListProps> = ({ companies }) => {
  const navigate = useNavigate();

  const onClick: ListItemButtonProps['onClick'] = (event) => {
    navigate(`${PATHS.companies}/${event.currentTarget.dataset.id}`);
  };

  return (
    <ListStyled component="nav">
      {companies.map(({ id, image, name }) => (
        <ListItem key={id} disablePadding>
          <ListItemButton onClick={onClick} data-id={id}>
            <ListItemAvatar>
              <Avatar alt={name} src={image} />
            </ListItemAvatar>
            <ListItemText primary={name} />
            <ListItemIcon>
              <ArrowSvg />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
      ))}
    </ListStyled>
  );
};
