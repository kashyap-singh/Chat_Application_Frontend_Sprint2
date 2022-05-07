import { ActionTypes } from "../constants/action-types";


export const setUsers = (user) => {
    return {
        type: ActionTypes.SET_USER,
        payload: user
    }
}

export const setLogin = (user) => {
    return {
        type: ActionTypes.SET_LOGIN,
        payload: user
    }
}

export const setLogout = (user) => {
    return {
        type: ActionTypes.SET_LOGOUT,
        payload: user
    }
}

export const setName = (name) => {
    return {
        type: ActionTypes.SET_NAME,
        payload: name
    }
}

export const setAvatar = (avatar) => {
    return {
        type: ActionTypes.SET_AVATAR,
        payload:avatar
    }
}