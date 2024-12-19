import React, { useEffect, useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import Grid from '@mui/material/Grid2';
import {
  Autocomplete,
  Box,
  Button,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import { db } from '../../../firebase';
import SlotCard from './SlotCard';
import template from './template';
import characterdb from '../data/characters';
import weapondb from '../data/weapons';
import setdb from '../data/sets';

const images = import.meta.glob('../../../assets/gi/*.webp', { eager: true });

const Save = ({
  uid,
  isSaveOpen,
  setIsSaveOpen,
  isEditMode,
  myCharacters,
  setMyCharacters,
  newId,
  setNewId,
  newCharacter,
  setNewCharacter,
}) => {
  const [error, setError] = useState('');
  const [availableNames, setAvailableNames] = useState([]);

  // Update available names when myCharacters changes
  useEffect(() => {
    const characterNames = Object.values(characterdb).map(item => item.name);
    const notInMyCharacters = characterNames.filter(
      (item) => !Object.values(myCharacters).some((char) => char.name === item)
    );
    setAvailableNames(notInMyCharacters);
  }, [myCharacters]);

  // Validation before saving
  const validate = () => {
    const errors = [];
    // Types of errors
    if (!newCharacter.weapon) errors.push('No weapon selected');
    if (!newCharacter.set) errors.push('No artifact set selected');

    // Display error message
    if (errors.length) {
      setError(errors.join(', '));
      return false;
    }
    setError('');
    return true;
  };

  /* Save button */
  const handleSave = async () => {
    // Perform validation checks
    if (!validate()) return;

    // Update document in Firestore
    if (uid) {
      const characterDocRef = doc(db, 'users', uid, 'GenshinImpact', newId);
      await setDoc(characterDocRef, newCharacter, { merge: true });
    }

    // Update entry in myCharacters
    setMyCharacters((prevCharacters) => ({
      ...prevCharacters,
      [newId]: newCharacter,
    }));

    setError('');
    setNewId('');
    setIsSaveOpen(false);
  };

  // Cancel button handler
  const handleCancel = () => {
    setError('');
    setNewId('');
    setIsSaveOpen(false);
  };

  return (
    <Modal open={isSaveOpen} onClose={handleCancel}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: 4,
        borderRadius: 2,
        backgroundColor: '#1c1c1c',
      }}>
        {newId ? (
          <Grid container spacing={4} width='1000px'>
            <Grid size={6}>
              <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                {/* Select Character */}
                <Autocomplete
                  disablePortal
                  size='small'
                  value={newCharacter.name}
                  options={availableNames}
                  onChange={(event, newValue) => {
                    const words = newValue.replace(/'/g, '').split(' ');
                    const id = words.map(word => (
                      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                    )).join('');
                    setNewId(id);
                    setNewCharacter(({
                      ...template(),
                      name: newValue,
                    }));
                  }}
                  sx={{ width: 200, mr: 2}}
                  renderInput={(params) => <TextField {...params} label="Character" />}
                  disabled={isEditMode}
                />

                {/* Select Weapon */}
                <Autocomplete
                  disablePortal
                  size='small'
                  value={newCharacter.weapon}
                  options={weapondb}
                  sx={{ width: 200 }}
                  onChange={(event, newValue) => {
                    setNewCharacter((prev) => ({
                      ...prev,
                      weapon: newValue,
                    }));
                  }}
                  renderInput={(params) => <TextField {...params} label="Weapon" />}
                />
              </Box>

              {/* Image */}
              <Box sx={{
                position: 'relative',
                width: '100%',
                height: 500,
                overflow: 'hidden',
                mt: 2,
              }}>
                <img
                  src={images[`../../../assets/gi/${newId}.webp`]?.default}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </Box>
            </Grid>

            <Grid size={6}>
              <Autocomplete
                disablePortal
                size='small'
                value={newCharacter.set}
                options={setdb}
                sx={{ width: 200 }}
                onChange={(event, newValue) => {
                  setNewCharacter((prev) => ({
                    ...prev,
                    set: newValue,
                  }));
                }}
                renderInput={(params) => <TextField {...params} label="Artifact Set" />}
              />
              <Grid container spacing={2} mt={2}>
                {['Flower', 'Plume', 'Sands', 'Goblet', 'Circlet'].map(
                  (slotName, index) => (
                    <Grid size={6} key={slotName}>
                      <SlotCard
                        slotName={slotName}
                        slotIndex={index}
                        newId={newId}
                        newCharacter={newCharacter}
                        setNewCharacter={setNewCharacter}
                      />
                    </Grid>
                  )
                )}
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}>
            <Typography variant='h6' gutterBottom>
              Add character
            </Typography>
            <Autocomplete
              disablePortal
              size='small'
              value={newCharacter.name}
              options={availableNames}
              onChange={(event, newValue) => {
                const words = newValue.replace(/'/g, '').split(' ');
                const id = words.map(word => (
                  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                )).join('');
                setNewId(id);
                setNewCharacter(({
                  ...template(),
                  name: newValue,
                }));
              }}
              sx={{ width: 250, mb: 2 }}
              renderInput={(params) => <TextField {...params} label="Select" />}
            />
          </Box>
        )}

        {/* Error message */}
        {error && (
          <Typography variant="body2" color="error" sx={{ mt: 2, textAlign: 'center' }}>
            {error}
          </Typography>
        )}

        {/* Buttons Section */}
        <Box display="flex" justifyContent="center" gap={2} mt={2}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          
          <Button 
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={!newId}
          >
            Save
          </Button>
        </Box>
      </Box>      
    </Modal>
  );
};

export default Save;
