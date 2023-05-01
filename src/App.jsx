import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Container, List, Typography, Box } from '@mui/material';
import DraggableItem from './components/DraggableItem';
import DroppableTarget from './components/DroppableTarget';

const initialItems = [
  { id: 1, text: 'Item A1', type: 'A' },
  { id: 2, text: 'Item B1', type: 'B' },
  { id: 3, text: 'Item A2', type: 'A' },
  { id: 4, text: 'Item B2', type: 'B' },
];

const App = () => {
  const [items] = useState(initialItems);
  const [boxAItem, setBoxAItem] = useState(null);
  const [boxBItem, setBoxBItem] = useState(null);

  const handleDrop = (boxName, itemId) => {
    console.log(`Dropped item ${itemId} in ${boxName}`);
  
    if (boxName === 'Box A') {
      if (boxAItem === null) {
        setBoxAItem(itemId);
      } else {
        setBoxAItem((prevBoxAItem) => {
            // Swap the previously dropped item with the new item
            const newItems = [...items];
            const prevItemIndex = newItems.findIndex(
              (item) => item.id === prevBoxAItem
            );
            const newItemIndex = newItems.findIndex(
              (item) => item.id === itemId
            );
            [newItems[prevItemIndex], newItems[newItemIndex]] = [
              newItems[newItemIndex],
              newItems[prevItemIndex],
            ];
            setItems(newItems);
            return itemId;
          }
        );
      }
    } else if (boxName === 'Box B') {
      if (boxBItem === null) {
        setBoxBItem(itemId);
      } else {
        setBoxBItem((prevBoxBItem) => {
          // Swap the previously dropped item with the new item
          const newItems = [...items];
          const prevItemIndex = newItems.findIndex(
            (item) => item.id === prevBoxBItem
          );
          const newItemIndex = newItems.findIndex(
            (item) => item.id === itemId
          );
          [newItems[prevItemIndex], newItems[newItemIndex]] = [
            newItems[newItemIndex],
            newItems[prevItemIndex],
          ];
          setItems(newItems);
  
          return itemId;
        });
      }
    }
  };
  

  const getItemText = (itemId) => {
    const item = items.find((item) => item.id === itemId);
    return item ? item.text : '';
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          React DND with Material-UI
        </Typography>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <DroppableTarget
            boxName="Box A"
            acceptedTypes={['A']}
            onDrop={(itemId) => handleDrop('Box A', itemId)}
            canDrop={!boxAItem}
            itemText={getItemText(boxAItem)}
          />
          <DroppableTarget
            boxName="Box B"
            acceptedTypes={['B']}
            onDrop={(itemId) => handleDrop('Box B', itemId)}
            canDrop={!boxBItem}
            itemText={getItemText(boxBItem)}
          />
        </Box>
        <List>
          {items.map((item) => (
            <DraggableItem
              key={item.id}
              id={item.id}
              text={item.text}
              type={item.type}
            />
          ))}
        </List>
      </Container>
    </DndProvider>
  );
};

export default App;
