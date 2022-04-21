class CreateSubscription {
  constructor() {
    this.dropDownForUsers = '//select[@id="user"]';
    this.description = '#description';
    this.createButton = "//button[@type='submit']";
    this.cellEmail = ".//child::div[@tabulator-field='user']";
    this.cellSubscription = ".//child::div[@tabulator-field='description']";
  }

  async setPathToElementThroughSelectors(parent, child) {
    await parent.$(child).waitForDisplayed({
      timeout: 5000,
      timeoutMsg: `After 5 sec the element: ${child} was not displayed`,
    });
    const element = parent.$(child);
    return element;
  }

  async setValue(selector, value) {
    await $(selector).waitForClickable({
      timeout: 5000,
      timeoutMsg: `After 5 sec the element: ${selector} was not clickable`,
    });
    await $(selector).setValue(value);
  }

  async clickElement(selector) {
    await $(selector).waitForDisplayed({
      timeout: 5000,
      timeoutMsg: `After 5 sec the element: ${selector} was not displayed`,
    });
    await $(selector).click();
  }

  async createSubscription(data) {
    await this.clickElement(this.dropDownForUsers);
    const dropDown = await $(this.dropDownForUsers);
    await this.clickElement(
      await this.setPathToElementThroughSelectors(
        dropDown,
        `./child::option[contains(text() , "${data.email}")]`
      )
    );
    await this.setValue(this.description, data.subscriptions);
    await this.clickElement(this.createButton);
  }

  async checkUsersSubscription(data) {
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

    const subscriptionUser = await this.setPathToElementThroughSelectors(
      rowOfUser,
      this.cellSubscription
    );
    await expect(subscriptionUser).toHaveText(data.subscriptions);
  }
}

module.exports = { CreateSubscription: new CreateSubscription() };
