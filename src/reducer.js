
export const initialState = {
  basket: [],
  stock: [],
  user: null
};

// Selector
export const getBasketTotal = (basket) => 
  basket?.reduce((amount, item) => item.price + amount, 0);

export const getBasketCount = (basket) => 
  basket?.reduce((amount, item) => item.count + amount, 0);

  export const sortBasket = (basket) => {
    let count = {};
    let bask = [];
    for(let i = 0; i < basket.length; i++) {
      let prop = basket[i].id;
      // count[prop] = count[prop] ? count[prop] + 1 : 1;
      if(!count[prop]) {
        bask.push(basket[i]);
        count[prop] = 1;
      } else {
        count[prop] += 1;
      let index = bask.findIndex((x) => x.id === basket[i].id);
      bask[index].count +=1;
      console.log(bask[index]);
      }
    // console.log(count, bask);
    }
    console.log(bask);
    return bask;
  }

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD_TO_BASKET":
      // const index1 = state.basket.findIndex(
      //   (basketItem) => basketItem.id === action.item.id
      // );
      // let newBasket1 = [...state.basket];

      // if (index1 >= 0) {
      //   let currentCount = newBasket1[index1];
      //   console.log(index1, currentCount, newBasket1);
      //   newBasket1.splice(index1, 1);
      //   // action.item.count = currentCount + 1;
      //   newBasket1.push(action.item);
      // }
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
      
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
        newBasket.splice(index, 1);

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
    
    case "SEARCH_STOCK":
      const { searchResults } = action;
      return {
        ...state,
        stock: [...searchResults]
      }

    default:
      return state;
  }
};

export default reducer;
