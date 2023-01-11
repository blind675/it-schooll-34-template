// State-ul initial al cart-ului.
export const initialState = {
  // Initial nu avem produse in cart.
  products: [],
};

// Reducerul primeste ca parametri state-ul, respectiv rezultatul apelului unei actiuni.
export function cartReducer(state, action) {
  // Evaluam tipurile actiunii:
  switch (action.type) {
    case "ADD_TO_CART": {
      // Din state extragem produsele anterioare.
      const previousProducts = state.products;
      // Din actiune extragem produsul adaugat.
      const newProduct = action.payload;
      // Generam noul state.
      const newState = {
        // Atentie! Nu avem voie sa modificam state-ul primit ca parametru.
        products: [...previousProducts, newProduct],
      };

      console.log(newState);
      // Returnam noul state.
      return newState;
    }

    case "REMOVE_FROM_CART": {
      const newState = { products: [] };
      return newState;
    }
    // Nu uitam sa returnam state-ul pe cazul default
    default:
      return state;
  }
}
