import { useState, useRef } from "react";
import Header from "./components/Header";
import AvailableFood from "./components/AvailableFood";
import Modal from "./components/Modal";
import Cart from "./components/Cart";
import CheckOutForm from "./components/CheckOut-Form";
import { updateOrders, fetchAvailableFood, fetchOrders } from "./http.js";
import useFetch from "./hooks/useFetch";

function App() {
  //const [totalCartItems, setTotalCartItems] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [orderedFood, setOrderedFood] = useState([]);
  // const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState();
  //const[addCart,setAddCart]=useState([]);
  const { fetchedData: orderedData, setFetchedData: setOrderedData } = useFetch(
    fetchOrders,
    {}
  );

  const { fetchedData: availableFoods, setFetchedData } = useFetch(
    fetchAvailableFood,
    []
  );
  //let data,
  ///let orderData;

  //const [modalIsOpen, setModalIsOpen] = useState(false);
  //const [checkOutFormOpen, setCheckOutFormOpen] = useState(false);

  const modal = useRef();
  const checkoutModal = useRef();
  const successModal = useRef();
  let successModalActions = <button onClick={handleOkay}>Okay</button>;
  let modalActions = <button>Close</button>;
  if (orderedFood.length > 0) {
    modalActions = (
      <>
        <button>Close</button>
        <button onClick={handleCheckOut}>Go To Checkout</button>
      </>
    );
  }
  const checkoutModalActions = (
    <>
      <button>Close</button>
      {/*} <button onClick={handleSubmitOrder}>Submit Order</button>*/}
    </>
  );

  function handleAddToCart(food) {
    // setTotalCartItems((prevItems) => prevItems + 1);
    console.log("food:", food);
    setOrderedFood((prevFood) => {
      const cartItems = [...prevFood];

      const existingCartItemIndex = cartItems.findIndex(
        (cartItem) => cartItem.id === food.id
      );
      const existingCartItem = cartItems[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: (existingCartItem.quantity || 0) + 1,
        };
        cartItems[existingCartItemIndex] = updatedItem;
      } else {
        cartItems.push({ ...food, quantity: 1 });
      }
      return cartItems;
    });

    console.log("cartOrderedFood:", orderedFood);
  }

  function handleRemoveFromCart(id) {
    //remove item.
    setOrderedFood((prevFood) => {
      const cartItems = [...prevFood];
      let updatedItem;
      const existingCartItemIndex = cartItems.findIndex(
        (cartItem) => cartItem.id === id
      );
      const existingCartItem = cartItems[existingCartItemIndex];
      if (existingCartItem.quantity === 1) {
        //remove the item from cart
        cartItems.splice(existingCartItemIndex, 1);
      } else {
        updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity - 1,
        };
        cartItems[existingCartItemIndex] = updatedItem;
      }
      return cartItems;
    });
  }

  function handleOnCartClick() {
    //setModalIsOpen(true);
    modal.current.open();
  }
  /* function handleModalOnClose() {
    setModalIsOpen(false);
  }*/
  async function handleFormSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    console.log("Formdata", data);

    // Check if orderedFood is not empty and data is valid
    if (orderedFood.length === 0 || !data) {
      console.log("No items in the order or form is undefined");
      return;
    }

    if (data) {
      setOrderedData({
        items: [...orderedFood],
        customer: data,
      });
    } else {
      console.log("form is undefined");
    }

    successModal.current.open();
    /* try {
        const message = await updateOrders({ order: orderedData });
        console.log("ordered data to be sent to DB:", { order: orderedData });
        console.log("success", message);
      } catch (error) {
        console.log("error sending data to DB", error.message);
      }
    } else {
      console.log("form is undefined");
    }*/

    setFormSubmitted(true);
    // event.target.reset();
    //successModal.current.open();
  }

  if (formSubmitted) {
    /* async function sendDataToDb() {
      try {
        const message = await updateOrders(orderData);
      } catch (error) {
        console.log("error sending data to DB", error.message);
      }
    }
    sendDataToDb();*/
    //orderData = [...orderedFood, data];
    // console.log("ordered data to be sent to DB:", orderData);
    setFormSubmitted(false);
  }

  function handleCheckOut() {
    //setCheckOutFormOpen(true);
    checkoutModal.current.open();
  }
  /*function handleGoToCheckout() {
    console.log("display checkout form");
  }*/

  /* function handleSubmitOrder() {
    successModal.current.open();
  }*/

  //orderData = [...orderedFood, data];
  //console.log("ordered data to be sent to DB:", orderData);

  async function handleOkay() {
    try {
      const message = await updateOrders({ order: orderedData });
      console.log("ordered data to be sent to DB:", { order: orderedData });
      console.log("success", message);
    } catch (error) {
      console.log("error sending data to DB", error.message);
    }
  }

  return (
    <>
      <Modal
        ref={modal}
        //open={modalIsOpen}
        actions={modalActions}
        //onClose={handleModalOnClose}
      >
        <Cart
          order={orderedFood}
          onAddToCart={handleAddToCart}
          onRemoveFromCart={handleRemoveFromCart}
        />
      </Modal>
      <Modal
        ref={checkoutModal}
        //</>open={checkOutFormOpen}
        actions={checkoutModalActions}
      >
        <CheckOutForm onSubmit={handleFormSubmit} />
      </Modal>
      <Modal ref={successModal} actions={successModalActions}>
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>We will get back to you via email, within the next few minutes.</p>
        <h3>Thank You!</h3>
      </Modal>
      <Header onCartClick={handleOnCartClick} order={orderedFood} />
      <AvailableFood onAddToCart={handleAddToCart} />
    </>
  );
}

export default App;
