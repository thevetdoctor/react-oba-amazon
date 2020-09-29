
export const initialState = {
  basket: [],
  stock: [],
  discountStatus: false,
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
      const idx = state.basket.findIndex(
        (basketItem) => basketItem.id === action.item.id
        );
        let basketClone = [...state.basket];
        if(idx >= 0) {
        basketClone[idx].count = basketClone[idx].count + 1;
        console.log(action.item.count, idx, basketClone[idx]);
      } else {
        console.log(action.item.count, idx, basketClone[idx]);
        basketClone.push(action.item);
      }
      return {
        ...state,
        basket: basketClone,
      };
      
    case "EMPTY_BASKET":
    return {
      ...state,
      basket: []
    };

    case "REDUCE_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let newBasket = [...state.basket];
      if (index >= 0 && newBasket[index].count < 2) {
        newBasket.splice(index, 1);
      } else if(index >= 0) {
        newBasket[index].count = newBasket[index].count - 1;
      } else {
        console.warn(
          `Cant remove product (id: ${action.id}) as its not in basket!`
        )
      }

      return {
        ...state,
        basket: newBasket
      }

    case "REMOVE_FROM_BASKET":
      const index1 = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );

      let newBasket1 = [...state.basket];

      if (index1 >= 0) {
        newBasket1.splice(index1, 1);
      } else {
        console.warn(
          `Can't remove product (id: ${action.id}) as its not in basket!`
        )
      }

      return {
        ...state,
        basket: newBasket1
      }
    
    case "SET_USER":
      return {
        ...state,
        user: action.user
      }
    
    case "SEARCH_STOCK":
      const { searchResults } = action;
      return {
        ...state,
        stock: [...searchResults]
      }

    case "GIVE_DISCOUNT":
        return {
          ...state,
          discountStatus: !state.discountStatus
        }

    default:
      return state;
  }
};

export default reducer;

 // export const sortBasket = (basket) => {
  //   let count = {};
  //   let bask = [];
  //   let clonedBasket = [...basket];

  //   for(let i = 0; i < clonedBasket.length; i++) {
  //     let prop = clonedBasket[i].id;
  //     if(!count[prop]) {
  //       bask.push(clonedBasket[i]);
  //       count[prop] = 1;
  //     } else {
  //       count[prop] = count[prop] + 1;
  //     let index = bask.findIndex((x) => x.id === clonedBasket[i].id);
  //     bask[index].count = bask[index].count + 1;
  //     }
  //   }
  //   console.log(bask);
  //   return bask;
  // }