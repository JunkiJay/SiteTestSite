import { forwardRef, useMemo } from 'react';
import { BottomNavigation, BottomNavigationAction, BottomNavigationProps, styled } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { BottomNavigationOwnProps } from '@mui/material/BottomNavigation/BottomNavigation';
import { NAVIGATION_ITEMS } from '../constants';
import { useHapticFeedback } from '@tma.js/sdk-react';

export interface NavProps extends BottomNavigationProps {}

const StyledBottomNavigation = styled(BottomNavigation)`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
  z-index: 1;
  width: 100%;
  height: max-content;
`;

const StyledBottomNavigationAction = styled(BottomNavigationAction)`
  height: 62px;
`;

export const AppNavigation = forwardRef<HTMLDivElement, NavProps>((props, ref) => {
  const location = useLocation();
  const navigate = useNavigate();
  const haptic = useHapticFeedback();

  const currentActiveNavItemIndex = useMemo(
    () =>
      NAVIGATION_ITEMS.findIndex((item) => {
        return item.path === location.pathname;
      }),
    [location.pathname],
  );

  const onChange: BottomNavigationOwnProps['onChange'] = (_, index) => {
    haptic.impactOccurred('medium');
    navigate(NAVIGATION_ITEMS[index].path);
  };

  return (
    <StyledBottomNavigation
      ref={ref}
      showLabels
      value={currentActiveNavItemIndex}
      onChange={onChange}
      sx={{ zIndex: 10 }}
      {...props}
    >
      {NAVIGATION_ITEMS.map(({ label, icon: Icon }) => (
        <StyledBottomNavigationAction key={label} label={label} icon={Icon} sx={{ zIndex: 10 }} />
      ))}
    </StyledBottomNavigation>
  );
});
