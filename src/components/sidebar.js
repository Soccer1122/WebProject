import React from "react";
const SideBar = () => {
  return (
    <div className="iq-sidebar">
      <div className="iq-sidebar-logo d-flex justify-content-between">
        <a href="/" className="header-logo">
          <img
            src="images/logo.png"
            className="img-fluid rounded-normal"
            alt=""
          />
          <div className="logo-title">
            <span className="text-primary text-uppercase">
              {" "}
              Thư viện trực tuyến
            </span>
          </div>
        </a>
      </div>
      <div id="sidebar-scrollbar">
        <nav className="iq-sidebar-menu">
          <ul id="iq-sidebar-toggle" className="iq-menu">
            <li className="active active-menu">
              <a href="/" className="iq-waves-effect">
                <i className="las la-home iq-arrow-left"></i>
                <span>Trang Chủ</span>
              </a>
              <ul
                id="dashboard"
                className="iq-submenu collapse show"
                data-parent="#iq-sidebar-toggle"
              ></ul>
            </li>
            {localStorage.getItem("user") !== null ? (
              <li>
                <a
                  href="/sign-in"
                  onClick={() => {
                    localStorage.removeItem("user");
                  }}
                >
                  <i className="ri-book-line"></i> Đăng xuất{" "}
                </a>
              </li>
            ) : (
              <li>
                <a
                  href="/sign-in"
                  onClick={() => {
                    localStorage.removeItem("user");
                  }}
                >
                  <i className="ri-book-line"></i> Đăng nhập{" "}
                </a>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};
export default SideBar;
