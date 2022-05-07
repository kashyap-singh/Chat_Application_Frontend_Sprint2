import React,{useState} from "react";
import{
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    LogBox,
} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import ImagePicker from 'react-native-image-crop-picker';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from "react-native-reanimated";
import { TextInput } from "react-native-gesture-handler";
import updateProfile from "../components/UpdateProfile";
import {useSelector,useDispatch} from 'react-redux';
import {setName,setAvatar} from '../redux/actions/usersActions'

function Profile({navigation})
{

    LogBox.ignoreAllLogs();
    //const[image,setImage]=useState('https://i.pinimg.com/236x/73/8b/82/738b82ae3c1a1b793aa9a68d9b19439f.jpg');


    const{id,uid,name,phone,password,avatar,isLogin}=useSelector(state=>state.chatuser);
    
    // const profile = instance.get('users/profile');
    // if(profile)
    //           {
    //             const id = profile.data[0]._id;
    //             const name = profile.data[0].name;
    //             const avatar = profile.data[0].avatar;
    //             const uid = profile.data[0].uid;
    //           }
    const dispatch=useDispatch();
    //const[name,setName]=useState('Kashyap');
    const[newName,setNewName]=useState(name);

    const[isPicAvailabe,setIsPicAvailabe]=useState(true);

    const[snapPointValue,setSnapPointValue]=useState(420);

    bs=React.useRef(null);
    fall=new Animated.Value(1);

    const takePhotoFromCamera = () =>{
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
          }).then(image => {
            console.log(image);
            //setImage(image.path);
            updateProfile.changePhoto(phone,password,uid,image.path);
            dispatch(setAvatar(image.path))
            if(!isPicAvailabe)
            {
                setIsPicAvailabe(true);
                setSnapPointValue(420);
            }
            bs.current.snapTo(1)
          });
    }

    const choosePicFromLibrary = () =>{
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
          }).then(image => {
            console.log(image);
            //setImage(image.path);
            console.log(name);
            updateProfile.changePhoto(phone,password,uid,image.path);
            dispatch(setAvatar(image.path))
            if(!isPicAvailabe)
            {
                setIsPicAvailabe(true);
                setSnapPointValue(420);
            }
            bs.current.snapTo(1)
          });
    }

    const removeProfilePic = () =>{
        //setImage('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png');
        const newAvatar = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
        dispatch(setAvatar(newAvatar));
        updateProfile.changePhoto(phone,password,uid,newAvatar);
        setIsPicAvailabe(false);
        setSnapPointValue(380);
        bs.current.snapTo(1)
    }

    const renderInner = () =>(
        <View style={styles.panel}>

            <TouchableOpacity style={styles.panelButton} onPress={takePhotoFromCamera}>
                <Text style={styles.panelButtonTitle}>Take Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.panelButton} onPress={choosePicFromLibrary}>
                    <Text style={styles.panelButtonTitle}>Choose From Library</Text>
            </TouchableOpacity>

            {
                isPicAvailabe ? (<TouchableOpacity style={styles.panelButton} onPress={removeProfilePic}>
                    <Text style={styles.panelButtonTitle}>Remove Profile Photo</Text>
                </TouchableOpacity>) : (<></>)
            }

            
            <TouchableOpacity
                style={styles.panelButton}
                onPress={() => bs.current.snapTo(1)}>
                <Text style={styles.panelButtonTitle}>Cancel</Text>
            </TouchableOpacity>

        </View>
    )

    const renderHeader = () =>(
        <View style={styles.header}>
            <View style={styles.panelHeader}>
                <View style={styles.panelHandle}></View>
            </View>
        </View>
    )

    return(
        <View style={styles.mainContainer}>

            <BottomSheet
                ref={bs}
                snapPoints={[snapPointValue,0]}
                renderContent={renderInner}
                renderHeader={renderHeader}
                initialSnap={1}
                callbackNode={fall}
                enabledGestureInteraction={true}
            />
            <View style={styles.profileHeader}>
                <Image style={styles.image} source={{uri:avatar}}/>
                <TouchableOpacity onPress={()=>bs.current.snapTo(0)}>
                    <Text>Change Profile Picture</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.subContainer}>
                <Text style={styles.profileText}>Name</Text>

                <View style={styles.profileBody}>
                    <TextInput
                        style={styles.profileBody1}
                        placeholder={name}
                        onChangeText={(value)=>{setNewName(value)}}
                    />
                    <TouchableOpacity style={styles.iconStyle} onPress={()=>{dispatch(setName(newName));updateProfile.changeName(phone,password,uid,newName);alert('Name Changed!!!')}}>
                        <Icon name="floppy-o" size={30} color='#808e9b'/>
                    </TouchableOpacity>
                </View>

                <View>
                    <Text style={styles.profileText}>Phone Number</Text>
                    <Text style={[styles.profileBody,styles.profileBody1]}>{phone}</Text>
                </View>

            </View>

            <View style={styles.subContainer}>
                <TouchableOpacity style={styles.logoutButton}>
                    <Text style={styles.logoutButtonText}>{'Logout'}</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default Profile;

const styles=StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor:'black',
        justifyContent:'center',
        paddingTop:20,
    },
    profileHeader:{
        justifyContent:'center',
        alignItems:'center'
    },
    image:{
        borderColor: '#FFF',
        borderRadius: 85,
        borderWidth: 3,
        height: 170,
        marginBottom: 15,
        width: 170,
    },
    profileText:{
        color:'#fff',
        fontSize:20,
        marginTop:20,
        marginBottom:10
    },
    subContainer:{
        paddingHorizontal:20
    },
    profileBody:{
        width:'100%',
        height:50,
        backgroundColor:'#333',
        borderRadius:6,
        marginTop:10,
        paddingHorizontal:10,
        fontSize:16,
        color:'#808e9b',
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },
    iconStyle:{
        paddingTop:8
    },
    profileBody1:{
        fontSize:20,
        paddingTop:8
    },
    logoutButton:{
        backgroundColor:'#833471',
        paddingVertical:12,
        borderRadius:6,
        marginTop:20
    },
    logoutButtonText:{
        fontSize:20,
        fontWeight:'500',
        color:'#fafafa',
        alignSelf:'center'
    },
    panel: {
        padding: 20,
        backgroundColor: '#374144',
        paddingTop: 20
      },
    header: {
        backgroundColor: '#FFFFFF',
        paddingTop: 15,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: 50,
        height: 10,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },
    panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: '#83a6b0',
        alignItems: 'center',
        marginVertical: 7,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
})