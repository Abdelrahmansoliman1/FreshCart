'use client';

import { getUserOrders } from "@/lib/servcies/order.service";
import { useEffect, useState } from "react";


export default function allOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  async function fetchOrders() {
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        setLoading(false);
        return;
      }

      const data = await getUserOrders(userId);
      setOrders(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  fetchOrders();
}, []);


  if (loading) return <p>Loading...</p>;

  if (!orders.length) return <p>No orders found</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {orders.map((order) => (
        <div key={order._id} className="border p-4 mb-4 rounded">
          <p><strong>Total:</strong> {order.totalOrderPrice} EGP</p>
          <p><strong>Paid:</strong> {order.isPaid ? "Yes" : "No"}</p>
          <p><strong>Delivered:</strong> {order.isDelivered ? "Yes" : "No"}</p>
        </div>
      ))}
    </div>
  );
}
