import DraggableItem from './components/DraggableItem';
import DraggableImage from './components/DraggableImage';
import DroppableTarget from './components/DroppableTarget';

// App.js
import React, { useEffect, useState, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Container, List, Typography, Box, ImageListItem, ImageList} from '@mui/material';
import Button from '@mui/material/Button';

import DrosophilaFemale from './assets/drosophila/FeMale.png'
import DrosophilaMale from './assets/drosophila/Male.png'

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
  const [activeBox, setActiveBox] = useState(null);
  const [activeItemId, setActiveItemId] = useState(null);

  const resetItems = () => {
    setItems(initialItems);
    setDroppedItemsA([]);
    setDroppedItemsB([]);
  };

  useEffect(() => {
    const droppedItem = items.find((item) => item.id === activeItemId);
    if (activeBox === 'Female' && droppedItemsA.length < 1) {
      setItems((prevItems) => prevItems.filter((item) => item.id !== activeItemId));
      setDroppedItemsA((prevItems) => [...prevItems, droppedItem]);
    } else if (activeBox === 'Male' && droppedItemsB.length < 1) {
      setItems((prevItems) => prevItems.filter((item) => item.id !== activeItemId));
      setDroppedItemsB((prevItems) => [...prevItems, droppedItem]);
    }
  }, [activeBox, activeItemId])

  const handleDrop = useCallback((boxName, itemId) => {
    
    setActiveBox(boxName);
    setActiveItemId(itemId);
  }, []);

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Container maxWidth="sm">
          <Typography variant="h4" gutterBottom>
            React DND with Material-UI
          </Typography>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <DroppableTarget
              boxName="Drop Male Here"
              acceptedTypes={['Male']}
              onDrop={(itemId) => {
                handleDrop('Male', itemId)
              }}
              droppedItems={droppedItemsB}
            />
            <DroppableTarget
              boxName="Drop Female Here"
              acceptedTypes={['Female']}
              onDrop={(itemId) => {
                handleDrop('Female', itemId)
              }}
              droppedItems={droppedItemsA}
            />
          </Box>

          <Box mb={2} display="flex" justifyContent="end">
            <Button variant="outlined" onClick={resetItems}>
              Reset Items
            </Button>
          </Box>

          <List>
            {/* {items.map((item) => (
              <DraggableItem
                key={item.id}
                id={item.id}
                text={item.text}
                type={item.type}
              />
            ))} */}
            <ImageList sx={{ height: 100 }} cols={5}>
              {items.map((item) => (
                <DraggableImage
                  key={item.id}
                  id={item.id}
                  text={item.text}
                  type={item.type}
                />
              ))}
            </ImageList>
          </List>

        </Container>
      </DndProvider>
      {/* <>
        <p>Status Variable</p>
        <p>items: {JSON.stringify(items)}</p>
        <p>items Lenght: {items.length}</p>
        <p>droppedItemsA: {JSON.stringify(droppedItemsA)}</p>
        <p>items Lenght: {droppedItemsA.length}</p>
        <p>droppedItemsB: {JSON.stringify(droppedItemsB)}</p>
        <p>items Lenght: {droppedItemsB.length}</p>
      </> */}
    </>
  );
};

export default App;