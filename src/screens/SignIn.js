import React, {useState, useRef} from 'react';
import {View, TextInput, Text, Alert, Platform, TouchableHighlight, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard} from 'react-native';
import { useDispatch } from 'react-redux';
import PhoneInput from "react-native-phone-number-input";
import { setLogin, setUsers } from '../redux/actions/usersActions';
import instance from '../config/axiosConfig';
import styles from '../components/Style';

const SignIn = (props) => {

    const dispatch = useDispatch();

    const {navigation} = props;
    const [phno, onChangePhno] = useState('');
    const [pswd, onChangePswd] = useState('');

    const phoneInput = useRef(null);

    const navigate = () => {
        navigation.navigate('SignUp');
      }

    const userSignIn = async () => {
      console.log("in signin")
      try{
            const params = JSON.stringify({
              phone: phno,
              password: pswd,
            });
            const response = await instance.post('users/auth', params);
            if(response.status === 201 || response.status === 200)
            {
              console.log(`User Signed In: ${JSON.stringify(response.data)}`);
              const profile = await instance.get('users/profile');
              if(profile)
              {
                const id = profile.data[0]._id;
                const name = profile.data[0].name;
                const avatar = profile.data[0].avatar;
                const uid = profile.data[0].uid;
                dispatch(setUsers({id: id, uid: uid, name: name, phone: phno, password: pswd, avatar: avatar}));
                dispatch(setLogin());
                Alert.alert('Successful Sign In', 'You have successfully signed in');
              }
              else
              {
                Alert.alert('Error while Sign In', 'There was an error while signing you in, please try again');
              }          
            }
            else
            {
              console.log(`User couldn't be signed in: ${JSON.stringify(response.data)}`);
              Alert.alert(
                "User couldn't be signed in",
                JSON.stringify(response.data),
                );
            }
      }
      catch(error){
          console.error(error.response.data.message)
          Alert.alert(
            'Error',
             error.response.data.message,
          );
      }
    } 

    const login = () => {

      const regPswd = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

      let checkValid = phoneInput.current?.isValidNumber(phno);
      console.log(checkValid)

      if(!checkValid)
        Alert.alert('Invalid Phone Number', 'Please enter a valid phone number');
      else if (!regPswd.test(pswd))
        Alert.alert('Invalid Password', 'Password must be of minimum eight characters, at least one letter, one number and one special character');
      else 
      {
        userSignIn(); 
      }
    };
    
    return (
    <>
      <View style={styles.container}>
        <View>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View>
                        <Text style={styles.title}>SIGN IN</Text>
                        <View style={styles.inputValues}>
                            <Text style={styles.userInputText}>PHONE NUMBER: </Text>
                            <PhoneInput
                              ref={phoneInput}
                              defaultValue={phno}
                              defaultCode="IN"
                              layout="first"
                              onChangeFormattedText={(text) => {
                                onChangePhno(text);
                              }}
                              withDarkTheme={true}
                          />
                        </View>
                        <View style={styles.inputValues}>
                            <Text style={styles.userInputText}>PASSWORD: </Text>
                            <TextInput
                            style={styles.input}
                            secureTextEntry={true}
                            onChangeText={onChangePswd}
                            placeholder="Enter Password"
                            placeholderTextColor="#a8a6a5" 
                            value={pswd}
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                        <TouchableHighlight onPress={login}>
                            <View style={styles.button}>
                            <Text style={styles. buttonText}>SIGN IN</Text>
                            </View>
                        </TouchableHighlight>
                        </View>
                        <View style={styles.navigate}>
                            <Text style={styles.navigateText} onPress={navigate}>New here?  Sign Up</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </View>
      </View>
    </>
  );
};

export default SignIn;
