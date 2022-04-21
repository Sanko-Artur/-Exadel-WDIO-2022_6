class CreateUser {
  constructor() {
    this.inputForEmailUser = '#email';
    this.inputForPasswordUser = '#password';
    this.inputForAddress1User = '#address1';
    this.inputForAddress2User = '#address2';
    this.inputForCityUser = "//input[@id='city']";
    this.createButton = "//button[@type='submit']";
    this.cellEmail = ".//child::div[@tabulator-field='email']";
    this.cellAddress1 = ".//child::div[@tabulator-field='address1']";
    this.cellAddress2 = ".//child::div[@tabulator-field='address2']";
    this.cellCity = ".//child::div[@tabulator-field='city']";
  }

  async setValue(selector, value) {
    await $(selector).waitForClickable({
      timeout: 5000,
      timeoutMsg: `After 5 sec the element: ${selector} was not clickable`,
    });
    await $(selector).setValue(value);
  }

  async clickButton(selector) {
    await $(selector).waitForClickable({
      timeout: 5000,
      timeoutMsg: `After 5 sec the element: ${selector} was not clickable`,
    });
    await $(selector).click();
  }

  async createUser(data) {
    await this.setValue(this.inputForEmailUser, data.email);
    await this.setValue(this.inputForPasswordUser, data.password);
    await this.setValue(this.inputForAddress1User, data.address1);
    await this.setValue(this.inputForAddress2User, data.address2);
    await this.setValue(this.inputForCityUser, data.city);
    await this.clickButton(this.createButton);
  }

  async setPathToElementThroughSelectors(parent, child) {
    await parent.$(child).waitForDisplayed({
      timeout: 5000,
      timeoutMsg: `After 5 sec the element: ${child} was not displayed`,
    });
    const element = parent.$(child);
    return element;
  }

  async checkUser(data) {
    await $(`//div[contains(text() , "${data.email}")]/..`).waitForDisplayed({
      timeout: 5000,
      timeoutMsg: `After 5 sec the element: //div[contains(text() , "${data.email}")]/.. was not displayed`,
    });
    const rowOfUser = await $(`//div[contains(text() , "${data.email}")]/..`);

    const emailUser = await this.setPathToElementThroughSelectors(
      rowOfUser,
      this.cellEmail
    );
    await expect(emailUser).toHaveText(data.email);

    const address1User = await this.setPathToElementThroughSelectors(
      rowOfUser,
      this.cellAddress1
    );
    await expect(address1User).toHaveText(data.address1);

    const address2User = await this.setPathToElementThroughSelectors(
      rowOfUser,
      this.cellAddress2
    );
    await expect(address2User).toHaveText(data.address2);

    const cityUser = await this.setPathToElementThroughSelectors(
      rowOfUser,
      this.cellCity
    );
    await expect(cityUser).toHaveText(data.city);
  }
}

module.exports = { CreateUser: new CreateUser() };
