import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  DialogProps,
  Box,
} from '@mui/material';
import {LoadingButton} from '@mui/lab';

export interface ModalProps extends DialogProps {
  title: string;
  onCancel?: (() => void) | (() => Promise<void>);
  onConfirm?: (() => void) | (() => Promise<void>);
  onDiscard?: (() => void) | (() => Promise<void>);
  loading?: boolean;
  formId?: string;
}

export const Modal = ({
  title,
  maxWidth = 'sm',
  fullWidth = true,
  children,
  onCancel,
  onConfirm,
  onDiscard,
  formId,
  loading,
  ...rest
}: ModalProps) => {
  const containsForm = Boolean(formId);
  return (
    <Dialog maxWidth={maxWidth} fullWidth={fullWidth} {...rest}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Box sx={{py: 2}}>{children}</Box>
      </DialogContent>
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
            {(onConfirm || containsForm) && (
              <LoadingButton
                type={containsForm ? 'submit' : 'button'}
                variant='contained'
                color='primary'
                form={formId}
                onClick={onConfirm}
                loading={loading}>
                Confirm
              </LoadingButton>
            )}
          </Stack>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};
