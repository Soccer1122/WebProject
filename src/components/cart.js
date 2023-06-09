import React, { useEffect, useState } from "react";
import SideBar from "./sidebar";
import Footer from "./footer";
import { Link } from "react-router-dom";
const Cart = () => {
  const id = JSON.parse(localStorage.getItem("user")).id;
  const [carts, setCarts] = useState([]);
  const [books, setBooks] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  localStorage.setItem("totalAmount", JSON.stringify(totalAmount));
  const updateCartQuantity = async (cartId, newQuantity) => {
    try {
      const response = await fetch(
        `http://localhost:8080/cart/update/${cartId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: parseInt(newQuantity),
        }
      );
      if (response.ok) {
        setCarts((prevCarts) => {
          return prevCarts.map((cart) => {
            if (cart.id === cartId) {
              return { ...cart, quantity: newQuantity };
            }
            return cart;
          });
        });
        window.location.reload()
        console.log("Cập nhật số lượng thành công");
      } else {
        console.log("Cập nhật số lượng không thành công");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const DeleteCart = (cardId) => {
    if (
      window.confirm("Bạn có chắc chắn muốn xóa sách này ra khỏi giỏ hàng?")
    ) {
      fetch(`http://localhost:8080/cart/delete/${cardId}`, { method: "DELETE" })
        .then((response) => {
          if (response.ok) {
            // Update the state with the remaining books
            
          }
        })
        .catch((err) => console.log(err));
    }
  };
  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const response = await fetch(`http://localhost:8080/carts/${id}`);
        const data = await response.json();
        setCarts(data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchBooks = async () => {
      try {
        const bookIds = carts.map((cart) => cart.bookid);
        const response = await fetch(
          `http://localhost:8080/books?id=${bookIds.join(",")}`
        );
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCarts();
    fetchBooks();
  }, [carts]);
  useEffect(() => {
    let total = 0;
    books.forEach((book, index1) => {
      carts.forEach((cart, index2) => {
        if (book.id === cart.bookid) total += book.price * cart.quantity;
      });
    });
    setTotalAmount(total);
  }, [books]);
  const formatCurrency = (value) => {
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    return formatter.format(value);
  };
  return (
    <div>
      <SideBar />
      <div className="iq-top-navbar">
        <div className="iq-navbar-custom">
          <nav className="navbar navbar-expand-lg navbar-light p-0">
            <div className="iq-menu-bt d-flex align-items-center">
              <div className="iq-navbar-logo d-flex justify-content-between">
                <a href="/" className="header-logo">
                  <img
                    src="images/logo200.png"
                    className="img-fluid rounded-normal"
                    alt=""
                  />
                  <div className="logo-title">
                    <span className="text-primary text-uppercase">
                      Trang chủ
                    </span>
                  </div>
                </a>
              </div>
            </div>
            <div className="navbar-breadcrumb">
              <a
                href="/"
                className="iq-waves-effect"
                aria-expanded="true"
                style={{ fontSize: "20px", fontWeight: "bold" }}
              >
                <span className="ripple rippleEffect"></span>
                <i className="las la-home iq-arrow-left"></i>
                <span>Trang Chủ</span>
              </a>
            </div>
            <div className="iq-search-bar"></div>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ml-auto navbar-list">
                <li className="line-height pt-3">
                <Link
                      to={`/history/${
                        JSON.parse(localStorage.getItem("user")).id
                      }`}
                      className="search-toggle iq-waves-effect d-flex align-items-center"
                    >
                      <img
                        src="http://localhost:3000/images/user/default_user.png"
                        className="img-fluid rounded-circle mr-3"
                        alt="user"
                      />
                      <div className="caption">
                        <h6 className="mb-1 line-height">
                          {JSON.parse(localStorage.getItem("user")).name}
                        </h6>
                        Lịch sử mua hàng
                      </div>
                    </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
      {/*-----------------------------------------End header-------------------------------------------------*/}

      <div id="content-page" className="content-page">
        <div className="container-fluid checkout-content">
          <div className="row">
            <div id="cart" className="card-block show p-0 col-12">
              <div className="row align-item-center">
                <div className="col-lg-8">
                  <div className="iq-card">
                    <div className="iq-card-header d-flex justify-content-between iq-border-bottom mb-0">
                      <div className="iq-header-title">
                        <h4 className="card-title">Giỏ hàng</h4>
                      </div>
                    </div>
                    <div className="iq-card-body">
                      <ul className="list-inline p-0 m-0">
                        {/* san pham*/}

                        {carts.length!==0?(
                        carts.map((cart) => {
                          const book = books.find(
                            (book) => book.id === cart.bookid
                          );
                          const handleQuantityChange = (
                            cartId,
                            newQuantity                           
                          ) => {
                            // Gọi hàm updateCartQuantity để cập nhật số lượng trên server
                            if(newQuantity>=1){
                            updateCartQuantity(cartId, newQuantity);
                            }else{
                              DeleteCart(cartId)
                            }
                          };
                          return (
                            <li className="checkout-product" key={cart.id}>
                              {book && (
                                <div className="row align-items-center">
                                  <div className="col-sm-2">
                                    <span className="checkout-product-img">
                                      <a href={`/book/${cart.bookid}`}>
                                        <img
                                          className="img-fluid rounded"
                                          src={
                                            book.image
                                          }
                                          alt=""
                                        />
                                      </a>
                                    </span>
                                  </div>
                                  <div className="col-sm-4">
                                    <div className="checkout-product-details">
                                      <h5>{book.title} </h5>
                                      <p />
                                      <div className="price">
                                        <h5>{formatCurrency(book.price)}</h5>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-sm-6">
                                    <div className="row">
                                      <div className="col-sm-10">
                                        <div className="row align-items-center mt-2">
                                          <div className="col-sm-7 col-md-6">
                                            <button
                                              type="button"
                                              className="fa fa-minus qty-btn"
                                              id="btn-minus"
                                              onClick={() =>
                                                handleQuantityChange(
                                                  cart.id,
                                                  cart.quantity - 1
                                                )
                                              }
                                            ></button>

                                            <input
                                              type="text"
                                              id="quantity"
                                              defaultValue={cart.quantity}
                                              readOnly
                                            />
                                            <button
                                              type="button"
                                              className="fa fa-plus qty-btn"
                                              id="btn-plus"
                                              onClick={() =>
                                                handleQuantityChange(
                                                  cart.id,
                                                  cart.quantity + 1
                                                )
                                              }
                                            ></button>
                                          </div>
                                          <div className="col-sm-5 col-md-6">
                                            <span className="product-price">
                                              {formatCurrency(book.price)}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-sm-2">
                                        <button
                                          className="text-dark font-size-20 btn btn-outline-dar"
                                          onClick={() => DeleteCart(cart.id)}
                                        >
                                          <i className="ri-delete-bin-7-fill"></i>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </li>
                          );
                        })):(
                          <h4> Giỏ hàng của bạn hiện đang trống</h4>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="iq-card">
                    <div className="iq-card-body">
                      <hr />
                      <p>
                        <b>Chi tiết</b>
                      </p>
                      <div className="d-flex justify-content-between mb-1">
                        <span>Tổng</span>
                        <span>{formatCurrency(totalAmount)}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-1">
                        <span>Thuế VAT (5%)</span>
                        <span>{formatCurrency((totalAmount * 5) / 100)}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span>Phí vận chuyển</span>
                        <span className="text-success">Miễn phí</span>
                      </div>
                      <hr />
                      <div className="d-flex justify-content-between">
                        <span className="text-dark">
                          <strong>Tổng</strong>
                        </span>
                        <span className="text-dark">
                          <strong>
                            {formatCurrency((totalAmount * 105) / 100)}
                          </strong>
                        </span>
                      </div>
                      {carts.length===0?(
                        <a                    
                        id="place-order"
                        href="/checkout"
                        className="btn btn-primary d-block mt-3 next"
                        style={{pointerEvents: "none"}}
                      >
                        Đặt hàng
                      </a>
                      )
                      :(<a                    
                        id="place-order"
                        href="/checkout"
                        className="btn btn-primary d-block mt-3 next"
                      >
                        Đặt hàng
                      </a>)
                      }  
                    </div>
                  </div>
                  <div className="iq-card ">
                    <div className="card-body iq-card-body p-0 iq-checkout-policy">
                      <ul className="p-0 m-0">
                        <li className="d-flex align-items-center">
                          <div className="iq-checkout-icon">
                            <i className="ri-checkbox-line"></i>
                          </div>
                          <h6>
                            Chính sách bảo mật (Thanh toán an toàn và bảo mật.)
                          </h6>
                        </li>
                        <li className="d-flex align-items-center">
                          <div className="iq-checkout-icon">
                            <i className="ri-truck-line"></i>
                          </div>
                          <h6>Chính sách giao hàng (Giao hàng tận nhà.)</h6>
                        </li>
                        <li className="d-flex align-items-center">
                          <div className="iq-checkout-icon">
                            <i className="ri-arrow-go-back-line"></i>
                          </div>
                          <h6>Chính sách hoàn trả</h6>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};
export default Cart;
