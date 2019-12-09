import React, { PureComponent } from "react";
import FormField from "./FormField";
import FormButton from "./FormButton";
import CallApi from "../../../api/api";
import AppContextHOC from "../../HOC/AppContextHOC";
import PropTypes from "prop-types";

class LoginForm extends PureComponent {
  static propTypes = {
    updateAuth: PropTypes.func.isRequired
  };

  state = {
    username: "",
    password: "",
    passwordRepeat: "",
    errors: {},
    submitting: false
  };

  onChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevState => ({
      [name]: value,
      errors: {
        ...prevState.errors,
        base: null,
        [name]: null
      }
    }));
  };

  handleBlur = () => {
    const errors = this.validateFields();
    if (Object.keys(errors).length > 0) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          ...errors
        }
      }));
    }
  };

  validateFields = () => {
    const errors = {};
    const { username, password, passwordRepeat } = this.state;

    if (username === "") {
      errors.username = "Обязательное!";
    }
    if (password === "") {
      errors.password = "Обязательное!";
    }
    if (passwordRepeat !== password) {
      errors.passwordRepeat = "Должен быть равен паролю!";
    }

    return errors;
  };

  onSubmit = async () => {
    this.setState({
      ...this.state,
      submitting: true
    });

    try {
      const data = await CallApi.get("/authentication/token/new");

      const result = await CallApi.post(
        "/authentication/token/validate_with_login",
        {
          body: {
            username: this.state.username,
            password: this.state.password,
            request_token: data.request_token
          }
        }
      );

      const { session_id } = await CallApi.post("/authentication/session/new", {
        body: {
          request_token: result.request_token
        }
      });

      const user = await CallApi.get("/account", {
        params: {
          session_id
        }
      });
      this.setState({
        ...this.state,
        submitting: false
      });
      this.props.updateAuth(user, session_id);
    } catch (error) {
      this.setState({
        submitting: false,
        errors: {
          base: error.status_message
        }
      });
    }
  };

  onLogin = e => {
    e.preventDefault();
    const errors = this.validateFields();
    if (Object.keys(errors).length > 0) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          ...errors
        }
      }));
    } else {
      this.onSubmit();
    }
  };

  render() {
    const {
      username,
      password,
      errors,
      passwordRepeat,
      submitting
    } = this.state;
    return (
      <div className="form-login-container">
        <form className="form-login">
          <h1 className="h3 mb-3 font-weight-normal text-center">
            Авторизация
          </h1>
          <FormField
            id="username"
            labelText="Пользователь"
            placeholder="Имя пользователя"
            type="text"
            name="username"
            value={username}
            onChange={this.onChange}
            onBlur={this.handleBlur}
            error={errors.username}
          />
          <FormField
            id="password"
            labelText="Пароль"
            placeholder="Введите пароль"
            type="password"
            name="password"
            value={password}
            onChange={this.onChange}
            onBlur={this.handleBlur}
            error={errors.password}
          />
          <FormField
            id="passwordRepeat"
            labelText="Повторите пароль"
            placeholder="Повторите пароль"
            type="password"
            name="passwordRepeat"
            value={passwordRepeat}
            onChange={this.onChange}
            onBlur={this.handleBlur}
            error={errors.passwordRepeat}
          />
          <FormButton
            submitting={submitting}
            error={errors.base}
            onLogin={this.onLogin}
          />
        </form>
      </div>
    );
  }
}

export default AppContextHOC(LoginForm);
