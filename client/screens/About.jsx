import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthContext } from '@/context/authContext';
import FooterMenu from './../components/Menus/FooterMenu';
import HeaderMenu from './../components/Menus/HeaderMenu';

const About = () => {
    const [state] = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <HeaderMenu name={"About"} />
            <Text style={styles.stateText}>{JSON.stringify(state, null, 4)}</Text>
            <FooterMenu />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        // alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    stateText: {
        fontSize: 14,
        color: '#555',
    },
});

export default About;
