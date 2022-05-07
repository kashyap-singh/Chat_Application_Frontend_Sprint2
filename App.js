import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './src/redux/store';
import { useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {View} from 'react-native';

import SignUp from './src/screens/SignUp';
import SignIn from './src/screens/SignIn';
import Home from './src/screens/Home';
import Home2 from './src/screens/Home2';
import Profile from './src/screens/Profile'

const Stack = createNativeStackNavigator();
const MainTab = createMaterialTopTabNavigator();

const StartUpStackNavigator = props => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  );
}

const MainTabNavigator = props => {

  return (
    <MainTab.Navigator
      initialRouteName="Personal Chats" screenOptions={{
          "tabBarActiveTintColor": "#fff",
          "tabBarShowIcon": true,
          "tabBarLabelStyle": {
            "fontWeight": "bold"
          },
          "tabBarIndicatorStyle": {
            "backgroundColor": "#fff",
            "height": 4
          },
          "tabBarStyle": {
            "backgroundColor": "#B983FF"
          }
      }}>
      <MainTab.Screen name="Personal Chats" component={TabOneNavigator} />
      <MainTab.Screen name="Group Chats" component={TabTwoNavigator}/>
      <MainTab.Screen name="Profile" component={Profile}/>
    </MainTab.Navigator>
  );
}

const TabOneStack = createNativeStackNavigator();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator screenOptions={{headerShown: false}}>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={Home}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createNativeStackNavigator();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator screenOptions={{headerShown: false}}>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={Home2}
      />
    </TabTwoStack.Navigator>
  );
}


const ChatStackNavigator = props => {
  return (
    <Stack.Navigator  screenOptions={{
     headerShown: true,
      headerStyle: {
        backgroundColor: "#B983FF",
      },
      headerTintColor: "#fff",
      headerTitleAlign: "left",
      headerTitleStyle: {
        fontWeight:"bold",
      }
      }}>
      <Stack.Screen name="Home" component={MainTabNavigator} 
       options={{ 
         title:"ChatterBox",
         headerRight: () => (
          <View style={{
            flexDirection: 'row',
            width: 60,
            justifyContent: 'space-between',
            marginRight: 10,
          }}>
            <MaterialCommunityIcons name="magnify" size={22} color={'white'} />
            <MaterialCommunityIcons name="dots-vertical" size={22} color={'white'} />
          </View>
         )
       }}/>
    </Stack.Navigator>
  );
};

const AppNavigator = () => {

  const user = useSelector(state => state.chatuser.isLogin);
  console.log(user);

  return (
    <NavigationContainer>
        {
          !user ?
          <StartUpStackNavigator /> :
          <ChatStackNavigator />
        }
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppNavigator/>
      </PersistGate>
    </Provider>
  );
};

export default App;
