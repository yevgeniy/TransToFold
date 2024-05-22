import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,
  TouchableWithoutFeedback,
   FlatList, Image } from 'react-native';


function MoreModal({setIsOpen, doReset, doSelectAllAfter }) {
    return (
      <>
      <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      <View style={styles.modalContent}>
        <TouchableOpacity style={styles.modalButton} onPress={() => {
          doReset();
          setIsOpen(false);
        }}>
          <Text style={styles.modalButtonText}>Reset</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        {/* <TouchableOpacity style={styles.modalButton} onPress={() => {
          console.log('Date Range');
          setIsOpen(false);
        }}>
          <Text style={styles.modalButtonText}>Date Range</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.modalButton} onPress={() => {
          doSelectAllAfter();
          setIsOpen(false);
        }}>
          <Text style={styles.modalButtonText}>Select All After</Text>
        </TouchableOpacity>
      </View>
    </>
    );
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: '80%',
    justifyContent: 'center',
  },
  modalButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#007bff',
    borderRadius: 5,
    marginVertical: 5,
  },
  modalButtonText: {
    fontSize: 18,
    color:'white'
  },
})

export default MoreModal;