import React, { PureComponent } from "react";
import FormField from "./FormField";
import FormButton from "./FormButton";
import { API_URL, API_KEY_3, fetchApi } from "../../../api/api";

export default class LoginForm extends PureComponent {
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
      submitting: true
    });

    try {
      const data = await fetchApi(
        `${API_URL}/authentication/token/new?api_key=${API_KEY_3}`
      );

      const result = await fetchApi(
        `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({
            username: this.state.username,
            password: this.state.password,
            request_token: data.request_token
          })
        }
      );

      const { session_id } = await fetchApi(
        `${API_URL}/authentication/session/new?api_key=${API_KEY_3}`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({
            request_token: result.request_token
          })
        }
      );
      this.props.updateSessionId(session_id);

      const user = await fetchApi(
        `${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`
      );

      this.props.updateUser(user);
      this.setState({
        submitting: false
      });
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
