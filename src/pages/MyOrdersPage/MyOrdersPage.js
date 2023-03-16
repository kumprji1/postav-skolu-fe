import React, { useContext, useEffect, useState } from "react";
import BTitle from "../../components/Base/BTitle/BTitle";
import { AuthContext } from "../../contexts/AuthContext";
import { useHttp } from "../../hooks/http-hook";
import MyOrderList from "./components/MyOrderList";

import './MyOrdersPage.scss'

const MyOrdersPage = () => {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttp();
  const [loadedOrders, setLoadedOrders] = useState([]);

  // Fetch Orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/user/orders-by-user-email`,
          "GET",
          null,
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          }
        );
        setLoadedOrders(responseData);
      } catch (err) {}
    };
    fetchOrders();
  }, [sendRequest, auth.token]);

  return (
    <section className="my-orders-section">
      <BTitle>Moje objednávky</BTitle>
      <MyOrderList orders={loadedOrders} />
    </section>
  );
};

export default MyOrdersPage;
