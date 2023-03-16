import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import BTitle from "../../components/Base/BTitle/BTitle";
import { useHttp } from "../../hooks/http-hook";
import OrderedItem from "./components/OrderedItem";

import "./OrderDetailPage.scss";

const OrderDetailPage = () => {
  const [searchParams] = useSearchParams();
  const [order, setOrder] = useState();
  const { orderId } = useParams();

  const { sendRequest } = useHttp();
  const orderUUID = searchParams.get("uuid");

  useEffect(() => {
    const fetchOrder = async () => {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/order/${orderId}?uuid=${orderUUID}`
      );
      console.log(responseData);
      setOrder(responseData);
    };
    fetchOrder();
  }, [orderUUID, orderId, sendRequest]);

  console.log();

  return (
    <section className="my-order-detail-section">
      <BTitle>Objednávka č. {orderId}</BTitle>
      {searchParams.get("success") && (
        <h1 className="my-order-detail-section--success-info">
          Platba úspěšně dokončena. Děkujeme!
        </h1>
      )}
      {searchParams.get("canceled") && (
        <h1 className="my-order-detail-section--canceled-info">
          Platba neproběhla v pořádku.
        </h1>
      )}
      {order && (
        <div className="my-order-detail--wrapper">
          {order.isPurchased ? <h2>Zaplaceno</h2> : <h2>Nezaplacena</h2>}
          {/* If not purchased, show button to retry */}
          {!order.isPurchased && order.paymentMethod === "CARD" && (
            <button
              className="btn--secondary"
              onClick={() => {
                window.location.replace(order.stripeUrl);
              }}
            >
              Zaplatit
            </button>
          )}
          <h1>Údaje dárce:</h1>
          <table className="my-order-detail--table">
            <tbody>
              <tr>
                <td>Jméno, příjmení</td>
                <td>
                  {order.contact.name} {order.contact.surname}
                </td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{order.contact.email}</td>
              </tr>
              <tr>
                <td>Tel. číslo</td>
                <td>{order.contact.mobile}</td>
              </tr>
            </tbody>
          </table>
          {order.buyingAsCompany && (
            <table className="my-order-detail--table">
              <tbody>
                <tr>
                  <td>Název společnosti</td>
                  <td>{order.companyInfo.title}</td>
                </tr>
                <tr>
                  <td>IČO</td>
                  <td>{order.companyInfo.ico}</td>
                </tr>
                <tr>
                  <td>DIČ</td>
                  <td>{order.companyInfo.dic}</td>
                </tr>
              </tbody>
            </table>
          )}
          {order.wantsCertificate && (
            <table className="my-order-detail--table">
              <tbody>
                <tr>
                  <td>Ulice a čís. popisné</td>
                  <td>{order.certificateInfo.street_num}</td>
                </tr>
                <tr>
                  <td>Město</td>
                  <td>{order.certificateInfo.city}</td>
                </tr>
                <tr>
                  <td>PSČ</td>
                  <td>{order.certificateInfo.zipCode}</td>
                </tr>
              </tbody>
            </table>
          )}
          <h1>Dary:</h1>
          {order.donations.map(don => <OrderedItem key={don._id} don={don} />)}
        </div>
      )}
    </section>
  );
};

export default OrderDetailPage;
