import ROUTES from "../routes/ROUTES";

const myLinks = [
  { to: ROUTES.HOME, children: "Home" },
  { to: ROUTES.LOGIN, children: "Login" },
  { to: ROUTES.REGISTER, children: "Register" },
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

export default myLinks;
export { alwaysLinks, loggedInLinks, notLoggedInLinks };
