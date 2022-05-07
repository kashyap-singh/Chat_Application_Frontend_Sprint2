import { ActionTypes } from "../constants/action-types";

const initialState = {
    id: '',
    uid: '',
    name: '',
    phone:'',
    password: '',
    avatar: '',
    isLogin: false,
};

export const userReducer = (state = initialState, {type, payload}) => {
   
    switch (type) {

        case ActionTypes.SET_USER:
            console.log('in set user');
            console.log(payload);
            return { ...state, id:payload.id, uid:payload.uid, name:payload.name,
                 phone:payload.phone, password:payload.password, avatar:payload.avatar};

        case ActionTypes.SET_LOGIN:
            console.log('in set login');
            return { ...state, isLogin: true}
        
        case ActionTypes.SET_LOGOUT:
            console.log("in set logout");
            return { ...state, isLogin: false }
               
        case ActionTypes.SET_NAME:
            console.log('In Name Change')
            return { ...state, name: payload.name }

        case ActionTypes.SET_AVATAR:
            console.log('In Avatar Change')
            return { ...state, avatar: payload.avatar }
              
        default:
            return state;
    }
}