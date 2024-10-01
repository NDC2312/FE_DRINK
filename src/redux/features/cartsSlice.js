import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItem: localStorage.getItem('item') ? JSON.parse(localStorage.getItem('item')) : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
};

const cartsSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const findIndex = state.cartItem.findIndex((item) => item.id === action.payload.id);
            if (findIndex >= 0) {
                state.cartItem[findIndex].cartQuantity += action.payload.qty;
                //state.cartItem[findIndex].price += action.payload.total;
            } else {
                const tempProduct = {
                    ...action.payload,
                    cartQuantity: action.payload.qty,
                    //  price: action.payload.total,
                };
                state.cartItem.push(tempProduct);
            }

            localStorage.setItem('item', JSON.stringify(state.cartItem));
        },

        removeCart(state, action) {
            const newCart = state.cartItem.filter((item) => item.id !== action.payload.id);
            state.cartItem = newCart;
            localStorage.setItem('item', JSON.stringify(state.cartItem));
        },

        clearCart(state, action) {
            state.cartItem = [];
            localStorage.setItem('item', JSON.stringify(state.cartItem));
        },

        decreaseCart(state, action) {
            const findIndex = state.cartItem.findIndex((item) => item.id === action.payload.id);
            if (state.cartItem[findIndex].cartQuantity > 1) {
                state.cartItem[findIndex].cartQuantity -= 1;
            } else if (state.cartItem[findIndex].cartQuantity === 1) {
                const newCart = state.cartItem.filter((item) => item.id !== action.payload.id);
                state.cartItem = newCart;
            }
            localStorage.setItem('item', JSON.stringify(state.cartItem));
        },

        increaseCart(state, action) {
            const findIndex = state.cartItem.findIndex((item) => item.id === action.payload.id);
            if (state.cartItem[findIndex].cartQuantity >= 1) {
                state.cartItem[findIndex].cartQuantity += 1;
            }
            localStorage.setItem('item', JSON.stringify(state.cartItem));
        },

        getTotal(state, action) {
            let { total, quantity } = state.cartItem.reduce(
                (cartTotal, cartItem) => {
                    const { cartQuantity, price } = cartItem;
                    cartTotal.total += cartQuantity * price;
                    cartTotal.quantity += cartQuantity;

                    return cartTotal;
                },
                { total: 0, quantity: 0 },
            );
            state.cartTotalAmount = total;
            state.cartTotalQuantity = quantity;
        },
    },
});

export const { getTotal, addToCart, removeCart, clearCart, decreaseCart, increaseCart } = cartsSlice.actions;
export default cartsSlice.reducer;
