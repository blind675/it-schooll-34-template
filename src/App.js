import "./styles.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Cart } from "./pages/Cart";
import { Products } from "./pages/Products";
import { Product } from "./pages/Product";
import { Header } from "./components/Header";
// Importam contextul creat.
import { CartContext } from "./store/Cart/context";

export default function App() {
  return (
    // Pasam catre toate componentele impachetate de CartContext.Provider obiectul {  productId: 123, productName: "Diablo II", price: 19.99  }.
    <CartContext.Provider
      value={{ productId: 123, productName: "Diablo II", price: 19.99 }}
    >
      <div className="App primary">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </CartContext.Provider>
  );
}
