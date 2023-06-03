import React, { useEffect, useState } from "react";
import SideBar from "./sidebar";
import Footer from "./footer";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
const Home = (props) => {
  const isLoggedIn = localStorage.getItem("user") !== null ? true : false;
  const [searchTerm, setSearchTerm] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [comments, setComments] = useState([]);
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    fetch("http://localhost:8080/books")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((err) => console.log(err));
  }, []);
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
    fetch(`http://localhost:8080/comments`)
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) => console.log(error));
  }, []);
  const formatCurrency = (value) => {
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    return formatter.format(value);
  };
  const onAddToCartClick = (id) => {
    if (isLoggedIn === true) {
      if (window.confirm("Bạn có chắc chắn muốn thêm sách này vào giỏ hàng")) {
        console.log(quantity);
        let cart;
        if (typeof quantity === "number") {
          cart = {
            userid: parseInt(JSON.parse(localStorage.getItem("user")).id),
            bookid: parseInt(id),
            quantity: quantity,
          };
        } else {
          cart = {
            userid: parseInt(JSON.parse(localStorage.getItem("user")).id),
            bookid: parseInt(id),
            quantity: parseInt(quantity.quantity),
          };
        }
        console.log(typeof quantity);
        console.log(JSON.stringify(cart));
        fetch(`http://localhost:8080/addToCart`, {
          method: "POST",
          mode: "cors",
          body: JSON.stringify(cart),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (response.ok) {
              return "thành công";
            } else {
              throw new Error("Something went wrong");
            }
          })
          .then((data) => {
            console.log(data); // Xử lý kết quả từ server
            window.location.reload();
          })
          .catch((error) => {
            console.log(error); // Xử lý lỗi
          });
      }
    } else {
      setShowModal(true);
    }
  };
  const handleModalClose = () => {
    setShowModal(false);
    navigate("/sign-in");
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
                    src="images/logo.png"
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
            <div className="navbar-breadcrumb"></div>
            <div className="iq-search-bar">
              <form action="#" className="searchbox" onSubmit={() => {}}>
                <input
                  type="text"
                  className="text search-input"
                  placeholder="Tìm kiếm sản phẩm..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="search-link">
                  <i className="ri-search-line"></i>
                </div>
              </form>
            </div>

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
                        localStorage.removeItem("user");
                        localStorage.removeItem("totalAmount");
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
                <li className="nav-item nav-icon dropdown">
                  {isLoggedIn ? (
                    <Link
                      to={`/cart/${
                        JSON.parse(localStorage.getItem("user")).id
                      }`}
                      className="search-toggle iq-waves-effect text-gray rounded"
                    >
                      <i className="ri-shopping-cart-2-line"></i>
                      <span className="badge badge-danger count-cart rounded-circle"></span>
                    </Link>
                  ) : (
                    <Link
                      to="/sign-in"
                      className="search-toggle iq-waves-effect text-gray rounded"
                    >
                      <i className="ri-shopping-cart-2-line"></i>
                    </Link>
                  )}
                </li>
                <li className="line-height pt-3">
                  {isLoggedIn ? (
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

      {/*---------------   End Header  ---------------------------------------------- */}
      <div id="content-page" className="content-page">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
                <div className="iq-card-header d-flex justify-content-between align-items-center position-relative">
                  <div className="iq-header-title">
                    <h4 className="card-title mb-0">Danh mục sách</h4>
                  </div>
                </div>
                <div className="iq-card-body">
                  <div className="row">
                    {filteredBooks.map((book) => {
                      let tong = 0;
                      let dem = 0;
                      comments.forEach((comment) => {
                        if (book.id === comment.bookid) tong += comment.rating;
                        dem += 1;
                      });
                      tong=Math.ceil(tong/dem)
                      return (
                        <div
                          className="col-sm-6 col-md-4 col-lg-3"
                          key={book.id}
                        >
                          <div className="iq-card iq-card-block iq-card-stretch iq-card-height browse-bookcontent">
                            <div className="iq-card-body p-0">
                              <div className="d-flex align-items-center">
                                <div className="col-6 p-0 position-relative image-overlap-shadow">
                                  <img
                                    className="img-fluid rounded w-100"
                                    src={book.image}
                                    alt={book.title}
                                  />
                                  <div className="view-book">
                                    <button
                                      className="btn btn-sm btn-white"
                                      onClick={() => {
                                        navigate(`/book/${book.id}`);
                                      }}
                                    >
                                      Chi tiết
                                    </button>
                                  </div>
                                </div>
                                <div className="col-6">
                                  <div className="mb-2">
                                    <h6 className="mb-1">{book.title}</h6>
                                    <p className="font-size-13 line-height mb-1">
                                      {book.author}
                                    </p>
                                    <div className="d-block line-height">
                                      <span className="font-size-15 text-warning">
                                        {[1, 2, 3, 4, 5].map((value) => (
                                          <label key={value} className="star">
                                            <span
                                              className={`icon ${
                                                value <= tong
                                                  ? "text-warning"
                                                  : "star-icon-dark"
                                              }`}
                                            >
                                              <FontAwesomeIcon icon={faStar} />
                                            </span>
                                          </label>
                                        ))}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="price d-flex align-items-center">
                                    <h6>
                                      <b>{formatCurrency(book.price)}</b>
                                    </h6>
                                  </div>
                                  <div className="iq-product-action">
                                    <input
                                      style={{
                                        width: "40px",
                                        height: "20px",
                                        padding: "0",
                                      }}
                                      type="number"
                                      min={1}
                                      defaultValue={1}
                                      name="quantity"
                                      onChange={(e) =>
                                        setQuantity({
                                          ...quantity,
                                          quantity: e.target.value,
                                        })
                                      }
                                    />
                                    <button
                                      style={{
                                        border: "none",
                                        outline: "none",
                                      }}
                                      onClick={() => onAddToCartClick(book.id)}
                                    >
                                      <i className="ri-shopping-cart-2-fill text-primary"></i>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
        }}
      >
        <Modal.Header>
          <Modal.Title>Thông báo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn cần đăng nhập để thực hiện thao tác này. Bấm OK để chuyển đến
          trang đăng nhập.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
      <Footer/>
    </div>
  );
};
export default Home;
