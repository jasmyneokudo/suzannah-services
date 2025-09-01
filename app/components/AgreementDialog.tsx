import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


type DialogProps = {
  open: boolean;
  onClose: (e: React.MouseEvent<HTMLElement>) => void;
  liveIn: boolean;
};

export default function AgreementDialog(props: DialogProps) {

  return (
      <Dialog
        open={props.open}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={props.onClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className='text-sm'>{"Customer Service Policy (For Monthly Management Plan Users)"}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-slide-description"> */}
            <ol className='text-xs list-disc'>
                <li>At the end of each month, we will send you an invoice along with the company’s account number for payment. Please note that all payments should be made directly to the company and not to staff members.</li>
                <li>We periodically request feedback to ensure that you are satisfied with the service. Your input helps us maintain high standards and address any concerns quickly.</li>
                <li>If any issues arise, please contact us directly. Whether it’s performance concerns or misunderstandings, we are committed to resolving them promptly and professionally.</li>
                <li>Matters such as salary, employment terms, and other internal arrangements are strictly between the company and our staff. We kindly ask that these issues not be discussed directly with the staff. If there are any concerns, we encourage you to reach out to us directly so we can address them promptly and professionally.</li>
                <li>All staff are employed and managed directly by the company. If a replacement is needed, we will arrange one efficiently.</li>
                {props.liveIn && <li>Our off-days for live-in staff are the last weekend of every month but this is still subject to client preferences</li>}
            </ol>
            <p className="mt-3 text-sm text-gray-800 dark:text-gray-900">By clicking `PROCEED`, you agree to the above terms of service.</p>
          {/* </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose}>Cancel</Button>
          <Button onClick={props.onClose}>Proceed</Button>
        </DialogActions>
      </Dialog>
  );
}