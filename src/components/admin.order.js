import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function AdminOrder(props) {
  const isLoggedIn = localStorage.getItem("admin") !== null ? true : false;
  const [orderedItems, setOrderedItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [books, setBooks] = useState([]);
  const formatCurrency = (value) => {
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    return formatter.format(value);
  };
  useEffect(() => {
    const fetchOder = async () => {
      try {
        const response = await fetch(`http://localhost:8080/orders`);
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchOderedItem = async () => {
      try {
        const response = await fetch(`http://localhost:8080/orderedItems`);
        const data = await response.json();
        setOrderedItems(data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchBooks = async () => {
      try {
        const bookIds = orderedItems.map((orderedItem) => orderedItem.idBook);
        const response = await fetch(
          `http://localhost:8080/books?id=${bookIds.join(",")}`
        );
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOder();
    fetchOderedItem();
    fetchBooks();
  }, [orders]);
  const confirmOrder =(OrderId)=>{
    if (window.confirm("Bạn có chắc chắn muốn xác nhận đơn hàng này?")) {
        fetch(`http://localhost:8080/orders/confirm/${OrderId}`, {
          method: "PUT",
        })
          .then((response) => {
            if (response.ok) {
              // Update the state with the remaining books
            }
          })
          .catch((err) => console.log(err));
      }
  }
  const DeleteOrder = (OrderId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa đơn hàng này?")) {
      fetch(`http://localhost:8080/orders/delete/${OrderId}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            // Update the state with the remaining books
          }
        })
        .catch((err) => console.log(err));
    }
  };
  const DeleteOrderedItem = (orderedItemID) => {
    if (
      window.confirm("Bạn có chắc chắn muốn xóa sách này ra khỏi đơn hàng?")
    ) {
      fetch(`http://localhost:8080/orderedItem/delete/${orderedItemID}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            // Update the state with the remaining books
          }
        })
        .catch((err) => console.log(err));
    }
  };
  
  return (
    <div class="wrapper">
      <div class="iq-sidebar">
        <div class="iq-sidebar-logo d-flex justify-content-between">
          <a href="/admin" class="header-logo">
            <img
              src="images/logo.png"
              class="img-fluid rounded-normal"
              alt=""
            />
            <div class="logo-title">
              <span class="text-primary text-uppercase">
                thư viện trực tuyến
              </span>
            </div>
          </a>
          <div class="iq-menu-bt-sidebar">
            <div class="iq-menu-bt align-self-center">
              <div class="wrapper-menu">
                <div class="main-circle">
                  <i class="las la-bars"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="sidebar-scrollbar">
          <nav class="iq-sidebar-menu">
            {isLoggedIn ? (
              <ul id="iq-sidebar-toggle" class="iq-menu">
                <li>
                  <a
                    href="/admin"
                  >
                    <i class="ri-record-circle-line "></i>Sách
                  </a>
                </li>
                <li>
                  <a href="/admin/order"  className="text-primary"  style={{ pointerEvents: "none", cursor: "none" }}>
                    <i class="ri-record-circle-line"></i>Đơn hàng
                  </a>
                </li>
                <li>
                  <Link
                    onClick={() => {
                      localStorage.removeItem("admin");
                    }}
                    to="/sign-in"
                  >
                    <i class="ri-record-circle-line"></i>Đăng Xuất
                  </Link>
                </li>
              </ul>
            ) : (
              <ul id="iq-sidebar-toggle" class="iq-menu">
                <li>
                  <a
                    href="admin-books.html"
                    className="text-primary"
                    style={{ pointerEvents: "none", cursor: "none" }}
                  >
                    <i class="ri-record-circle-line text-primary"></i>Sách
                  </a>
                </li>
                <li>
                  <a
                    href="admin-category.html"
                    style={{ pointerEvents: "none", cursor: "none" }}
                  >
                    <i class="ri-record-circle-line"></i>Đơn hàng
                  </a>
                </li>
                <li>
                  <a href="/sign-in">
                    <i class="ri-record-circle-line"></i>Đăng Nhập
                  </a>
                </li>
              </ul>
            )}
          </nav>
        </div>
      </div>
      <div class="iq-top-navbar">
        <div class="iq-navbar-custom">
          <nav class="navbar navbar-expand-lg navbar-light p-0">
            <div class="iq-menu-bt d-flex align-items-center">
              <div class="wrapper-menu">
                <div class="main-circle">
                  <i class="las la-bars"></i>
                </div>
              </div>
              <div class="iq-navbar-logo d-flex justify-content-between">
                <a href="/admin" class="header-logo">
                  <img
                    src="images/logo.png"
                    class="img-fluid rounded-normal"
                    alt=""
                  />
                  <div class="logo-title">
                    <span class="text-primary text-uppercase">
                      thư viện trực tuyến
                    </span>
                  </div>
                </a>
              </div>
            </div>
            <div class="navbar-breadcrumb">
              <h5 class="mb-0">Sách</h5>
              <nav aria-label="breadcrumb">
                <ul class="breadcrumb">
                  <li class="breadcrumb-item">
                    <a
                      href="/admin"
                      style={{ pointerEvents: "none", cursor: "none" }}
                    >
                      Admin
                    </a>
                  </li>
                  <li
                    class="breadcrumb-item active text-primary"
                    aria-current="page"
                  >
                    Sách
                  </li>
                </ul>
              </nav>
            </div>

            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-label="Toggle navigation"
            >
              <i class="ri-menu-3-line"></i>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ml-auto navbar-list">
                {isLoggedIn ? (
                  <li className="" style={{ padding: "0", display: "flex" }}>
                    <Link
                      to="/sign-in"
                      className="search-toggle iq-waves-effect d-flex align-items-center"
                      style={{ alignItems: "center" }}
                      onClick={() => {
                        localStorage.removeItem("admin");
                      }}
                    >
                      <i className="ri-login-line mr-2"></i>
                      <span>Đăng xuất</span>
                    </Link>
                  </li>
                ) : (
                  <li className="" style={{ padding: "0", display: "flex" }}>
                    <Link
                      to="/sign-in"
                      className="search-toggle iq-waves-effect d-flex align-items-center"
                      style={{ alignItems: "center" }}
                    >
                      <i className="ri-login-line mr-2"></i>
                      <span>Đăng nhập</span>
                    </Link>
                  </li>
                )}
                <li className="line-height pt-3">
                  {isLoggedIn ? (
                    <Link
                      style={{ pointerEvents: "none", cursor: "none" }}
                      className="search-toggle iq-waves-effect d-flex align-items-center"
                    >
                      <img
                        src="http://localhost:3000/images/user/default_user.png"
                        className="img-fluid rounded-circle mr-3"
                        alt="user"
                      />
                      <div className="caption">
                        <h6 className="mb-1 line-height">
                          {JSON.parse(localStorage.getItem("admin")).name}
                        </h6>
                      </div>
                    </Link>
                  ) : (
                    <Link
                      to="/sign-in"
                      className="search-toggle iq-waves-effect d-flex align-items-center"
                    >
                      <img
                        src="http://localhost:3000/images/user/default_user.png"
                        className="img-fluid rounded-circle mr-3"
                        alt="user"
                      />
                      <div className="caption">
                        <h6 className="mb-1 line-height">
                          Bạn đang chưa đăng nhập
                        </h6>
                      </div>
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
      {/* TOP Nav Bar END */}
      {/* Page Content  */}
      <div id="content-page" className="content-page">
        <div className="container-fluid checkout-content">
          <div className="row">
            <div id="cart" className="card-block show p-0 col-12">
              <div className="row ">
                <h4 className="card-title" style={{ width: "100%" }}>
                  Lịch sử mua hàng
                </h4>
              </div>
              {/*-----------------------------------------Các đơn hàng-------------------------------------------------*/}
              {orders.length!==0?(
              orders.map((order) => {
                return(
                <div className="row " key={order.id}>
                  <div className="col-lg-8">
                    <div className="iq-card">
                      <div className="iq-card-header d-flex justify-content-between iq-border-bottom mb-0">
                        <div className="iq-header-title">
                          <h4 className="card-title">Mã đơn hàng: {order.id}</h4>
                        </div>
                        <div className="col-sm-2">
                          <button
                            className="text-dark font-size-20 btn btn-outline-dar"
                            onClick={() => DeleteOrder(order.id)}
                          >
                            <i className="ri-delete-bin-7-fill"></i>
                          </button>
                        </div>
                      </div>
                      <div className="iq-card-body">
                        <ul className="list-inline p-0 m-0">
                          {/* san pham*/}

                          {orderedItems.map((orderedItem) => {
                            if (orderedItem.idOrder === order.id) {
                              const book = books.find(
                                (book) => book.id === orderedItem.idBook
                              );
                              console.log(book);
                              return (
                                <li
                                  className="checkout-product"
                                  key={orderedItem.id}
                                >
                                  {book && (
                                    <div className="row align-items-center">
                                      <div className="col-sm-2">
                                        <span className="checkout-product-img">
                                          <a
                                            href={`/book/${orderedItem.idBook}`}
                                          >
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
                                            <h5>
                                              {formatCurrency(book.price)}
                                            </h5>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-sm-6">
                                        <div className="row">
                                          <div className="col-sm-10">
                                            <div className="row align-items-center mt-2">
                                              <div className="col-sm-7 col-md-6">
                                                <input
                                                  type="text"
                                                  id="quantity"
                                                  defaultValue={
                                                    orderedItem.quantity
                                                  }
                                                  readOnly
                                                />
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
                                              onClick={() =>
                                                DeleteOrderedItem(
                                                  orderedItem.id
                                                )
                                              }
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
                            }
                            return null;
                          })}
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
                          <span>Tên khách hàng</span>
                          <span>{order.name}: </span>
                        </div>
                        <div className="d-flex justify-content-between mb-1">
                          <span>Số điện thoại: </span>
                          <span>{order.phone}</span>
                        </div>
                        <div className="d-flex justify-content-between">
                            <div style={{width: "100%",textAlign:"left"}}>
                          <span>Địa chỉ: {order.address}, Phường {order.ward}, {order.city}</span>
                          </div>                       
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between">
                          <span className="text-dark">
                            <strong>Tổng</strong>
                          </span>
                          <span className="text-dark">
                            <strong>
                              {formatCurrency(order.total)}
                            </strong>
                          </span>
                        </div>
                        <hr/>
                        <div className="d-flex justify-content-between">
                          <span className="text-dark">
                            <strong>Trạng thái</strong>
                          </span>
                          {order.status==="Chờ xác nhận"?(
                            <button className=" btn btn-warning " onClick={()=>confirmOrder(order.id)}> Nhấn để xác nhận</button>
                          ):(
                            <button className=" btn btn-success " style={{cursor:"none",pointerEvents:"none"}}> {order.status}</button>
                          )
                          }
                        </div>
                      </div>                   
                    </div>
                  </div>
                </div>
                );
              })):(
                <div>
                <hr/>
                <h4> Hiện tại chưa có đơn hàng nào</h4>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>


      {/*End Content */}
      <footer className="iq-footer">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 text-right">
              Thư viện trực tuyến By Nguyễn Thanh Hoàng - B20DCCN278
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default AdminOrder;
