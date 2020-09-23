export const initialState = {
  basket: [],
  user: null
};

// Selector
export const getBasketTotal = (basket) => 
  basket?.reduce((amount, item) => (item.price * item.count) + amount, 0);

export const getBasketCount = (basket) => 
basket?.reduce((amount, item) => item.count + amount, 0);

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD_TO_BASKET":
      const index1 = state.basket.findIndex(
        (basketItem) => basketItem.id === action.item.id
      );
      let newBasket1 = [...state.basket];

      if (index1 >= 0) {
        newBasket1[index1].count += 1;
        console.log(index1, newBasket1[index1].count, newBasket1);
        return {
          ...state,
          basket: [...newBasket1],
        };
      } else {
        console.log([...newBasket1, action.item]);
      return {
        ...state,
        basket: [...newBasket1, action.item],
      }};
      
    case "EMPTY_BASKET":
    return {
      ...state,
      basket: []
    };

    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let newBasket = [...state.basket];

      if (index >= 0) {
        if(newBasket[index].count > 0) {
          newBasket[index].count -= 1;
        } else {
          newBasket.splice(index, 1);
        }

      } else {
        console.warn(
          `Cant remove product (id: ${action.id}) as its not in basket!`
        )
      }

      return {
        ...state,
        basket: newBasket
      }
    
    case "SET_USER":
      return {
        ...state,
        user: action.user
      }

    default:
      return state;
  }
};

export default reducer;
