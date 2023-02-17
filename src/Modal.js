import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

LinearProgressWithLabel.propTypes = {
    value: PropTypes.number.isRequired,
};

function Modal({ progress, resetApp }) {
    const [prog, setProg] = useState(0);

    useEffect(() => {
        if (progress <= 100) {
            setProg(progress);
        } else {
            resetApp();
            setProg(100);
        }
    }, [progress, resetApp]);

    return (
        <main className="pa4 black-80">
            <div className="measure">
                <Box sx={{ width: '100%' }}>
                    <LinearProgressWithLabel value={(prog) ? prog : 0} />
                </Box>
            </div>
        </main>
    )
}


function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

export default Modal;