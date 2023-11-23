import ROUTES from "../routes/ROUTES";

const myLinks = [
  { to: ROUTES.HOME, children: "Home" },
  { to: ROUTES.ABOUT, children: "About" },
  { to: ROUTES.LOGIN, children: "Login" },
  { to: ROUTES.REGISTER, children: "Register" },
  { to: ROUTES.MYCARDS, children: "My Cards" },
  { to: ROUTES.FAVCARDS, children: "Favorite Cards" },
  { to: ROUTES.CARDCREATE, children: "Create Card" },
  { to: ROUTES.SANDBOX, children: "Sandbox" },
];

const alwaysLinks = [
  { to: ROUTES.HOME, children: "Home" },
  { to: ROUTES.ABOUT, children: "About" },
];

const loggedInLinks = [
  { to: ROUTES.MYCARDS, children: "My Cards" },
  { to: ROUTES.FAVCARDS, children: "Favorite Cards" },
  { to: ROUTES.CARDCREATE, children: "Create Card" },
];

const notLoggedInLinks = [
  { to: ROUTES.LOGIN, children: "Login" },
  { to: ROUTES.REGISTER, children: "Register" },
];

const adminLinks = [{ to: ROUTES.SANDBOX, children: "Sandbox" }];

export default myLinks;
export { adminLinks, alwaysLinks, loggedInLinks, notLoggedInLinks };
