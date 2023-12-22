export function cartReducer(cart, action) {
  switch (action.type) {
    case "ADD": {
      let duplicatedItem = false;

      const newCart = cart?.map((cartItem) => {
        if (
          cartItem.id === action.product.id &&
          cartItem.size === action.product.size
        ) {
          duplicatedItem = true;
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        } else {
          return { ...cartItem };
        }
      });

      if (duplicatedItem) {
        return newCart;
      }

      if (cart) {
        return [...cart, { ...action.product }];
      } else {
        return [];
      }
    }
    case "REMOVE": {
      const removeItemIndex = cart.findIndex(
        (cartItem) =>
          cartItem.id === action.product.id &&
          cartItem.size === action.product.size
      );

      cart.splice(removeItemIndex, 1);

      return [...cart];
    }
    case "CHECKOUT": {
      return [];
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
