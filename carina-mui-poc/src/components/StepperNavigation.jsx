import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Box } from '@mui/material';

const steps = ['Shipping address', 'Payment details', 'Review your order'];

function StepperNavigation() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Box sx={{ mb: 4 }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

export default StepperNavigation;
