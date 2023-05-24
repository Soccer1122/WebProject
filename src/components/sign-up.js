import React from "react";
const SignUp = () => {
  return (
    <div>
      <section className="sign-in-page">
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
                    <form className="mt-4 form-text">
                      <div className="form-group">
                        <label for="exampleInputEmail1">Your Full Name</label>
                        <input
                          type="email"
                          className="form-control mb-0"
                          id="exampleInputEmail1"
                          placeholder="Your Full Name"
                        />
                      </div>
                      <div className="form-group">
                        <label for="exampleInputEmail2">Email address</label>
                        <input
                          type="email"
                          className="form-control mb-0"
                          id="exampleInputEmail2"
                          placeholder="Enter email"
                        />
                      </div>
                      <div className="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input
                          type="password"
                          className="form-control mb-0"
                          id="exampleInputPassword1"
                          placeholder="Password"
                        />
                      </div>                  
                      <div className="sign-info text-center">
                        <button
                          type="submit"
                          className="btn btn-white d-block w-100 mb-2"
                        >
                          Sign Up
                        </button>
                        <span className="text-dark d-inline-block line-height-2">
                          Already Have Account ?{" "}
                          <a href="/" className="text-white">
                            Log In
                          </a>
                        </span>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default SignUp;
