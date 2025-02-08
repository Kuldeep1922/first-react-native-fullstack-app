import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, TextInput, Button, Alert, Image, TouchableOpacity } from "react-native";
import axios from "axios";
import { AuthContext } from "@/context/authContext";
import FooterMenu from "../components/Menus/FooterMenu";
import HeaderMenu from "../components/Menus/HeaderMenu";

const Account = () => {
    const handleLogOut = async () => {
        setState({ token: "", user: null })
        await AsyncStorage.removeItem("@auth")
        alert("Logut Successfyully")
    }
    const [state, setState] = useContext(AuthContext);
    const [name, setName] = useState(state?.user?.name || "");
    const [email, setEmail] = useState(state?.user?.email || "");
    const [role, setRole] = useState(state?.user?.role || "")
    const [password, setPassword] = useState("");

    // Function to handle user update
    const handleUpdate = async () => {
        try {
            // Retrieve token from context or AsyncStorage (depending on where you store it)
            const token = state?.token;

            if (!token) {
                Alert.alert("Error", "No token found. Please log in again.");
                return;
            }

            const response = await axios.put(
                "/auth/update-user",
                {
                    name,
                    email,
                    password: password || undefined, // Only send password if provided
                    role
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,  // Add token to headers
                    },
                }
            );

            // Update local state with the new user details
            setState({ ...state, user: response.data.user });
            handleLogOut();
            Alert.alert("Success", response.data.message);
        } catch (error) {
            console.error(error);
            Alert.alert("Error", error.response?.data?.message || "Something went wrong!");
        }
    };


    return (
        <SafeAreaView style={styles.container}>
            <HeaderMenu name="Account" />

            <View style={styles.content}>
                <Text style={styles.heading}>Profile Details</Text>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: "https://www.shareicon.net/data/512x512/2016/09/15/829459_man_512x512.png" }}
                        style={styles.profileImage}
                    />
                </View>
                <View style={styles.infoBox}>
                    <Text style={styles.label}>Name:</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                    />
                </View>

                <View style={styles.infoBox}>
                    <Text style={styles.label}>Email:</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        editable={false} // Keep email non-editable
                    />
                </View>

                <View style={styles.infoBox}>
                    <Text style={styles.label}>New Password:</Text>
                    <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        placeholder="Enter new password"
                    />
                </View>
                <View style={styles.infoBox}>
                    <Text style={styles.label}>New Role:</Text>
                    <TouchableOpacity
                        style={[styles.radioButton, role === "user" && styles.selectedRadio]}
                        onPress={() => setRole("user")}
                    >
                        <Text style={styles.radioText}>User</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.radioButton, role === "admin" && styles.selectedRadio]}
                        onPress={() => setRole("admin")}
                    >
                        <Text style={styles.radioText}>Admin</Text>
                    </TouchableOpacity>
                </View>

                <Button title="Update Profile" onPress={handleUpdate} color="green" />
            </View>

            <FooterMenu />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F9FA",
    },
    content: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
    },
    heading: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        color: "#333",
    },
    infoBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 8,
        marginBottom: 10,
        elevation: 3,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#555",
        flex: 1,
    },
    input: {
        flex: 2,
        fontSize: 16,
        color: "#333",
        borderBottomWidth: 1,
        borderColor: "#ccc",
        paddingVertical: 5,
    },
    imageContainer: {
        alignSelf: "center",
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor:"green"
    },
    radioButton: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        alignItems: "center",
        marginHorizontal: 5,
    },
    selectedRadio: {
        backgroundColor: "green",
        borderColor: "darkgreen",
    },
    radioText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
});

export default Account;


