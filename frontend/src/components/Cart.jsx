// hooks
import { useEffect, useState, useContext } from "react";
import {
  useGetProductsLs,
  useDeleteProductsLs,
} from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

// context
import { CartContext } from "../context/CartContext.jsx";

// sidebar
import { Dock } from "react-dock";

// Style
import classes from "./Cart.module.css";
import { MdOutlineClose } from "react-icons/md";

const Cart = ({ openSidebar, setOpenSidebar }) => {
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState();

  const navigate = useNavigate();

  // carregar produtos no cart
  useEffect(() => {
    if (openSidebar) {
      const productsLs = useGetProductsLs();
      setOrders(productsLs);
    }
  }, [openSidebar]);

  // somar valor total do carrinho
  useEffect(() => {
    const somaTotal = () => {
      let smtotal = 0;

      if (orders.length != 0) {
        orders.map((order) => {
          const price = order.PRECO * order.QTD;

          smtotal = smtotal + price;
        });
      }

      setTotal(smtotal);
    };

    somaTotal();
  }, [orders, openSidebar]);

  // finalizar pedido
  const finalizeOrder = () => {
    navigate("/checkout");

    setOpenSidebar(false);
  };

  // atualizar numero de itens
  const setBtn = (op, order) => {
    const products = useGetProductsLs();

    products.map((prod) => {
      if (prod.ID_PRODUTO === order.ID_PRODUTO) {
        if (op === "+") {
          prod.QTD++;
          prod.VL_TOTAL = prod.QTD * prod.PRECO;
        } else if (op === "-" && order.QTD > 1) {
          prod.QTD--;
          prod.VL_TOTAL = prod.QTD * prod.PRECO;
        } else return;
      }

      setOrders(products);

      localStorage.setItem("products", JSON.stringify(products));
    });
  };

  // context
  const { setTotalCart, setDadosCart } = useContext(CartContext);

  setTotalCart(total);
  setDadosCart(orders);

  return (
    <Dock
      position="right"
      isVisible={openSidebar}
      fluid={false}
      size={430}
      onVisibleChange={(visible) => {
        setOpenSidebar(visible);
      }}
    >
      <div className={classes.cart_container}>
        <MdOutlineClose onClick={() => setOpenSidebar(false)} />
        <h1>Meu Pedido</h1>

        <div className={classes.product_container}>
          {orders.length === 0 ? (
            <p className={classes.void_cart}>Seu carrinho está vazio!</p>
          ) : (
            orders.map((order) => (
              <div className={classes.product} key={order.ID_PRODUTO}>
                <img src={order.FOTO} alt={order.NOME} />
                <div className={classes.body_product}>
                  <p className={classes.product_name}>{order.NOME}</p>
                  <div className={classes.qtd_btn}>
                    <button
                      onClick={() => setBtn("-", order)}
                      className={order.QTD === 1 ? classes.gray : ""}
                    >
                      -
                    </button>
                    <span>{order.QTD}</span>
                    <button onClick={() => setBtn("+", order)}>+</button>
                  </div>
                  <p className={classes.product_price}>
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(order.VL_TOTAL)}
                  </p>
                  <button
                    onClick={() =>
                      useDeleteProductsLs(order.ID_PRODUTO, setOrders)
                    }
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {orders.length !== 0 && (
          <div className={classes.footer_cart}>
            <div className={classes.total_cart}>
              <p>Total:</p>
              <p>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(total)}
              </p>
            </div>
            <button className="btn-checkout" onClick={finalizeOrder}>
              Finalizar Pedido
            </button>
          </div>
        )}
      </div>
    </Dock>
  );
};

export default Cart;
