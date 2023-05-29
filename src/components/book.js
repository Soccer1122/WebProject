import React, { useEffect, useState } from "react";
import SideBar from "./sidebar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Modal, Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
const Book = (props) => {
  const params = useParams();
  const [book, setBook] = useState({});
  const [quantity, setQuantity] = useState(1);
  const id = params.id;
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("user") !== null ? true : false;
  const [showModal, setShowModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = () => {
    if (isLoggedIn === true) {
      if(content!==""){
      let comment;
      comment = {
        content: content,
        author: JSON.parse(localStorage.getItem("user")).name,
        rating: rating,
        bookid: parseInt(id),
      };
      fetch(`http://localhost:8080/addComment/${parseInt(JSON.parse(localStorage.getItem("user")).id)}`, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(comment),
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
          console.log(data);
          setContent("");
          setRating(0);
          window.location.reload();
        })
        .catch((err) => console.log(err));
    } else{
      window.alert("Nội dung đánh giá không được bỏ trống")
    }
  }else {
      setShowModal(true);
    }
  };
  useEffect(() => {
    fetch(`http://localhost:8080/books/${id}`)
      .then((response) => response.json())
      .then((data) => setBook(data))
      .catch((err) => console.log(err));
  }, [id]);
  const formatCurrency = (value) => {
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    });

    return formatter.format(value);
  };
  useEffect(() => {
    fetch(`http://localhost:8080/comments/${id}`)
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) => console.log(error));
  }, [id]);
  const onAddToCartClick = () => {
    if (isLoggedIn === true) {
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
    } else {
      setShowModal(true);
    }
  };
  const handleModalClose = () => {
    setShowModal(false);
    navigate("/sign-in");
  };
  const handleRatingChange = (value) => {
    setRating(value);
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
                {isLoggedIn ? (
                  <div />
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
                  <a
                    href="#"
                    className="search-toggle iq-waves-effect text-gray rounded"
                  >
                    <i className="ri-shopping-cart-2-line"></i>
                    <span className="badge badge-danger count-cart rounded-circle">
                      2
                    </span>
                  </a>
                </li>
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
                      <h6 className="mb-1 line-height">Nguyễn Thanh Hoàng</h6>
                    </div>
                  </a>
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
            <div className="col-sm-12">
              <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
                <div className="iq-card-header d-flex justify-content-between align-items-center">
                  <h4 className="card-title mb-0">Thông tin</h4>
                </div>
                <div className="iq-card-body pb-0">
                  <div className="description-contens align-items-top row">
                    <div className="col-md-6">
                      <div className="iq-card-transparent iq-card-block iq-card-stretch iq-card-height">
                        <div className="iq-card-body p-0">
                          <div className="row align-items-center">
                            <div className="col-9">
                              <img
                                src={"http://localhost:3000/" + book.image}
                                className="img-fluid w-100 rounded"
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="iq-card-transparent iq-card-block iq-card-stretch iq-card-height">
                        <div className="iq-card-body p-0">
                          <h3 className="mb-3">{book.title}</h3>
                          <h3>
                            <span className="font-size-24 text-dark">
                              {formatCurrency(book.price)}
                            </span>
                          </h3>
                          <div className="mb-3 d-block">
                            <span className="font-size-20 text-warning">
                              <i className="fa fa-star mr-1"></i>
                              <i className="fa fa-star mr-1"></i>
                              <i className="fa fa-star mr-1"></i>
                              <i className="fa fa-star mr-1"></i>
                              <i className="fa fa-star"></i>
                            </span>
                          </div>
                          <span className="text-dark mb-4 pb-4 iq-border-bottom d-block">
                            {book.des}
                          </span>
                          <div className="text-primary mb-4">
                            Tác giả:{" "}
                            <span className="text-body">{book.author} </span>
                          </div>
                          <div>
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
                            />{" "}
                            <br />
                            <button
                              style={{ border: "none", outline: "none" }}
                              className="btn btn-primary view-more mr-2"
                              onClick={onAddToCartClick}
                            >
                              Thêm vào giỏ hàng
                            </button>
                          </div>
                          <br />
                          <br />
                          <br />
                          <h3>Đánh giá của bạn</h3>

                          
                           
                              <div className="row">                           
                                    <textarea
                                      id="content"
                                      className="form-control"
                                      value={content}
                                      onChange={(e) =>
                                      setContent(e.target.value)
                                      }
                                      lang="vi-VN"                                     
                                    ></textarea>
                              </div>

                              <div className="form-group">
                                <label htmlFor="rating">
                                  Bạn thấy sách thế nào
                                </label>

                                <div className="rating">
                                  {[1, 2, 3, 4, 5].map((value) => (
                                    <label key={value} className="star">
                                      <input
                                        type="radio"
                                        name="rating"
                                        value={value}
                                        checked={value === rating}
                                        onChange={() =>
                                          handleRatingChange(value)
                                        }
                                        style={{ appearance: "none" }}
                                      />
                                      <span
                                        className={`icon ${
                                          value <= rating
                                            ? "text-warning"
                                            : "star-icon-dark"
                                        }`}
                                      >
                                        <FontAwesomeIcon icon={faStar} />
                                      </span>
                                    </label>
                                  ))}
                                </div>
                              </div>
                         

                            <button onClick={handleSubmit} className="btn btn-primary">
                              Thêm nhận xét
                            </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ textAlign: "left" }} className="col-md-12">
          <h2> Đánh giá về sách này</h2>
          <br />
          {comments.length===0 ? (
                  <Card style={{ height: "auto" }}>
                  <Card.Body>                   
                    <h2 style={{textAlign:"center"}}>Chưa có đánh giá về sách này</h2>
                  </Card.Body>
                </Card>
                ) : (
          <div>
          {comments.slice().reverse().map((comment) => (
            <Card style={{ height: "auto"}}>
              <Card.Body>
                <Card.Title style={{ fontSize: "16px" }}>
                  {comment.author}
                </Card.Title>
                <span className="font-size-15 text-warning">
                {[1, 2, 3, 4, 5].map((value) => (
                                    <label key={value} className="star">                                   
                                      <span
                                        className={`icon ${
                                          value <= comment.rating
                                            ? "text-warning"
                                            : "star-icon-dark"
                                        }`}
                                      >
                                        <FontAwesomeIcon icon={faStar} />
                                      </span>
                                    </label>
                                  ))}
                </span>
                <p style={{ fontSize: "16px" }}>{comment.content} </p>
              </Card.Body>
            </Card>
          ))}
          </div>
                )}
        </div>
      </div>

      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
        }}
      >
        <Modal.Header closeButton>
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
    </div>
  );
};
export default Book;
