import { useEffect, useState } from "react";
import SideBar from "./sidebar";
import Footer from "./footer";
const History = () => {
  const id = JSON.parse(localStorage.getItem("user")).id;
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
        const response = await fetch(`http://localhost:8080/orders/${id}`);
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
  }, [id]);
  const DeleteOrder = (OrderId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa đơn hàng này?")) {
      fetch(`http://localhost:8080/orders/delete/${OrderId}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            // Update the state with the remaining books
            window.location.reload();
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
            window.location.reload();
          }
        })
        .catch((err) => console.log(err));
    }
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
                  <a
                    href="#"
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
                    </div>
                  </a>
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
                          <h4 className="card-title">Đơn hàng của bạn</h4>
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
                                                "http://localhost:3000/" +
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
                          <span>Tổng</span>
                          <span>{formatCurrency(order.total *100/105)}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-1">
                          <span>Thuế VAT (5%)</span>
                          <span>{formatCurrency((order.total *100/105 * 5) / 100)}</span>
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
                            <button className=" btn btn-warning "> {order.status}</button>
                          ):(
                            <button className=" btn btn-success "> {order.status}</button>
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
                <h4> Hiện tại bạn chưa có đơn hàng nào</h4>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};
export default History;
