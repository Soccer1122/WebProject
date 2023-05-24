import React, { useEffect, useState } from "react";
import Header from "./header";
import SideBar from "./sidebar";
import { useNavigate } from "react-router-dom";
const Home = (props) => {
   const [books, setBooks] = useState([]);
   const navigate = useNavigate();
   useEffect(() => {
     fetch("http://localhost:8080/books")
       .then((response) => response.json())
       .then((data) => setBooks(data))
       .catch((err) => console.log(err));
   }, []);
    return (
      <div>
         <SideBar/>
         <Header/>
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
                   {books.map((book) => (
                      <div className="col-sm-6 col-md-4 col-lg-3" key={book.id}>
                         <div className="iq-card iq-card-block iq-card-stretch iq-card-height browse-bookcontent">
                            <div className="iq-card-body p-0">
                               <div className="d-flex align-items-center">
                                  <div className="col-6 p-0 position-relative image-overlap-shadow" >
                                     <img className="img-fluid rounded w-100" src={book.image}alt={book.title}/>
                                     <div className="view-book">
                                        <button className="btn btn-sm btn-white" onClick={() => {navigate(`/home/${book.id}`);}}>Chi tiết</button>
                                     </div>
                                  </div>
                                  <div className="col-6">
                                     <div className="mb-2">
                                        <h6 className="mb-1">{book.title}</h6>
                                        <p className="font-size-13 line-height mb-1">{book.author}</p>
                                        <div className="d-block line-height">                                         
                                           <span className="font-size-11 text-warning">
                                              <i className="fa fa-star"></i>
                                              <i className="fa fa-star"></i>
                                              <i className="fa fa-star"></i>
                                              <i className="fa fa-star"></i>
                                              <i className="fa fa-star"></i>
                                           </span>                                             
                                        </div>
                                     </div>
                                     <div className="price d-flex align-items-center">
                                        <h6><b>{book.price} đ</b></h6>
                                     </div>
                                     <div className="iq-product-action">
                                       <form action="http://localhost:8080/addToCart" method="post" >
                                       <input type="hidden" name="bookId" value={book.id} />
                                       <input style={{width:'40px',height:'20px',padding:'0'}} type="number" min={1} defaultValue={1} name="quantity"/>                                  
                                       <button type="submit" style={{border: 'none', outline:'none'}}><i className="ri-shopping-cart-2-fill text-primary"></i></button>                                    
                                       </form>
                                     </div>                                      
                                  </div>
                               </div>
                            </div>
                         </div>
                      </div>  
                           ))}              
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
 </div>
 </div>
);
}
export default Home;