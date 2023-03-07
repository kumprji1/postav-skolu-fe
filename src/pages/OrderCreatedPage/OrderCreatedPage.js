import React, { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useHttp } from "../../hooks/http-hook";

const OrderCreated = () => {
  const [searchParams] = useSearchParams();
  const { orderId } = useParams();

  const { sendRequest } = useHttp();
  const orderUUID = searchParams.get("uuid");

  useEffect(() => {
    const fetchOrder = async () => {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/order/${orderId}?uuid=${orderUUID}`
      );
      console.log(responseData)
    };
    fetchOrder()
  }, [orderUUID, orderId, sendRequest]);

  console.log();

  return (
    <div>
      <p>Objednávka s id {orderId} vytvořena! (ID ale nezobraovat)</p>
      {searchParams.get("success") && <p>Objednávka zaplacena</p>}
      {searchParams.get("canceled") && <p>Platba neproběhla</p>}
    </div>
  );
};

export default OrderCreated;
