// DroppableTarget.js
import React from 'react';
import { useDrop } from 'react-dnd';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const DroppableTarget = ({ boxName, droppedItems }) => {

  // const backgroundColor = canDrop
  //   ? isOver
  //     ? 'lightblue'
  //     : 'lightgreen'
  //   : 'lightgray';

  return (
    <Box
      sx={{
        width: 200,
        height: 200,
        backgroundColor: 'lightgray',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 1,
        padding: 1,
      }}
    >
      <Typography variant="h6">{boxName}</Typography>
      <Typography>Drop here</Typography>
      <List>
        {droppedItems.map((item) => (
          <ListItem key={item.id} dense>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
export default DroppableTarget;
