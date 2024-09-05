import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  borderRadius: '10px',
  p: 4,
};

export default function CBCuploadModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button 
        onClick={handleOpen} 
        className="bg-ablue m-4 text-white hover:text-black"
        sx={{
          textTransform: 'none',
          borderRadius: '8px',
          padding: '8px 16px',
          '&:hover': {
            backgroundColor: '#0056b3',
            color: 'white',
          },
        }}
      >
        Upload CBC
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography id="modal-modal-title" variant="h6" component="h2" mb={2} textAlign="center">
            Upload ECG File
          </Typography>
          <input
            type="file"
            id="ecg-upload"
            style={{
              display: 'none',
            }}
          />
          <label htmlFor="ecg-upload">
            <Button
              component="span"
              sx={{
                display: 'block',
                width: '100%',
                borderRadius: '8px',
                padding: '8px 16px',
                backgroundColor: '#1976d2',
                color: 'white',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#0056b3',
                },
              }}
            >
              Choose File
            </Button>
          </label>
          <Button
            sx={{
              marginTop: 2,
              display: 'block',
              width: '100%',
              borderRadius: '8px',
              padding: '8px 16px',
              backgroundColor: '#1976d2',
              color: 'white',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#0056b3',
              },
            }}
          >
            Upload
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
