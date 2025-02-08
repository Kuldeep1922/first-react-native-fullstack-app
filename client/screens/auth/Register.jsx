import { StyleSheet, Text, View, Alert } from 'react-native';
import React, { useState } from 'react';
import InputBox from "../../components/Forms/InputBox";
import SubmitButton from "../../components/Forms/SubmitButtom";
import axios from 'axios';

const Register = ({ navigation }) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        try {
            setLoading(true);

            // Validate fields
            if (!name || !email || !password) {
                Alert.alert("All fields are required!");
                setLoading(false);
                return;
            }

            // API request body
            const requestBody = {
                name,
                email,
                password,
            };

            // Use IP address for local server if needed (e.g., for Android emulator)
            const response = await axios.post('/auth/register', requestBody); // Changed to 10.0.2.2

            if (response.status === 200) {
                Alert.alert("Success", "Registration successful!");
                navigation.navigate('LogIn');
            } else {
                Alert.alert("Error", response.data.message || "Registration failed!");
            }

            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);

            // Handle error responses
            if (error.response) {
                Alert.alert("Error", error.response.data.message || "An error occurred during registration.");
            } else {
                Alert.alert("Error", "An unexpected error occurred.");
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Register</Text>
            <View style={styles.formContainer}>
                <InputBox
                    placeholder="Name"
                    value={name}
                    setValue={setName}
                />
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
                <SubmitButton
                    loading={loading}
                    btnTitle={"Register"}
                    onPress={handleSubmit}
                />
                <Text style={{ marginTop: "15" }}>
                    Already Registered? Please <Text style={styles.linkText} onPress={() => navigation.navigate("LogIn")}>Login</Text>
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
        color: "red",
        marginTop: "8",
        textDecorationLine: "underline"
    }
});

export default Register;
