export async function fetchAvailableFood() {
  const response = await fetch("http://localhost:3000/meals");
  const resData = await response.json();
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  //console.log("response data", resData.meals);
  return resData;
}

export async function updateOrders(orderData) {
  const response = await fetch("http://localhost:3000/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });
  const resData = await response.json();
  if (!response.ok) {
    throw new Error("Failed to update orders");
  }
  return resData.message;
}

export async function fetchOrders() {
  const response = await fetch("http://localhost:3000/orders");
  const resOrderData = await response.json();
  if (!response.ok) {
    throw new Error("failed to fetch order data");
  }
  return resOrderData;
}
