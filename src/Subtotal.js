/* eslint-disable no-unused-vars */
import React from "react";
import { useHistory } from "react-router-dom";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./StateProvider";
import { getBasketTotal, getBasketCount } from "./reducer";

function Subtotal() {
  const [{ basket, discountStatus }, dispatch] = useStateValue();
  const history = useHistory();

  console.log(discountStatus);
  const giveDiscount = () => {
    if(!discountStatus) {
      console.log('hey');
      dispatch({type: "GIVE_DISCOUNT"})
    } else {
      console.log('hi');
      dispatch({type: "GIVE_DISCOUNT"})
    }
  }
  
 
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({getBasketCount(basket)} items): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input 
              type="checkbox"
              disabled={!basket?.length}
              onChange={e => giveDiscount()}
              defaultChecked={discountStatus ? "checked" : ""}
              /> 
              <span>
                Claim your discount now (10% on all purchases while stock lasts)
              </span>
            </small>
          </>
        )}
        decimalScale={2}
        value={discountStatus ? getBasketTotal(basket) * 0.90 : getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />

      <button onClick={() => history.push("/payment")} disabled={!basket?.length}>Proceed to Checkout</button>
    </div>
  );
}

export default Subtotal;
