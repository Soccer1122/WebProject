import React from "react";
const Header =()=>{
    return(
     <div className="iq-top-navbar">
        <div className="iq-navbar-custom">
           <nav className="navbar navbar-expand-lg navbar-light p-0">
              <div className="iq-menu-bt d-flex align-items-center">               
                 <div className="iq-navbar-logo d-flex justify-content-between">
                    <a href="/home" className="header-logo">
                       <img src="images/logo.png" className="img-fluid rounded-normal" alt=""/>
                       <div className="logo-title">
                          <span className="text-primary text-uppercase">Trang chủ</span>
                       </div>
                    </a>
                 </div>
              </div>
              <div className="navbar-breadcrumb">             
              </div>
              <div className="iq-search-bar">
                 <form action="#" className="searchbox" onSubmit={()=>{}}>
                    <input type="text" className="text search-input" placeholder="Tìm kiếm sản phẩm..." name="search"/>
                    <a className="search-link" href="#"><i className="ri-search-line"></i></a>
                 </form>
              </div>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                 <ul className="navbar-nav ml-auto navbar-list">                               
                    <li className="nav-item nav-icon dropdown">
                       <a href="#" className="search-toggle iq-waves-effect text-gray rounded">
                       <i className="ri-shopping-cart-2-line"></i>
                       <span className="badge badge-danger count-cart rounded-circle">2</span>
                       </a>                     
                    </li>
                    <li className="line-height pt-3">
                       <a href="#" className="search-toggle iq-waves-effect d-flex align-items-center">
                          <img src="images/user/default_user.png" className="img-fluid rounded-circle mr-3" alt="user"/>
                          <div className="caption">
                             <h6 className="mb-1 line-height">Nguyễn Thanh Hoàng</h6>
                             <p className="mb-0 text-primary">Tài Khoản</p>
                          </div>
                       </a>                   
                    </li>
                 </ul>
              </div>
           </nav>
        </div>
     </div>
    );
};
export default Header;
