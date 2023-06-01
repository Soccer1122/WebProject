import { useState } from "react";
import SideBar from "./sidebar";
import { Link, useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";

const Checkout = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [ward, setWard] = useState("");
  const [typeOfAddress, setTypeOfAddress] = useState("Nhà riêng");
  const [nameError, setNameError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [cityError, setCityError] = useState("");
  const [total, setTotal] = useState("");
  const [wardError, setWardError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [response, SetResponse] = useState("");
  const navigate = useNavigate();
  const formatCurrency = (value) => {
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    return formatter.format(value);
  };
  const addOrder = async (e) => {
    if (window.confirm("Bạn có chắc chắn muốn đặt hàng")) {
      e.preventDefault();
      setNameError("");
      setAddressError("");
      setPhoneError("");
      setCityError("");
      setWardError("");
      {
        if (
          name !== "" &&
          phone !== "" &&
          address !== "" &&
          city !== "" &&
          ward !== ""
        ) {
          let order;
          order = {
            name: name,
            phone: phone,
            address: address,
            city: city,
            ward: ward,
            typeOfAddress: typeOfAddress,
            idUser: parseInt(JSON.parse(localStorage.getItem("user")).id),
            total:
              parseInt(JSON.parse(localStorage.getItem("totalAmount")) * 105) /
              100,
          };
          fetch(`http://localhost:8080/addOrder`, {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(order),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => {
              console.log(response);
              if (response.ok) {
                return "thành công";
              } else {
                return "thất bại";
              }
            })
            .then((data) => {
              console.log(data);
              localStorage.removeItem("totalAmount");
              setShowModal(true);
              SetResponse(data);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          if (name === "") {
            setNameError("Vui lòng nhập tên");
          }
          if (phone === "") {
            setPhoneError("Vui lòng nhập số điện thoại");
          }
          if (address === "") {
            setAddressError("Vui lòng nhập địa chỉ");
          }
          if (city === "") {
            setCityError("Vui lòng nhập thành phố");
          }
          if (ward === "") {
            setWardError("Vui lòng nhập phường");
          }
        }
      }
    }
  };
  const handleModalClose = () => {
    setShowModal(false);
    if (response === "thành công") navigate("/");
    else {
    }
  };
  return (
    <div className="wrapper">
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
      {/*-------------------------end header------------------------------------------------- */}
      <div id="content-page" className="content-page">
        <div className="container-fluid checkout-content">
          <div id="address" className="card-block p-0 col-12">
            <div className="row align-item-center">
              <div className="col-lg-8" style={{ textAlign: "left" }}>
                <div className="iq-card">
                  <div className="iq-card-header d-flex justify-content-between">
                    <div className="iq-header-title">
                      <h4 className="card-title">Thêm địa chỉ mới</h4>
                    </div>
                  </div>
                  <div className="iq-card-body">
                    <div className="row mt-3">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Họ và tên: *</label>
                          <input
                            type="text"
                            className="form-control"
                            name="fname"
                            onChange={(e) => setName(e.target.value)}
                          />
                          {nameError && (
                            <p style={{ color: "red" }}>{nameError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Số điện thoại: *</label>
                          <input
                            type="text"
                            className="form-control"
                            name="mno"
                            onChange={(e) => setPhone(e.target.value)}
                          />
                          {phoneError && (
                            <p style={{ color: "red" }}>{phoneError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Địa chỉ: *</label>
                          <input
                            type="text"
                            className="form-control"
                            name="houseno"
                            onChange={(e) => setAddress(e.target.value)}
                          />
                          {addressError && (
                            <p style={{ color: "red" }}>{addressError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Tỉnh/thành phố: *</label>
                          <input
                            type="text"
                            className="form-control"
                            name="city"
                            onChange={(e) => setCity(e.target.value)}
                          />
                          {cityError && (
                            <p style={{ color: "red" }}>{cityError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Phường: *</label>
                          <input
                            type="text"
                            className="form-control"
                            name="state"
                            onChange={(e) => setWard(e.target.value)}
                          />
                          {wardError && (
                            <p style={{ color: "red" }}>{wardError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="addtype">Loại địa chỉ</label>
                          <select
                            className="form-control"
                            id="addtype"
                            onChange={(e) => setTypeOfAddress(e.target.value)}
                          >
                            <option>Nhà riêng</option>
                            <option>Công ty</option>
                          </select>
                        </div>
                      </div>
                    </div>
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
                      <span>
                        {formatCurrency(
                          JSON.parse(localStorage.getItem("totalAmount"))
                        )}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between mb-1">
                      <span>Thuế VAT (5%)</span>
                      <span>
                        {formatCurrency(
                          (JSON.parse(localStorage.getItem("totalAmount")) *
                            5) /
                            100
                        )}
                      </span>
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
                          {formatCurrency(
                            (JSON.parse(localStorage.getItem("totalAmount")) *
                              105) /
                              100
                          )}
                        </strong>
                      </span>
                    </div>
                    <div className="d-grid gap-2">
                      <button
                        style={{ width: "100%" }}
                        id="place-order"
                        className="btn btn-primary"
                        onClick={addOrder}
                      >
                        Đặt hàng
                      </button>
                    </div>
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
          {response === "thành công" ? (
            <div>
              <span style={{ color: "green" }}>
                Đặt hàng thành công! Nhấn OK để tiếp tục mua sách
              </span>
            </div>
          ) : (
            <div>
              <span style={{ color: "red" }}>
                Đặt hàng không thành công! Số điện thoại của bạn không đúng định
                dạng!
              </span>
            </div>
          )}
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
export default Checkout;
