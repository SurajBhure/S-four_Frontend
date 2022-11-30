import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Nav from "../../../../components/client-screens/Nav";
import currencyFormatter from "currency-formatter";
import { discount } from "../../../../utils/discount";
import Quantity from "../../../../components/client-screens/Quantity";
import { BsTrash } from "react-icons/bs";
import { motion } from "framer-motion";
import {
  decQuantity,
  incQuantity,
  removeItem,
} from "../../../../app/reducers/cartReducer";
import { Link, useNavigate } from "react-router-dom";
import { useSendPaymentMutation } from "../../../../app/Services/paymentServices";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, total } = useSelector((state) => state.cart);
  //   console.log("cart:->", cart);

  const { userToken, user } = useSelector((state) => state.authReducer);
  console.log("user",user)

  //payemnt mutation
  const [doPayment, response] = useSendPaymentMutation();
  console.log("payment response", response);

  const inc = (id) => {
    dispatch(incQuantity(id));
  };
  const dec = (id) => {
    dispatch(decQuantity(id));
  };
  const remove = (id) => {
    //verify user to delete product from cart
    if (window.confirm("Are you sure to delete this item?")) {
      dispatch(removeItem(id));
    }
  };

  const pay = () => {
    if (userToken) {
      doPayment({ cart, id: user.id  });
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (response?.isSuccess) {
      window.location.href = response?.data?.url;
    }
  }, [response]);
  return (
    <>
      <Nav />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mt-10"
      >
        {cart.length > 0 ? (
          <>
            <div className="table-container">
              <table className="w-full">
                <thead>
                  <tr className="thead-tr">
                    <th className="th">image</th>
                    <th className="th">name</th>
                    <th className="th">color</th>
                    <th className="th">size</th>
                    <th className="th">price</th>
                    <th className="th">discountedprice</th>
                    <th className="th">qty</th>
                    <th className="th">total</th>
                    <th className="th">delete</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => {
                    const totalPrice = currencyFormatter.format(
                      discount(item.price, item.discount) * item.quantity,
                      {
                        code: "INR",
                      }
                    );
                    return (
                      <tr key={item._id} className="even:bg-gray-50">
                        <td className="td">
                          <img
                            src={`/images/${item.image1}`}
                            alt={item.title}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                        </td>
                        <td className="td font-medium w-[200px]">
                          {item.title}
                        </td>
                        <td className="td">
                          <span
                            className="block w-[15px] h-[15px] rounded-sm"
                            style={{ backgroundColor: item.color }}
                          ></span>
                        </td>
                        <td className="td">
                          <span className="font-semibold">
                            {item.size ? item.size : "-"}
                          </span>
                        </td>
                        <td className="td text-gray-600 line-through">
                          {currencyFormatter.format(item.price, {
                            code: "INR",
                          })}
                        </td>
                        <td className="td font-bold text-gray-900 w-[150px]">
                          {currencyFormatter.format(
                            discount(item.price, item.discount),
                            {
                              code: "INR",
                            }
                          )}
                        </td>
                        <td className="td">
                          <Quantity
                            quantity={item.quantity}
                            inc={() => inc(item._id)}
                            dec={() => dec(item._id)}
                            theme="indigo"
                          />
                        </td>
                        <td className="td font-bold">{totalPrice}</td>
                        <td className="td">
                          <span
                            className="cursor-pointer"
                            onClick={() => remove(item._id)}
                          >
                            <BsTrash className="text-rose-600" size={20} />
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="bg-indigo-50 p-4 flex justify-end rounded-md mt-5">
              <div>
                <span className="text-lg font-semibold text-indigo-800 mr-5 ">
                  {currencyFormatter.format(total, {
                    code: "INR",
                  })}
                </span>
                <button
                  className="btn bg-indigo-600 text-sm py-2.5"
                  onClick={pay}
                >
                  {response.isLoading ? "Loading...":"checkout"}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-md font-medium text-sm text-indigo-800 capitalize ">
            cart is empty
          </div>
        )}
      </motion.div>
    </>
  );
};

export default Cart;
