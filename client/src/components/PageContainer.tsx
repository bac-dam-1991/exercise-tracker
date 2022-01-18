import {Container, ContainerProps} from '@mui/material';

export interface PageContainerProps extends ContainerProps {}

export const PageContainer = ({
  maxWidth = 'md',
  children,
  sx,
  ...rest
}: PageContainerProps) => {
  return (
    <Container
      component={'main'}
      maxWidth={maxWidth}
      sx={{paddingTop: 5, ...sx}}
      {...rest}>
      {children}
    </Container>
  );
};
