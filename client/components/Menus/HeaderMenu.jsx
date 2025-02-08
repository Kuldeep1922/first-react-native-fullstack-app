import { AuthContext } from '@/context/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const HeaderMenu = ({ onLogout, name }) => {
    const [state, setState] = useContext(AuthContext)
    const handleLogOut = async () => {
        setState({ token: "", user: null })
        await AsyncStorage.removeItem("@auth")
        alert("Logut Successfyully")
    }

    return (
        <View style={styles.header}>
            {/* App Name (Centered) */}
            <Text style={styles.logo}>{name}</Text>

            {/* Logout Button (Right Side) */}
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogOut}>
                <FontAwesome5 name="sign-out-alt" size={20} color="white" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#6200ee', // Header background color
        paddingVertical: 12,
        paddingHorizontal: 2,
        // Shadow Effect
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5, // For Android
    },

    logo: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingLeft: 6,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'red',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 5,
    },
    logoutText: {
        color: 'white',
        fontSize: 16,
        marginLeft: 1, // Space between icon and text
        fontWeight: 'bold',
    },
});

export default HeaderMenu;
