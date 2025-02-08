import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';

const SubmitButton = ({ loading, onPress, btnTitle }) => {
    return (
        <TouchableOpacity
            style={[styles.button, loading && styles.disabledButton]}
            onPress={onPress}
            disabled={loading}
        >
            <Text style={styles.buttonText}>
                {loading ? "Please Wait..." : btnTitle}
            </Text>
        </TouchableOpacity>
    );
};

export default SubmitButton;

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#1e2225',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
        width: "70%",
    },
    disabledButton: {
        backgroundColor: '#555', // Light grey when disabled
        opacity: 0.7, // Reduce opacity
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
