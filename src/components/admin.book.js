import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
function AdminBook(props) {
  const params = useParams();
  const [book, setBook] = useState({});
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("admin") !== null ? true : false;
  const id = params.id;
  const [categories, setCategories] = useState([]);
  const [clickEdit, setClickEdit] = useState( id==-1?  true :false);
  useEffect(() => {
    fetch("http://localhost:8080/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
  }, []);
  const onSaveClick = () => { 
    if(book.title!=="" && book.author!=="" && book.des!=="" && book.releaseDate!=="" && book.numberOfPages!==""&& book.category!=="" && book.category!=="-- Chọn thể loại --" && book.image!=null &&book.price!=="" ){
    if (id < 0) {
      if(window.confirm("Bạn có chắc chắn muốn thêm sách này")){
      fetch(`http://localhost:8080/books/save`, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(book),
        headers: {
          "Content-Type": "application/json;",
        },
      })
      .then((response) => {
        if (response.ok) {
          alert("Thêm mới sách thành công!");
        } else {
          alert("Sách đã tồn tại trong CSDL!");
        }
        return response.json();
      })        
        .catch((err) => console.log(err));
      navigate("/admin");
    }
    } else {
      if(window.confirm("Bạn có chắc chắn muốn lưu thay đổi sách này")){
        fetch(`http://localhost:8080/books/save/${id}`, {
          method: "PUT",
          mode: "cors",
          body: JSON.stringify(book),
          headers: {
            "Content-Type": "application/json;",
          },
        })
          .then((response) => {
            if (response.ok) {
              alert("Lưu sách thành công!");
            } else {
              alert("Sửa không thành công sách đã tồn tại trong CSDL!");
            }
            return response.json();
          })        
          .catch((err) => console.log(err));
        setClickEdit(false);
        navigate("/admin");        
    }
  }
  }else{
    window.alert("Bạn cần nhập đủ thông tin của sách")
  };
  }
  useEffect(() => {
    fetch(`http://localhost:8080/books/${id}`)
      .then((response) => response.json())
      .then((data) => setBook(data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setBook({ ...book, image: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
    else{
      setBook({ ...book, image: null });
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
                    className="text-primary"
                  >
                    <i class="ri-record-circle-line text-primary"></i>Sách
                  </a>
                </li>
                <li>
                  <a href="admin-category.html">
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
      <div id="content-page" class="content-page">
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-12">
              <div class="iq-card">
                <div class="iq-card-header d-flex justify-content-between">
                  <div class="iq-header-title">
                    <h4 class="card-title">Chi tiết sách</h4>
                  </div>
                </div>
                <div class="iq-card-body ">
                  <form className="row">
                    <div
                      className="col-sm-6 col-xs-12"
                      style={{ textAlign: "left" }}
                    >
                      <div className="row">
                        <div class="col-sm-6 col-xs-12">
                          <label>Tiêu đề </label>
                          <br />
                          <input disabled={clickEdit===false} type="text" value={book.title}  onChange={(e) => setBook({ ...book, title: e.target.value })} />
                        </div>
                        <div class="col-sm-6 col-xs-12">
                          <label>Tên tác giả</label>
                          <br />
                          <input disabled={clickEdit===false} type="text" value={book.author}  onChange={(e) => setBook({ ...book, author: e.target.value })} />
                        </div>
                      </div>
                      <br />
                      <br />
                      <div className="row">
                        <label className="col-6"> Mô tả về sách </label>
                        <br />
                        <textarea
                          disabled={clickEdit===false}
                          className="col-12"
                          style={{ minHeight: "200px" }}
                          value={book.des}
                          onChange={(e) => setBook({ ...book, des: e.target.value })}
                          
                        ></textarea>
                      </div>
                      <br />
                      <br />
                      <div className="row">
                        <div class="col-sm-6 col-xs-12">
                          <label>Ngày phát hành</label>
                          <br />
                          <input disabled={clickEdit===false} type="date" value={book.releaseDate} onChange={(e) => setBook({ ...book, releaseDate: e.target.value })} />
                        </div>
                        <div class="col-sm-6 col-xs-12">
                          <label>Số trang</label>
                          <br />
                          <input disabled={clickEdit===false} type="number" value={book.numberOfPages} onChange={(e) => setBook({ ...book, numberOfPages: e.target.value })} />
                        </div>
                      </div>
                      <br />
                      <br />
                      <div className="row">
                        <div className="col-sm-6 col-xs-12">
                        <label > Thể loại </label>
                        <br/>
                        <select disabled={clickEdit===false}  value={book.category}  onChange={(e) => setBook({ ...book, category: e.target.value })}>     
                        <option disabled={id!=='-1'} value="">-- Chọn thể loại --</option>                   
                          {categories.map((category) => (
                            <option key={category.id}> {category.name}</option>
                          ))}
                        </select>
                        </div>
                        <div className="col-sm-6 col-xs-12">
                        <label>Giá</label>
                          <br />
                          <input disabled={clickEdit===false} type="number" value={book.price} onChange={(e) => setBook({ ...book, price: e.target.value })} />
                        </div>
                      </div>
                    </div>

                    <div class="col-sm-6 col-xs-12">
                      <input
                      disabled={clickEdit===false}
                        type="file"
                        onChange={handleImageUpload}
                        accept="image/*"

                      />
                      <br />
                      <br />

                      <div
                        style={{
                          width: "450px",
                          height: "600px",
                          border: "1px solid black",
                          overflow: "hidden",
                        }}
                      >
                        {book.image && (
                          <img
                            src={ book.image}
                            alt="Selected"
                            style={{
                              objectFit: "cover",
                              width: "100%",
                              height: "100%",
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="iq-footer">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 text-right">
              Thư viện trực tuyến By Nguyễn Thanh Hoàng - B20DCCN278
            </div>
            { id==-1 ? (
              <div className="col-lg-6 text-right">
                <button className="btn btn-primary col-5 " onClick={onSaveClick}>Add</button>
              </div>
            ) : ( 
              clickEdit ===true  ? (
                <div className="col-lg-6 text-right">
                <button className="btn btn-primary col-5 " onClick={onSaveClick}>Save</button>
              </div>
              ):(
                <div className="col-lg-6 text-right">
                <button className="btn btn-primary col-5 " onClick={()=>setClickEdit(true)}>Edit</button>
              </div>
              )
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
export default AdminBook;
