// DraggableItem.js
import React from 'react';
import { useDrag } from 'react-dnd';
import { ListItem, ListItemText } from '@mui/material';
import DrosophilaFemale from '../assets/drosophila/FeMale.png'
import DrosophilaMale from '../assets/drosophila/Male.png'
import { ImageListItem } from '@mui/material';

const DraggableItem = ({ id, text, type }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: type,
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    // <ListItem
    //   ref={drag}
    //   sx={{ opacity: isDragging ? 0.5 : 1, cursor: 'grab' }}
    //   dense
    // >
    //   <ListItemText primary={text} />
    // </ListItem>

    <ImageListItem 
      ref={drag}
      sx={{ opacity: isDragging ? 0.5 : 1, cursor: 'grab' }}
    >
      <img
        src={type == "Male" ? DrosophilaFemale : DrosophilaMale}
        srcSet={type == "Male" ? DrosophilaFemale : DrosophilaMale}
        alt={text}
        loading="lazy"
      />
    </ImageListItem>
  );
};

export default DraggableItem;
