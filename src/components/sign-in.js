import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPass, setErrorPass] = useState("");
  const navigate = useNavigate();

  const handlSubmit = async (e) => {
    e.preventDefault();
    setErrorEmail("");
    setErrorPass("");
    if (email !== "" && password !== "") {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      try {
        // Gửi thông tin đăng nhập qua API
        const response = await axios.post(
          "http://localhost:8080/login",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // Kiểm tra xác thực thành công
        if (response.status === 200) {
          // Chuyển hướng đến trang chủ
          localStorage.setItem("user", JSON.stringify(response.data.data));
          if (response.data.data.role === "admin") navigate("/admin");
          else 
          navigate("/");
        }
      } catch (error) {
        console.error("Đăng nhập thất bại:", error);
        setErrorEmail("Sai email hoặc mật khẩu");
      }
    } else {
      if (email === "") {
        setErrorEmail("Vui lòng nhập email");
      }
      if (password === "") {
        setErrorPass("Vui lòng nhập password");
      }
    }
  };

  return (
    <div className="sign-in-page" style={{fontFamily: 'Roboto,sans-serif'}}>
            <div className="container p-0">
                <div className="row no-gutters height-self-center">
                  <div className="col-sm-12 align-self-center page-content rounded">
                    <div className="row m-0">
                      <div className="col-sm-12 sign-in-page-data">
                          <div className="sign-in-from bg-primary rounded">
                              <h3 className="mb-0 text-center text-white">Sign in</h3>
                              <p className="text-center text-white">Enter your email address and password to access admin panel.</p>
                              <form className="mt-4 form-text" onSubmit={handlSubmit}>
                                  <div className="form-group">
                                      <label htmlFor="exampleInputEmail1">Email address</label>
                                      <input type="email" className="form-control mb-0" id="exampleInputEmail1" placeholder="Enter email" name="email"  onChange={(e) => setEmail(e.target.value)}/>
                                      {errorEmail && <p style={{ color: "red" }}>{errorEmail}</p>}
                                  </div>
                                  <div className="form-group">
                                      <label htmlFor="exampleInputPassword1" style={{textAlign:"left"}}>Password</label>                                   
                                      <input type="password" className="form-control mb-0" id="exampleInputPassword1" placeholder="Password" name="pasword" onChange={(e) => setPassword(e.target.value)}/>
                                    {errorPass && <p style={{ color: "red" }}>{errorPass}</p>}
                                    </div>
                                  <div className="sign-info text-center">
                                      <button type="submit" className="btn btn-white d-block w-100 mb-2">Sign in</button>
                                      <span className="text-dark dark-color d-inline-block line-height-2">Don't have an account? <a href="/sign-up" className="text-white">Sign up</a></span>
                                  </div>
                              </form>
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        </div>
  );
};

export default SignIn;
