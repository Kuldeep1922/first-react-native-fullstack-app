import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '@/screens/Home';
import Account from '@/screens/Account';
import About from '@/screens/About';
import Post from '@/screens/Post';
import Login from '@/screens/auth/Login';
import Register from '@/screens/auth/Register';
import { AuthContext } from '@/context/authContext';

const Stack = createNativeStackNavigator();

const ScreenMenu = () => {
    const [state] = useContext(AuthContext);
    const authUser = state?.user && state?.token;

    return (
        <Stack.Navigator initialRouteName={authUser ? 'Home' : 'LogIn'}>
            {authUser ? (<>

                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                <Stack.Screen name="Post" component={Post} options={{ headerShown: false }} />
                <Stack.Screen name="About" component={About} options={{ headerShown: false }} />
                <Stack.Screen name="Account" component={Account} options={{ headerShown: false }} />
            </>
            ) : (
                <>
                    <Stack.Screen name="LogIn" component={Login} options={{ headerShown: false }} />
                    <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
                </>
            )}
        </Stack.Navigator>
    );
};

export default ScreenMenu;
