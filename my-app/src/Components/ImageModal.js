import React, { useState } from 'react';
import { Box, Modal, Typography } from '@mui/material';
import WechatIcon from './WechatIcon';
import { IconButton } from '@mui/material';

function ImageModal(props) {
    const [open, setOpen] = useState(false);
  
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
      outline: 0
    };
  
    return (
      <div>
        {/* Thumbnail image */}
        { props.alt === "My Wechat QR Code" &&
        <IconButton onClick={handleOpen} sx={{ color: 'inherit', marginRight: 1 }}>
            <WechatIcon />
        </IconButton> }   
        { props.alt !== "My Wechat QR Code" && 
        <Box
            sx={{
            margin: '1em',
            border: '1px solid lightgrey',
            width: props.alt === "Wechat" ? '207px' : '307px',
            height: 207,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '8px',
            }}
        >
            <Box
            component="img"
            sx={{
                height: 200,
                width: 300,
                objectFit: 'cover',
                cursor: 'pointer',
                '&:hover': {
                opacity: 0.8
                },
                borderRadius: '8px',
            }}
            src={props.src}
            alt={props.alt}
            onClick={handleOpen}
            />
        </Box>}
  
        {/* Modal to display full image */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {props.alt}
            </Typography>
            <Box
              component="img"
              sx={{
                maxWidth: '100%',
                maxHeight: '100%'
              }}
              src={props.src}
              alt={props.alt}
            />
          </Box>
        </Modal>
      </div>
    );
  }

  export default ImageModal;