'use client'
import Image from "next/image";
import { useState, useEffect } from 'react'
import { firestore } from '@/firebase'
import { Box, Modal, Typography, Stack, TextField, Button, IconButton } from "@mui/material"
import { collection, deleteDoc, doc, getDoc, query, getDocs, setDoc } from "firebase/firestore";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddIcon from '@mui/icons-material/Add';

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      });
    });
    setInventory(inventoryList);
  };

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }
    await updateInventory();
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }
    await updateInventory();
  };

  useEffect(() => {
    updateInventory();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={4}
      sx={{ backgroundColor: '#FFC0CB' }}
    >
      <Modal
        open={open} onClose={handleClose}>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          width={400}
          bgcolor="white"
          borderRadius="12px"
          boxShadow={24}
          p={4}
          display="flex"
          flexDirection="column"
          gap={3}
          sx={{
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#ffffff',
          }}
        >
          <Typography variant="h5" color="#4A90E2">Add New Item</Typography>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField
              variant='outlined'
              fullWidth
              value={itemName}
              onChange={(e) => {
                setItemName(e.target.value);
              }}
              placeholder="Enter item name"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                },
              }}
            />
            <IconButton
              color="primary"
              onClick={() => {
                addItem(itemName);
                setItemName('');
                handleClose();
              }}
            >
              <AddIcon />
            </IconButton>
          </Stack>
        </Box>
      </Modal>

      <Button
        variant="contained"
        color="primary"
        startIcon={<AddCircleOutlineIcon />}
        onClick={handleOpen}
        sx={{
          padding: '10px 20px',
          borderRadius: '12px',
          backgroundColor: '#4A90E2',
          '&:hover': {
            backgroundColor: '#357ABD',
          },
        }}
      >
        Add New Item
      </Button>

      <Box
        width="800px"
        border="1px solid #ccc"
        borderRadius="12px"
        overflow="hidden"
        boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
        sx={{ backgroundColor: '#ffffff' }}
      >
        <Box
          width="100%"
          height="100px"
          bgcolor="#4A90E2"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant='h4' color='#ffffff'>
            Inventory Items
          </Typography>
        </Box>

        <Stack
          width="100%"
          spacing={2}
          padding={2}
          maxHeight="300px"
          overflow="auto"
        >
          {inventory.map(({ name, quantity }) => (
            <Box
              key={name}
              width="100%"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              padding={2}
              borderRadius="8px"
              sx={{
                backgroundColor: '#F7F9FC',
                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
              }}
            >
              <Typography variant="h6" color="#333">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>

              <Typography variant="h6" color="#333">
                {quantity}
              </Typography>

              <Stack direction="row" spacing={1}>
                <IconButton color="primary" onClick={() => addItem(name)}>
                  <AddCircleOutlineIcon />
                </IconButton>
                <IconButton color="secondary" onClick={() => removeItem(name)}>
                  <RemoveCircleOutlineIcon />
                </IconButton>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>
      </Box>
  );
}
