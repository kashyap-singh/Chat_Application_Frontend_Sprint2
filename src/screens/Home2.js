import React from 'react';
import {View, Text,TouchableHighlight, Alert} from 'react-native';
import { useDispatch } from 'react-redux';
import { setLogout } from '../redux/actions/usersActions';
import instance from '../config/axiosConfig';
import styles from '../components/Style';

const Home2 = () => {

  const dispatch = useDispatch();

  const logout = async () =>{
    console.log("in logout")
        try{
          const response = await instance.post('logout');
          if(response.status === 201 || response.status === 200)
          {
            console.log(`User Signed out: ${response.data}`);
              dispatch(setLogout());
              Alert.alert('Successful Sign Out', 'You have successfully signed out');
          }
          else
          {
            console.log(`User couldn't be signed out: ${response.data}`);
            Alert.alert(
              "User couldn't be signed out",
              "There was an error while signing out, please try again",
              );
          }
        }
        catch (error) {
            if (error.response) {
                const error = error.response.data;
                Alert.alert('Error', error, );
            } else if (error.request) {
                Alert.alert('Error', error.request, );
                console.log(error.request);
            } else {
                console.log('Error', error.message);
                Alert.alert('Error', error.message, );
            }
        }
  }

  return (
   <View style={styles.container}>
        <Text style={styles.title}>HOME 2</Text>
        <TouchableHighlight onPress={logout}>
            <View style={styles.button}>
            <Text style={styles. buttonText}>SIGN OUT</Text>
            </View>
        </TouchableHighlight>
   </View>
  );
};

export default Home2;