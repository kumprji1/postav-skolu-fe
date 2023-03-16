import React from "react";
import MyOrderItem from "./MyOrderItem";

const MyOrderList = (props) => {
  return (
    <ul>
      {props.orders.map((order) => (
        <MyOrderItem key={order._id} order={order} />
      ))}
    </ul>
  );
};

export default MyOrderList;
