import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    customerInfor: {},
};

const customerInforSlice = createSlice({
    name: 'dataCustomer',
    initialState,
    reducers: {
        addCustomerInfor(state, action) {
            state.customerInfor = action.payload;
        },
    },
});

export const { addCustomerInfor } = customerInforSlice.actions;
export default customerInforSlice.reducer;
