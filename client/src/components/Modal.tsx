import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  DialogProps,
} from '@mui/material';
import {LoadingButton} from '@mui/lab';

export interface ModalProps extends DialogProps {
  title: string;
  onCancel?: (() => void) | (() => Promise<void>);
  onConfirm?: (() => void) | (() => Promise<void>);
  onDiscard?: (() => void) | (() => Promise<void>);
  loading?: boolean;
}

export const Modal = ({
  title,
  maxWidth = 'sm',
  fullWidth = true,
  children,
  onCancel,
  onConfirm,
  onDiscard,
  loading,
  ...rest
}: ModalProps) => {
  return (
    <Dialog maxWidth={maxWidth} fullWidth={fullWidth} {...rest}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Stack direction='row' sx={{width: '100%'}}>
          {onDiscard && (
            <LoadingButton
              variant='outlined'
              color='error'
              loading={loading}
              onClick={onDiscard}>
              Discard
            </LoadingButton>
          )}

          <Stack direction='row' spacing={2} sx={{marginLeft: 'auto'}}>
            {onCancel && (
              <LoadingButton
                variant='outlined'
                color='primary'
                loading={loading}
                onClick={onCancel}>
                Cancel
              </LoadingButton>
            )}
            {onConfirm && (
              <LoadingButton
                variant='contained'
                color='primary'
                loading={loading}
                onClick={onConfirm}>
                Confirm
              </LoadingButton>
            )}
          </Stack>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};
