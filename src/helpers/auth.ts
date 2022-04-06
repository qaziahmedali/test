import loginData from "../user.json";
export const login = async (body: any) => {
  const existEmail = loginData.email == body.email;
  const existPassword = loginData.password == body.password;
  let user = {};
  if (existEmail && existPassword) {
    return (user = {
      message: "success",

      data: {
        _id: loginData._id,
        name: loginData.name,
        email: loginData.email,
      },
    });
  } else {
    return (user = {
      message: "Email or password not correct!",
    });
  }
};

export const authenticate = (data: any, next: any) => {
  const result = JSON.stringify(data);
  console.log("authenticate", data);
  console.log("authenticate", result);
  if (typeof window !== "undefined") {
    localStorage.setItem("user", result);
    next();
  }
};

export const me = async () => {
  const data = localStorage.getItem("user");
  if (data) {
    let result = JSON.parse(data);
    let user = {};
    console.log("hello", loginData);
    console.log("hello", result);
    if (result.data.email == loginData.email) {
      console.log("helo");
      return (user = {
        _id: loginData._id,
        name: loginData.name,
        email: loginData.email,
      });
    } else {
      return (user = {
        message: "unAuthorized",
      });
    }
  }
};
