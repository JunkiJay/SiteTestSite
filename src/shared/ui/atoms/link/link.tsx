import { forwardRef, MouseEventHandler } from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useHapticFeedback } from '@tma.js/sdk-react';

interface LinkProps extends RouterLinkProps {}

const StyledRouterLink = styled(RouterLink)<LinkProps>``;
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(({ onClick, ...props }, ref) => {
  const haptic = useHapticFeedback();

  const handleClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    haptic.impactOccurred('medium');

    if (onClick) {
      onClick(e);
    }
  };

  return <StyledRouterLink ref={ref} onClick={handleClick} {...props} />;
});
