// Importam hook-urile useReducer si useContext.
import { useEffect, useState, useContext, useReducer } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
// Importam contextul cart-ului.
import { CartContext } from "../store/Cart/context";
// Importam actiunea de adaugare in cart.
import { addToCart } from "../store/Cart/actions";
// Importam reducerul asociat cartului, precum si state-ul initial.
import { cartReducer, initialState } from "../store/Cart/reducer";

export function Home() {
  // Initializam reducerul, dandu-i si state-ul initial. useReducer returneaza state-ul produs de reducer, impreuna cu o functie care modifica state-ul respectiv.
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Cerem 4 produse de la API si actualizam state-ul.
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://www.cheapshark.com/api/1.0/deals?onSale&pageSize=4")
      .then((response) => response.json())
      .then((products) => {
        // console.log("Produsele: ", products);

        setProducts(products);
      });
  }, []);

  // Utilizam valoarea oferita de context.
  const contextValue = useContext(CartContext);
  console.log(contextValue);

  // Functia care se ocupa de adaugarea in cart a produsului:
  function handleAddToCartClick(product) {
    // Apelam actiunea, cu payloadul aferent.
    const actionResult = addToCart(product);
    // Trimitem rezultatul actiunii catre reducer.
    dispatch(actionResult);
  }

  return (
    <div>
      <div className="d-flex flex-column align-items-center">
        <p>Numarul de produse din cart este: {state.products.length}</p>

        {products.map((product) => {
          return (
            <Card
              key={product.dealID}
              style={{ width: "18rem" }}
              className="m-3"
            >
              <Link
                to={`/product/${encodeURI(product.dealID)}`}
                className="text-dark"
              >
                <Card.Img variant="top" src={product.thumb} />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text className="text-danger">
                    {product.salePrice} $
                  </Card.Text>
                </Card.Body>
              </Link>
              <Button
                variant="success"
                onClick={() => {
                  // Construim payload-ul si il pasam ca argument functiei care va apela actiunea addToCart.
                  handleAddToCartClick({
                    id: product.dealID,
                    image: product.thumb,
                    name: product.title,
                    price: product.salePrice,
                  });
                }}
              >
                Adaugă în coș
              </Button>
            </Card>
          );
        })}
      </div>
      <Link to="/products">Vezi toate produsele</Link>
    </div>
  );
}
