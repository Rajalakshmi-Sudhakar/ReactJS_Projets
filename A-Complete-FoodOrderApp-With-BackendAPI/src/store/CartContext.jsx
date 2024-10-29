import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

function cartReducer(state, action) {
  if (action.type === ADD_ITEM) {
    //to add an item to cart, first check if the item id already exists in the cart.
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const updatedItems = [...state.items];
    //if existingCartIndex is > -1 which it is 0 or above position in the array.means the item exists in the array. then add the quantity property with one.
    if (existingCartItemIndex > -1) {
      //we have existing items index. now fetch the existing item with that index from the already existing state's cart items.
      const exisitingItem = updatedItems[existingCartItemIndex];

      //now, to the retreived exisiting item add one to the quantity property of the object.
      const updatedItem = {
        ...exisitingItem,
        quantity: exisitingItem.quantity + 1,
      };

      //now, replace the already exisiting item from the state with the updatedItem.
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    //else directly push the new item to cart, ensure to add a quatity property to it, before adding it to cart. so that it can be altered in future.
    else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    //return the updated state
    return { ...state, items: updatedItems };
  } else if (action.type === REMOVE_ITEM) {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const exisitingCartItem = state.items[existingCartItemIndex];
    const updatedItems = [...state, items];

    if (exisitingCartItem.quantity === 1) {
      //if the quantity is one, you have to remove the item from cart.
      //it can be done in different ways.one way is to use splice.
      //splice takes an index and removes the mentioned number of items from that index.

      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      //if the quantity is more than one, we have to reduce one from the existing quantity.
      const updatedItem = {
        ...exisitingCartItem,
        qunatity: exisitingCartItem.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return { ...state, items: updatedItems };
  }
  return state;
}

export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  function addItem(item) {
    dispatchCartAction({ type: "ADD_ITEM", item: item });
  }
  function removeItem(id) {
    dispatchCartAction({ type: "REMOVE_ITEM", id: id });
  }

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
