import {
  Typography as MuiTypography,
  TypographyProps as MuiTypographyProps,
} from '@mui/material';
import {ReactElement, ReactNode} from 'react';

export type TypographyVariant =
  | 'page-title'
  | 'heading'
  | 'sub-heading'
  | 'body-text'
  | 'caption';

export interface TypographyProps {
  variant?: TypographyVariant;
  children: ReactNode;
}

export const TypographyVariantMap: ReadonlyMap<
  TypographyVariant,
  Pick<MuiTypographyProps, 'variant'>
> = new Map([
  ['page-title', {variant: 'h4'}],
  ['heading', {variant: 'h5'}],
  ['sub-heading', {variant: 'h6'}],
  ['body-text', {variant: 'body1'}],
  ['caption', {variant: 'caption'}],
]);

export const Typography = ({
  variant = 'body-text',
  children,
}: TypographyProps): ReactElement => {
  const muiProps = TypographyVariantMap.get(variant);

  return (
    <MuiTypography
      {...muiProps}
      variantMapping={{h4: 'h1', h5: 'h2', h6: 'h3'}}>
      {children}
    </MuiTypography>
  );
};
