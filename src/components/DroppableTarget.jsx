import React from 'react';
import { useDrop } from 'react-dnd';
import { Box, Typography } from '@mui/material';

const DroppableTarget = ({ boxName, onDrop, canDrop, itemText }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'item',
    drop: (item) => {
      if (canDrop) {
        onDrop(item.id);
      }
    },
    collect: (monitor) => ({
        isOver: monitor.isOver(),
    }),
    canDrop: () => canDrop,
  }));

  return (
    <Box
      ref={drop}
      sx={{
        width: 200,
        height: 200,
        backgroundColor: isOver ? 'lightblue' : 'lightgray',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 1,
        padding: 1,
      }}
    >
      <Typography variant="h6">{boxName}</Typography>
      {canDrop ? (
        itemText ? (
          <Typography>{itemText}</Typography>
        ) : (
          <Typography>Drop here</Typography>
        )
      ) : (
        <Typography>{itemText}</Typography>
      )}
    </Box>
  );
};

export default DroppableTarget;