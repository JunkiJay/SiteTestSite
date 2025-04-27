import { styled } from '@mui/material/styles';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import { forwardRef, MouseEventHandler } from 'react';
import { useHapticFeedback } from '@tma.js/sdk-react';

interface ButtonProps extends MuiButtonProps {
  to?: string;
}

const StyledButton = styled(MuiButton)<ButtonProps>``;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ children, onClick, ...otherProps }, ref) => {
  const haptic = useHapticFeedback();

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    haptic.impactOccurred('medium');

    if (onClick) {
      onClick(e);
    }
  };
  return (
    <StyledButton ref={ref} onClick={handleClick} {...otherProps}>
      {children}
    </StyledButton>
  );
});
