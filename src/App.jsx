import DraggableItem from './components/DraggableItem';
import DroppableTarget from './components/DroppableTarget';
// App.js
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Container, List, Typography, Box } from '@mui/material';
import Button from '@mui/material/Button';

const initialItems = [
  { id: 1, text: 'Male A1', type: 'Male' },
  { id: 2, text: 'Female B1', type: 'Female' },
  { id: 3, text: 'Male A2', type: 'Male' },
  { id: 4, text: 'Female B2', type: 'Female' },
  { id: 5, text: 'Male A3', type: 'Male' },
  { id: 6, text: 'Female B3', type: 'Female' }
];

const App = () => {
  const [items, setItems] = useState(initialItems);
  const [droppedItemsA, setDroppedItemsA] = useState([]);
  const [droppedItemsB, setDroppedItemsB] = useState([]);

  const resetItems = () => {
    setItems(initialItems);
    setDroppedItemsA([]);
    setDroppedItemsB([]);
  };

  const handleDrop = (boxName, itemId) => {
    const droppedItem = items.find((item) => item.id === itemId);
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    if (boxName === 'Female' && droppedItemsA.length < 1) {
      setDroppedItemsA((prevItems) => [...prevItems, droppedItem]);
    } else if (boxName === 'Male' && droppedItemsB.length < 1) {
      setDroppedItemsB((prevItems) => [...prevItems, droppedItem]);
    } else {
      setItems((prevItems) => [...prevItems, droppedItem]);
    }
  };

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Container maxWidth="sm">
          <Typography variant="h4" gutterBottom>
            React DND with Material-UI
          </Typography>

          <Box display="flex" justifyContent="space-between" mb={2}>
            <DroppableTarget
              boxName="Drop Female Here"
              acceptedTypes={['Female']}
              onDrop={(itemId) => {
                if (droppedItemsA.length < 1) {
                  console.log('droppedItemsA: ', droppedItemsA.length);
                  handleDrop('Female', itemId);
                }
              }}
              droppedItems={droppedItemsA}
            />
            <DroppableTarget
              boxName="Drop Male Here"
              acceptedTypes={['Male']}
              onDrop={(itemId) => {
                if (droppedItemsB.length < 1) {
                  console.log('droppedItemsB: ', droppedItemsB.length);
                  handleDrop('Male', itemId);
                }
              }}
              droppedItems={droppedItemsB}
            />
          </Box>

          <Box mb={2} display="flex" justifyContent="end">
            <Button variant="outlined" onClick={resetItems}>
              Reset Items
            </Button>
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
      <>
        <p>Status Variable</p>
        <p>items: {JSON.stringify(items)}</p>
        <p>droppedItemsA: {JSON.stringify(droppedItemsA)}</p>
        <p>droppedItemsB: {JSON.stringify(droppedItemsB)}</p>
      </>
    </>
  );
};

export default App;