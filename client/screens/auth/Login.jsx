import { StyleSheet, Text, View, Alert } from 'react-native';
import React, { useState, useContext } from 'react';
import InputBox from "../../components/Forms/InputBox";
import SubmitButton from "../../components/Forms/SubmitButtom";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '@/context/authContext'; // Correct import
import { useNavigation } from '@react-navigation/native';

const Login = () => {
    const navigation = useNavigation();
    const [state, setState] = useContext(AuthContext); // Access the auth state and setState function from context

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        try {
            setLoading(true);
            if (!email || !password) {
                Alert.alert("All fields are required");
                setLoading(false);
                return;
            }

            const requestBody = { email, password };

            const response = await axios.post('/auth/login', requestBody); // Ensure your API URL is correct

            if (response.status === 200) {
                Alert.alert("Success", "Login successful!");

                // Update the auth context with the response data (state and token)
                setState({
                    user: response.data.user,
                    token: response.data.token,
                });

                // Save data to AsyncStorage
                await AsyncStorage.setItem('@auth', JSON.stringify({
                    user: response.data.user,
                    token: response.data.token,
                }));

                // Navigate to Home after the state is updated
                navigation.navigate("Home");
            } else {
                Alert.alert("Error", response.data.message || "Login failed!");
            }

            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);

            if (error.response) {
                Alert.alert("Error", error.response.data.message || "An error occurred during login.");
            } else {
                Alert.alert("Error", "An unexpected error occurred.");
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Login</Text>
            <View style={styles.formContainer}>
                <InputBox
                    placeholder="Email"
                    value={email}
                    setValue={setEmail}
                    keyboardType="email-address"
                />
                <InputBox
                    placeholder="Password"
                    value={password}
                    setValue={setPassword}
                    secureTextEntry
                />
                <SubmitButton loading={loading} btnTitle="Login" onPress={handleSubmit} />
                <Text style={styles.linkText}>
                    Don't have an account? <Text style={styles.link} onPress={() => navigation.navigate("Register")}>Register</Text>
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e2d6ca',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    formContainer: {
        width: '100%',
        alignItems: 'center',
    },
    linkText: {
        marginTop: 15,
    },
    link: {
        color: 'red',
        marginTop: 8,
        textDecorationLine: 'underline',
    },
});

export default Login;
