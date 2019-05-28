import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TimerIcon from '@material-ui/icons/Timer'
import Tooltip from "@material-ui/core/Tooltip";

function DeadLineModal() {
    const [open, setOpen] = React.useState(false);

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    function getTime() {
        let today = new Date()
        let temp = today.getFullYear() + '-' + ((today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1)) + '-' + today.getDate() + 'T'
            + today.getHours() + ":" + today.getMinutes()
        console.log(temp)
        return temp
    }
    return (
        <div>
            <Tooltip title={'Set deadline for todo'}>
            <Button onClick={handleClickOpen}>
                <TimerIcon />
            </Button>
            </Tooltip>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Set deadline</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Set deadline for task
                    </DialogContentText>
                    <TextField
                        autoFocus
                        d="datetime-local"
                        type="datetime-local"
                        defaultValue= {
                            getTime()
                        }
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        finished
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default DeadLineModal;