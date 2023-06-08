import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./footer";
function Admin(props) {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const isLoggedIn = localStorage.getItem("admin") !== null ? true : false;
  useEffect(() => {
    fetch("http://localhost:8080/books")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((err) => console.log(err));
  }, [books]);
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const confirmDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sách này vì nó cũng sẽ được xóa trên những đơn hàng và giỏ hàng chứa nó của khách hàng?")) {
      // Call the delete API endpoint and update the state
      fetch(`http://localhost:8080/delete/${id}`, { method: "DELETE" })
        .then((response) => {
          if (response.ok) {
            // Update the state with the remaining books
            setBooks(books.filter((book) => book.id !== id));
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
                    href="admin-books.html"
                    className="text-primary"
                    style={{ pointerEvents: "none", cursor: "none" }}
                  >
                    <i class="ri-record-circle-line text-primary"></i>Sách
                  </a>
                </li>
                <li>
                  <a href="/admin/order">
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
                  <a href="admin-category.html"
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
      <div id="content-page" class="content-page">
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-12">
              <div class="iq-card">
                <div class="iq-card-header d-flex justify-content-between">
                  <div class="iq-header-title">
                    <h4 class="card-title">Danh sách sách</h4>
                  </div>
                  {isLoggedIn ? (
                  <div class="iq-card-header-toolbar d-flex align-items-center">
                    <button  class="btn btn-primary"
                    onClick={() => {navigate(`/admin/book/${-1}`);}}>
                      Thêm sách
                    </button>
                  </div>
                  ):(
                    <div>

                    </div>
                  )}
                </div>
                <div class="iq-card-body">
                  <div class="table-responsive">
                    <table
                      class="data-tables table table-striped table-bordered"
                      style={{ width: "100%" }}
                    >
                      <thead className="table-warning">
                        <tr>
                          <th style={{ width: " 7%" }}> STT</th>
                          <th style={{ width: " 15%" }}> Tiêu đề</th>
                          <th style={{ width: "15%" }}>Tác giả</th>
                          <th style={{ width: "15%" }}>Thể loại</th>
                          <th style={{ width: "12%" }}>Ngày phát hành</th>
                          <th style={{ width: "7%" }}>Số trang</th>
                          <th style={{ width: "7%" }}>Số lượng đã bán</th>
                          <th style={{ width: " 7%" }}>Giá</th>
                          <th style={{ width: "15%" }}>Hoạt động</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredBooks.map((book, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.category}</td>
                            <td>{book.releaseDate}</td>
                            <td>{book.numberOfPages}</td>
                            <td>{book.sold}</td>
                            <td>{book.price}</td>
                            {isLoggedIn ? (
                            <td>
                              <div class="flex align-items-center list-user-action">
                                <button
                                  class="btn btn-primary"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title=""
                                  data-original-title="Edit"
                                  onClick={() => {navigate(`/admin/book/${book.id}`);}}
                                >
                                  <i class="ri-eye-fill"></i>
                                </button>
                                <button
                                  class="btn btn-danger"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title=""
                                  data-original-title="Xoá"
                                  onClick={() => confirmDelete(book.id)}
                                >
                                  <i class="ri-delete-bin-line"></i>
                                </button>
                              </div>
                            </td>
                            ):(
                              <div></div>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
}
export default Admin;
