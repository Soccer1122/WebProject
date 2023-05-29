import axios from "axios";
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const [name, SetName] = useState("");
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPass, setErrorPass] = useState("");
const [response, SetResponse] = useState("");
const signUpSubmit = ()=> {
  if(name !== "" && email !== "" && password !== ""){
  let user;
        user = {
          name: name,
          password: password,
          email: email,
          role: 'user'
        };
      fetch(`http://localhost:8080/sign-up`, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(user),
            headers: {
          "Content-Type": "application/json",
            },
      })
        .then((response) => {
          console.log(response)
          if (response.ok) {
            return "thành công";           
    } else {
            return "thất bại";    
      }
        })
        .then((data) => {
          console.log(data)
          setShowModal(true)
          SetResponse(data)
        })
        .catch((error) => {
          console.log(error); 
        });    
      }
      else {
        if (email === "") {
          setErrorEmail("Vui lòng nhập email");
        }
        if (password === "") {
          setErrorPass("Vui lòng nhập password");
        }
        if (name === "") {
          setErrorName("Vui lòng nhập tên");
        }
      }
}
  const handleModalClose = () => {
    setShowModal(false);
  if(response==="thành công")
  navigate("/sign-in");
  else{

    }
  };
  return (
    <div>
      <div className="sign-in-page">
        <div className="container p-0">
          <div className="row no-gutters height-self-center">
            <div className="col-sm-12 align-self-center page-content rounded">
              <div className="row m-0">
                <div className="col-sm-12 sign-in-page-data">
                  <div className="sign-in-from bg-primary rounded">
                    <h3 className="mb-0 text-center text-white">Sign Up</h3>
                    <p className="text-center text-white">
                      Enter your email address and password to access admin
                      panel.
                    </p>
                    <div className="mt-4 form-text">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">
                          Your Full Name
                        </label>
                        <input
                          type="text"
                          className="form-control mb-0"
                          id="exampleInputEmail1"
                          placeholder="Your Full Name"
                          onChange={(e) => SetName(e.target.value)}
                        />
                        {errorName && (
                          <p style={{ color: "red" }}>{errorName}</p>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail2">
                          Email address
                        </label>
                        <input
                          type="email"
                          className="form-control mb-0"
                          id="exampleInputEmail2"
                          placeholder="Enter email"
                          onChange={(e) => SetEmail(e.target.value)}
                        />
                        {errorEmail && (
                          <p style={{ color: "red" }}>{errorEmail}</p>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input
                          type="password"
                          className="form-control mb-0"
                          id="exampleInputPassword1"
                          placeholder="Password"
                          onChange={(e) => SetPassword(e.target.value)}
                        />
                        {errorPass && (
                          <p style={{ color: "red" }}>{errorPass}</p>
                        )}
                      </div>
                      <div className="sign-info text-center">
                        <button
                          className="btn btn-white d-block w-100 mb-2"
                          onClick={signUpSubmit}
                        >
                          Sign Up
                        </button>
                        <span className="text-dark d-inline-block line-height-2">
                          Already Have Account ?{" "}
                          <a href="/sign-in" className="text-white">
                            Sign In
                          </a>
                        </span>
                      </div>
                    </div>
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
              <span style={{color:"green"}}>
              Đăng kí thành công! Nhấn OK để chuyển tới trang đăng nhập
                </span>
                </div>
          ) : (
            <div>
              <span style={{color:"red"}}>Đăng kí không thành công! Email của bạn đã tồn tại hãy sử dụng
              email khác!</span>          
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
export default SignUp;
