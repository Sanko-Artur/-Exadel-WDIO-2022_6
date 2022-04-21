class Login {
  get main() {
    return $('#login-wrap');
  }

  get username() {
    return this.main.$('#login');
  }

  get password() {
    return this.main.$('#password');
  }

  get rememberCheckbox() {
    return this.main.$("[type='checkbox']");
  }

  get submitButton() {
    return this.main.$('button');
  }

  async login(credentials) {
    await this.username.setValue(credentials.username);
    await this.password.setValue(credentials.password);
    await this.rememberCheckbox.click();
    await this.submitButton.click();
    await $('#user-label').waitForDisplayed({
      timeout: 15000,
      timeoutMsg: 'After 15 sec the element: #user-label was not displayed',
    });
  }
}

module.exports = { Login: new Login() };
