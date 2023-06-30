import React, { useState, useEffect } from 'react';
import { Text, View, Button, TextInput, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store'; // Persistenz Bibleothek

const PersistenceDemo = () => {
    const [data, setData] = useState('');
    const [inputText, setInputText] = useState('');

    useEffect(() => {
        // Beim Start der App versuchen, die gespeicherten Daten abzurufen
        loadData();
    }, []);

    const saveData = async () => {
        try {
            // Daten speichern
            await SecureStore.setItemAsync('myKey', inputText);
            console.log('Daten gespeichert.');
            loadData(); // Aktualisierte Daten abrufen
        } catch (error) {
            console.log('Fehler beim Speichern der Daten:', error);
        }
    };

    const loadData = async () => {
        try {
            // Gespeicherte Daten abrufen
            const result = await SecureStore.getItemAsync('myKey');
            if (result) {
                setData(result);
                setInputText(result);
                console.log('Daten abgerufen:', result);
            } else {
                console.log('Keine gespeicherten Daten gefunden.');
            }
        } catch (error) {
            console.log('Fehler beim Abrufen der Daten:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Gespeicherte Daten:</Text>
            <Text style={styles.data}>{data}</Text>
            <Text style={styles.label}>Neue Daten eingeben:</Text>
            <TextInput
                style={styles.input}
                value={inputText}
                onChangeText={setInputText}
            />
            <Button title="Daten speichern" onPress={saveData} />
            <Button title="Daten abrufen" onPress={loadData} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    data: {
        fontSize: 16,
        marginBottom: 16,
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 16,
        paddingHorizontal: 8,
    },
});

export default PersistenceDemo;
