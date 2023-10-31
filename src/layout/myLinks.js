import ROUTES from "../routes/ROUTES";

const myLinks = [
  { to: ROUTES.HOME, children: "Home" },
  { to: ROUTES.LOGIN, children: "Login" },
  { to: ROUTES.REGISTER, children: "Register" },
];

const alwaysLinks = [{ to: ROUTES.HOME, children: "Home" }];
const loggedInLinks = [
  { to: ROUTES.CARDCREATE, children: "Create New Card" },
  { to: ROUTES.CARDEDIT, children: "Edit Card" },
];
const notLoggedInLinks = [
  { to: ROUTES.LOGIN, children: "Login" },
  { to: ROUTES.REGISTER, children: "Register" },
];

export default myLinks;
export { alwaysLinks, loggedInLinks, notLoggedInLinks };
