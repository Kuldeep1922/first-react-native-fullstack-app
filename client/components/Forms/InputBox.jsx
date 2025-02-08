import { StyleSheet, TextInput, View } from 'react-native';
import React from 'react';

const InputBox = ({
    placeholder,
    value,
    // onChangeText,
    setValue,
    keyboardType,
    secureTextEntry
}) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                value={value}
                // onChangeText={onChangeText}
                onChangeText={(text)=>setValue(text)}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
                autoCorrect={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%', // Ensures proper alignment inside parent container
        alignItems: 'center',
        marginBottom: 15, // Adds spacing between multiple input fields
    },
    input: {
        width: '90%', // Keeps input width slightly smaller than full width
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#ccc',
    },
});

export default InputBox;
