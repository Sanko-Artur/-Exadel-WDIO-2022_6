class SideBarMenu {
  async clickElementMenu(selector) {
    await $(`//a[text()[contains(.,"${selector}")]]`).click();
  }
}

module.exports = { SideBarMenu: new SideBarMenu() };
