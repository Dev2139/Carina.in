import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';

function SummaryPanel() {
  const items = [
    { name: 'Product Price', price: '₹100' },
    { name: 'Shipping Charge', price: '₹80' },
    { name: 'Discount', price: '₹20' },
  ];

  const total = '₹160';

  return (
    <Box sx={{ color: 'white', p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Total
      </Typography>
      <Typography variant="h4" gutterBottom>
        {total}
      </Typography>
      <List>
        {items.map((item, index) => (
          <ListItem key={index} sx={{ py: 4, px: 0 }}>
            <ListItemText primary={item.name} />
            <Typography variant="body2">{item.price}</Typography>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ my: 2 }} />
    </Box>
  );
}

export default SummaryPanel;
