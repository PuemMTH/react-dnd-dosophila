// DroppableTarget.js
import React, { useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { Box, Typography, List, ImageListItem, ImageList } from '@mui/material';
import DrosophilaFemale from '../assets/drosophila/FeMale.png';
import DrosophilaMale from '../assets/drosophila/Male.png';

const DroppableTarget = ({ boxName, acceptedTypes, onDrop, droppedItems }) => {
  // paramiter ids is used to update state of useDrop
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: acceptedTypes,
    drop: (item) => onDrop(item.id),
    canDrop: () => droppedItems.length == 0,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }), [droppedItems]);

  const backgroundColor = canDrop
    ? isOver
      ? 'lightblue'
      : 'lightgreen'
    : 'lightgray';

  return (
    <Box
      ref={drop}
      sx={{ width: 200, height: 200, backgroundColor: backgroundColor, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderRadius: 1, padding: 1 }}
    >
      <Typography variant="h6">{boxName}</Typography>
      <Typography>Drop here</Typography>
      <List>
        {/* {droppedItems.map((item) => (
          <ListItem key={item.id} dense>
            <ListItemText primary={item.text} />
          </ListItem>
        ))} */}
          {droppedItems.map((item) => (
            <ImageListItem key={item.id}>
              <img
                src={item.type == "Male" ? DrosophilaFemale : DrosophilaMale}
                srcSet={item.type == "Male" ? DrosophilaFemale : DrosophilaMale}
                alt={item.text}
                loading="lazy"
              />
            </ImageListItem>
          ))}
      </List>

    </Box>
  );
};
export default DroppableTarget;
