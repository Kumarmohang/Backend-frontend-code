import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { session } from "../../utils";
import Button from "../Button";
import apiCall from "./logic";
import "./login.scss";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const {
    flag = false,
    data: userData = null,
    loading = false,
    isError = false,
    // error = null,
  } = useSelector((state) => state.userData);

  useEffect(() => {
    if (session.checkIfLogin()) {
      history.push("/");
    }
  }, []);

  useEffect(() => {
    /* if (session.checkIfLogin()) {
      history.push("/");
    } */
    if (flag) {
      history.push("/");
    }
  }, [flag]);

  const onLogin = (e) => {
    e.preventDefault();
    const payload = {
      userName,
      password,
    };
    dispatch(apiCall(payload));
  };

  const onUserNameChange = (e) => {
    const { value } = e.target;
    setUserName(value);
  };
  const onPasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
  };

  return (
    <div className="login-container">
      <div className="heading">Login</div>
      <form className="login-form" onSubmit={onLogin}>
        <div className="form-item">
          <label htmlFor="userName">UserName</label>
          <input
            type="text"
            name="userName"
            id="userName"
            required
            value={userName}
            onChange={onUserNameChange}
            className="text-input"
            placeholder="Enter your username"
          />
        </div>
        <div className="form-item">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            value={password}
            onChange={onPasswordChange}
            className="text-input"
            placeholder="Enter your password"
          />
        </div>
        <div className="form-item">
          <Button loading={loading} type="submit">
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
