import React, { useState } from 'react';
import { Box, Grid, Paper, Button, Stepper, Step, StepLabel } from '@mui/material';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';  // Import left arrow icon
import ShippingAddressForm from './components/ShippingAddressForm';
import SummaryPanel from './components/SummaryPanel';

function App() {
  const steps = ['Shipping Address', 'Payment Details', 'Order Review'];
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevStep) => prevStep + 1);
    } else {
      console.log('Place order clicked!');
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevStep) => prevStep - 1);
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#121212',
      }}
    >
      <Grid container spacing={3} sx={{ width: '90%', height: '100%' }}>
        
        <Grid item xs={12} md={4}>
          <SummaryPanel />
        </Grid>

       
        <Grid item xs={12} md={8}>
          <Paper elevation={12} sx={{ p: 4 }}>
            
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label, index) => (
                <Step key={index}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            
            {activeStep === 0 && <ShippingAddressForm />}
            

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button
                variant="outlined"
                startIcon={<ChevronLeftRoundedIcon />}
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                Previous
              </Button>
              <Button
                variant="contained"
                endIcon={<ChevronRightRoundedIcon />}
                onClick={handleNext}
              >
                {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
