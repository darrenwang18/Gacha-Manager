import React, { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import {
  Box,
  Button,
  MenuItem,
  Modal,
  Select,
  Typography,
} from '@mui/material';
import { db } from '../../../firebase';

/* Used for converting character names to ids */
function toPascalCase(str) {
  return str
    .replace(/'/g, '')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

const Add = ({
  uid,
  isAddOpen,
  setIsAddOpen,
  myCharacters,
  setMyCharacters,
  newId,
  setNewId,
  newCharacter,
  setNewCharacter,
}) => {
  const [error, setError] = useState('');

  const characterNames = ['Venti', 'Zhongli', 'Raiden Shogun', 'Nahida', 'Furina'];
  const weaponNames = ['Elegy for the End', 'Vortex Vanquisher', 'Engulfing Lightning', 'A Thousand Floating Dreams', 'Splendor of Tranquil Waters'];

  /* Handle character field inputs */
  const handleCharacterField = (e) => {
    const { name, value } = e.target;

    // Set the id if the field was the name
    if (name === 'name') {
      setNewId(toPascalCase(value));
    }
  
    // Check if the name refers to a nested property (e.g., 'weapon.name')
    if (name.includes('.')) {
      const [outerKey, innerKey] = name.split('.');  // e.g., 'weapon' and 'name'
  
      setNewCharacter((prevCharacter) => ({
        ...prevCharacter,  // Copy the outer object
        [outerKey]: {
          ...prevCharacter[outerKey],  // Copy the inner object (e.g., 'weapon')
          [innerKey]: value,           // Update the nested property
        },
      }));
    } else {
      // For non-nested properties, just update the property directly
      setNewCharacter((prevCharacter) => ({
        ...prevCharacter,  // Copy the outer object
        [name]: value,     // Update the property
      }));
    }
  };

  // Validation before saving
  const validate = () => {
    const errors = [];
    // Types of errors
    if (!newId) errors.push("No name selected");
    if (!newCharacter.weapon || !newCharacter.weapon.name) errors.push("No weapon selected");

    // Display message
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
    setIsAddOpen(false);
  };

  /* Cancel button */
  const handleCancel = () => {
    setError('');
    setNewId('');
    setIsAddOpen(false);
  };

  return (
    <Modal open={isAddOpen} onClose={handleCancel}>
      <Box
        sx={{
          backgroundColor: '#1c1c1c',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          {myCharacters.hasOwnProperty(newId) ? 'Edit Character' : 'Add New Character'}
        </Typography>

        <Typography variant="body1" sx={{ mt: 2 }}>
          Name
        </Typography>
        <Select
          fullWidth
          name="name"
          value={newCharacter.name || ""}
          onChange={handleCharacterField}
          displayEmpty
          disabled={myCharacters.hasOwnProperty(newId)}
        >
          <MenuItem value="" disabled style={{ color: 'gray' }}>
            (select)
          </MenuItem>
          {characterNames
            .filter(
              (item) =>
                !Object.values(myCharacters).some((char) => char.name === item)
            )
            .map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
        </Select>

        <Typography variant="body1" sx={{ mt: 2 }}>
          Constellation
        </Typography>
        <Select
          fullWidth
          name="constellation"
          value={newCharacter.constellation}
          onChange={handleCharacterField}
        >
          {[0, 1, 2, 3, 4, 5, 6].map((item) => (
            <MenuItem key={item} value={item}>
              {'C' + item}
            </MenuItem>
          ))}
        </Select>

        <Typography variant="body1" sx={{ mt: 2 }}>
          Weapon
        </Typography>
        <Select
          fullWidth
          name="weapon.name"
          value={newCharacter.weapon.name || ""}
          onChange={handleCharacterField}
          displayEmpty
        >
          <MenuItem value="" disabled style={{ color: 'gray' }}>
            (select)
          </MenuItem>
          {weaponNames.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>

        <Typography variant="body1" sx={{ mt: 2 }}>
          Refinement
        </Typography>
        <Select
          fullWidth
          name="weapon.refinement"
          value={newCharacter.weapon.refinement}
          onChange={handleCharacterField}
        >
          {[1, 2, 3, 4, 5].map((item) => (
            <MenuItem key={item} value={item}>
              {'R' + item}
            </MenuItem>
          ))}
        </Select>

        {/* error message */}
        {error && (
          <Typography
            variant="body2"
            color="error"
            sx={{ mt: 2, textAlign: 'center' }}
          >
            {error}
          </Typography>
        )}
        
        {/* buttons */}
        <Box display="flex" justifyContent="center" gap={2} mt={2}>
          <Button variant="outlined" color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default Add;
