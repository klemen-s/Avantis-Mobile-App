export function authReducer(user, action) {
  switch (action.type) {
    case "login": {
      if (!localStorage.getItem("jwt")) {
        user.isLoggedIn = false;
        return;
      }
      user.name = action.name;
      user.userId = action.userId;

      return user;
    }
    case "logout": {
      localStorage.removeItem("jwt");
      localStorage.removeItem("name");
      localStorage.removeItem("userId");

      user.isLoggedIn = false;
      user.name = "";
      user.userId = "";
      return user;
    }
    case "checkLogin": {
      if (localStorage.getItem("jwt") && localStorage.getItem("name")) {
        user.isLoggedIn = true;
        user.name = localStorage.getItem("name");
        user.userId = localStorage.getItem("userId");
      }
      return user;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
