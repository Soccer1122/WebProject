import React from "react";
const SideBar = ()=>{
    return(
        <div className="iq-sidebar">
            <div className="iq-sidebar-logo d-flex justify-content-between">
               <a href="/home" className="header-logo">
                  <img src="images/logo.png" className="img-fluid rounded-normal" alt=""/>
                  <div className="logo-title">
                     <span className="text-primary text-uppercase"> Thư viện trực tuyến</span>
                  </div>
               </a>
            </div>
            <div id="sidebar-scrollbar">
               <nav className="iq-sidebar-menu">
                  <ul id="iq-sidebar-toggle" className="iq-menu">
                     <li className="active active-menu">
                        <a href="/home" className="iq-waves-effect" data-toggle="collapse" aria-expanded="true"><span className="ripple rippleEffect"></span><i className="las la-home iq-arrow-left"></i><span>Trang Chủ</span></a>
                        <ul id="dashboard" className="iq-submenu collapse show" data-parent="#iq-sidebar-toggle">
                        </ul>
                     </li>                   
                     <li><a href="/"><i className="ri-book-line"></i>Sign out</a></li>

                  </ul>
               </nav>
            </div>
         </div>
    )
}
export default SideBar;