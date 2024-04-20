import React, { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { FIREBASE_AUTH } from "../firebase-config";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/home";
import Plants from "./screens/plants";
import Login from "./screens/login";
import Register from "./screens/register";
import NewPlant from "./screens/new-plant";

const Stack = createStackNavigator();
const InsideStack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? "Inside" : "Login"}>
        {user ? (
          <Stack.Screen
            name="Inside"
            component={InsideStackScreen}
            options={{ presentation: "transparentModal", headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ presentation: "transparentModal", headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ presentation: "card", headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const InsideStackScreen = () => {
  return (
    <InsideStack.Navigator initialRouteName="Home">
      <InsideStack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <InsideStack.Screen name="My Plants" component={Plants} />
      <InsideStack.Screen
        name="Add new plant"
        component={NewPlant}
        options={{ presentation: "modal" }}
      />
    </InsideStack.Navigator>
  );
};
