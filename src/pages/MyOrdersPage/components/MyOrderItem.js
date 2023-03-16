import React from "react";
import { Link, NavLink } from "react-router-dom";
import format from 'date-format'

const MyOrderItem = (props) => {
  return (
    <Link
      className={"btn--secondary my-orders-list--item"}
      to={`/objednavka/${props.order._id}?uuid=${props.order.uuid}`}
    >
      Dne: <strong>{format.asString('dd.MM.yyyy', new Date(props.order.createdAt))} </strong> 
      Objednávka č. {props.order._id} 
    </Link>
  );
};

export default MyOrderItem;
