import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 


function Header({doSend, setIsOpen}) {
    return  <View style={styles.header}>
        <Text style={styles.headerTitle}>Photos</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity onPress={doSend} style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.moreButton} onPress={() => setIsOpen(true)}>
            <Ionicons name="ellipsis-horizontal" size={24} color="black" />
          </TouchableOpacity>
        </View>
    </View>
}

const styles = StyleSheet.create({
    header: {
        height: 60,
        backgroundColor: '#f8f8f8',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    sendButton: {
        padding: 10,
        marginRight:10,
        },
    sendButtonText: {
        fontSize: 16,
        color: '#007bff',
    },
    headerButtons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    moreButton: {
        padding: 10,
    },
});

export default Header;