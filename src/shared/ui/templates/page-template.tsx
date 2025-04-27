import { FC, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBackButton } from '@tma.js/sdk-react';
import { Fade, styled, Typography } from '@mui/material';
import { Panel } from '@shared/ui';
import { PATHS } from '@src/pages';

interface PageTemplateProps {
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode | ReactNode[];
  withBackButton?: boolean;
}

const Header = styled('header')`
  padding: 20px 20px 0;
`;

const TitlePanel = styled(Panel)`
  margin: 0 0 24px;
`;

const Main = styled('main')`
  display: grid;
  grid-template-rows: 1fr;
  overflow: hidden;
  gap: 24px;
  padding: 0 20px;
`;

export const PageTemplate: FC<PageTemplateProps> = ({ header, footer, children, withBackButton }) => {
  const backButton = useBackButton();
  const navigate = useNavigate();

  useEffect(() => {
    if (withBackButton) {
      backButton.show();
    } else {
      backButton.hide();
    }

    const goBack = () => {
      navigate(PATHS.root);
    };
    backButton.on('click', goBack);

    return () => {
      backButton.off('click', goBack);
    };
  }, [navigate, withBackButton]);

  return (
    <>
      {header && (
        <Fade in timeout={500}>
          <Header>
            {typeof header === 'string' ? (
              <TitlePanel>
                <Typography variant="h2" textAlign="center">
                  {header}
                </Typography>
              </TitlePanel>
            ) : (
              header
            )}
          </Header>
        </Fade>
      )}
      <Fade in timeout={500}>
        <Main>{children}</Main>
      </Fade>
      {footer && (
        <Fade in timeout={500}>
          <footer>{footer}</footer>
        </Fade>
      )}
    </>
  );
};
