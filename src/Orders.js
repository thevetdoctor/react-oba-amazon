// /* eslint-disable no-unused-vars */
// import React, { useState, useEffect } from "react";
// // import { db } from "./firebase";
// import "./Orders.css";
// import Order from "./Order";
// import { useStateValue } from "./StateProvider";

// function  Orders() {
//     const [{ basket, user }, dispatch ] = useStateValue();
//     const [orders, setOrders] = useState([]);
//     console.log(basket, user)
//     useEffect(() => {
//         if (user) {
//         db.collection("users")
//         .doc(user?.uid)
//         .collection("orders")
//         .orderBy("created", "desc")
//         .onSnapshot((snapshot) => {
//             setOrders(snapshot.docs.map(doc => ({
//                 id: doc.id,
//                 data: doc.data()
//             })))
//         })
//     } else {
//         setOrders([]);
//         // setOrders([
//         //     {data: {basket}}, 
//         //     {data: {basket}},
//         //     {data: {basket}}
//         // ]);
//     }
//     return () => {};
//     }, [user]);

//     return (
//         <div className="orders">
//             <img
//             className="checkout__ad"
//             src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
//             alt=""
//             />
               
//         <h1>Your Orders</h1>

//             <div className="orders__order">
//                 {orders?.map((order, idx) => (
//                     <Order 
//                     key={idx}
//                     order={order} />
//                 ))}
//             </div>
//         </div>
//     )
// }

// export default Orders;