export const userRegister = async (name, email, password, cpassword) => {
  const response = await fetch("/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
      cpassword,
    }),
  });
  return response;
};

export const userLogin = async (email, password) => {
  const response = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  return response;
};

export const userLogout = async () => {
  const response = await fetch("/logout", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  return response;
};

export const verifyUser = async () => {
  const response = await fetch("/verifyuser", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  return response;
};
