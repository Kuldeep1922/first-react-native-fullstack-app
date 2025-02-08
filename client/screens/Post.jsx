import React, { useContext, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet,
    Alert,
    ScrollView,
    KeyboardAvoidingView,
    Platform
} from "react-native";
import axios from "axios";
import { AuthContext } from "@/context/authContext";
import FooterMenu from "../components/Menus/FooterMenu";
import HeaderMenu from "../components/Menus/HeaderMenu";
import { PostContext } from "@/context/postContext";
import { useNavigation } from "@react-navigation/native";

const Post = () => {
    const [state] = useContext(AuthContext);
    const [posts, setPosts] = useContext(PostContext);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation()

    const handleCreatePost = async () => {
        if (!title || !description) {
            Alert.alert("Error", "Please fill in all fields.");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(
                "/post/create-post",
                { title, description },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${state.token}`,
                    },
                }
            );

            if (response.data.success) {
                setPosts([...posts, response?.data?.data])
                Alert.alert("Success", `Post created successfully!`);
                setTitle("");
                setDescription("");
                navigation.navigate("Home")
            } else {
                Alert.alert("Error", response.data.message);
            }
        } catch (error) {
            Alert.alert("Error", "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <HeaderMenu name="Create Post" />

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.formContainer}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter title"
                        value={title}
                        onChangeText={setTitle}
                    />

                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={styles.textArea}
                        placeholder="Enter description"
                        value={description}
                        onChangeText={setDescription}
                        multiline
                    />

                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleCreatePost}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.buttonText}>Create Post</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <FooterMenu />
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f9fa",
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        paddingBottom: 20, // Prevents overlap with FooterMenu
    },
    formContainer: {
        padding: 20,
        backgroundColor: "#fff",
        marginHorizontal: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 3,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
        color: "#333",
    },
    input: {
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 16,
        backgroundColor: "#fff",
        marginBottom: 15,
    },
    textArea: {
        height: 120,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingTop: 10,
        fontSize: 16,
        backgroundColor: "#fff",
        textAlignVertical: "top",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#007bff",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
    },
});

export default Post;
