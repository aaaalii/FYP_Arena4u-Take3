import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    _id: '',
    username: '',
    phoneNumber: '',
    auth: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers:{
        setUser: (state, action) => {
            const {_id, username, phoneNumber, auth} = action.payload;

            state._id = _id;
            state.username = username;
            state.phoneNumber = phoneNumber;
            state.auth = auth;
        },
        resetUser: (state, action) => {
            state._id = '';
            state.username = '';
            state.phoneNumber = '';
            state.auth = false;
        }
    }
})

export const {setUser, resetUser} = userSlice.actions;

export default userSlice.reducer;