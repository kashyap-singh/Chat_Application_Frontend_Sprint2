/* eslint-disable prettier/prettier */
import { StyleSheet} from 'react-native';
//container, SUtitle, SignUpinput,title,SPBCText,input buttonC
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  input: {
      borderWidth: 4,
      borderRadius:10,
      padding: 15,
      color: 'white',
      fontWeight: 'bold',
      fontSize:15,
      borderColor:'white',
      width:320,
  },
  signUpinput: {
    borderWidth: 2,
    borderRadius:10,
    color: 'white',
    borderColor:'white',
    fontSize:15,
    fontWeight: 'bold',
    width:333,
},
  title: {
    marginTop: 16,
    paddingTop: 20,
    color: 'white',
    textAlign: 'center',
    fontSize: 60,
    alignContent:'center',
    fontFamily:'Vogue',
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    borderRadius:20,
    marginLeft:50,
    marginRight:50,
  },
  buttonText: {
    color:'black',
    fontWeight: 'bold',
  },
  buttonContainer: {
      paddingTop:30,
      paddingBottom:5,
  },
  userInputText:{
    padding:5,
    color:'white',
    fontSize:15,
    alignItems:'center',
    fontWeight:'bold',
  },
  navigate:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      paddingTop: 15,
  },
  navigateText:{
      fontWeight:'bold',
      color:'white',
  },
  inputValues:{
      padding: 17,
  }
});

export default styles;
