import React, { useEffect, useState } from "react";
import SideBar from "./sidebar";
import { useParams } from "react-router-dom";
import Header from "./header";
const Book = (props) => {
  const params = useParams();
  const [book, setBook] = useState({});
  const id = params.id;
  useEffect(() => {
    fetch(`http://localhost:8080/books/${id}`)
      .then((response) => response.json())
      .then((data) => setBook(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <SideBar />
      <Header/>
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
                                src={book.image}
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
                          <div className="price d-flex align-items-center font-weight-500 mb-2">
                            <span className="font-size-20 pr-2 old-price">
                              350000 ₫
                            </span>
                            <span className="font-size-24 text-dark">
                              {book.price} ₫
                            </span>
                          </div>
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
                          <div className="mb-4 d-flex align-items-center">
                            <a
                              href="checkout.html"
                              className="btn btn-primary view-more mr-2"
                            >
                              Thêm vào giỏ hàng
                            </a>                         
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Book;
