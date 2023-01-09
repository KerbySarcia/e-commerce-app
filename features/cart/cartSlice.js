import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    value: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const exist = state.value.filter((obj) => obj.id === item.id);
      if (exist.length === 1) {
        state.value = state.value.map((obj) =>
          obj.id === item.id
            ? { ...obj, quantity: obj.quantity + item.quantity }
            : obj
        );
      } else state.value.push(item);
    },
    deleteToCart: (state, action) => {
      state.value = state.value.filter((item) => item.id != action.payload.id);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, deleteToCart } = cartSlice.actions;

export default cartSlice.reducer;
