import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const FooterMenu = () => {
    const navigation = useNavigation();
    const route = useRoute(); // Get current route

    // Define the active route and color logic
    const getIconColor = (screen) => (route.name === screen ? "black" : "white");

    return (
        <View style={styles.footer}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Home")}>
                <FontAwesome5 name="home" size={20} color={getIconColor("Home")} />
                <Text style={[styles.text, { color: getIconColor("Home") }]}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Post")}>
                <FontAwesome5 name="plus-square" size={20} color={getIconColor("Post")} />
                <Text style={[styles.text, { color: getIconColor("Post") }]}>Post</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("About")}>
                <FontAwesome5 name="info-circle" size={20} color={getIconColor("About")} />
                <Text style={[styles.text, { color: getIconColor("About") }]}>About</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Account")}>
                <FontAwesome5 name="user-circle" size={20} color={getIconColor("Account")} />
                <Text style={[styles.text, { color: getIconColor("Account") }]}>Account</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#6200ee',
        paddingVertical: 6,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: -2 },
        elevation: 5,
    },
    button: {
        alignItems: 'center',
        paddingVertical: 8,
        flex: 1,
    },
    text: {
        fontSize: 14,
        marginTop: 4,
        fontWeight: 'bold',
    },
});

export default FooterMenu;
