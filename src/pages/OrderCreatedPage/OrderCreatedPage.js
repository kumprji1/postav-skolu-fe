import React, { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";

const OrderCreated = () => {
  const { orderId } = useParams();
  const [searchParams] = useSearchParams();

  console.log()

  return (
    <div>
      <p>Objednávka s id {orderId} vytvořena! (ID ale nezobraovat)</p>
      {searchParams.get('success') && <p>Objednávka zaplacena</p>}
      {searchParams.get('canceled') && <p>Platba neproběhla</p>}
    </div>
  );
};

export default OrderCreated;
