import { configureStore } from '@reduxjs/toolkit';
import cartsSlice from '../features/cartsSlice';
import customerInforSlice from '../features/customerInforSlice';

export const store = configureStore({
    reducer: {
        carts: cartsSlice,
        dataCustomer: customerInforSlice,
    },
});

export default store;
