import { getCookie } from "../../services/cookie";

const config = {
  baseURL: "https://norma.nomoreparties.space/api",
  headers: {
    "Content-Type": "application/json",
  },
};

const checkResponse = (res: Response) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export function getIngredients() {
  return fetch(`${config.baseURL}/ingredients`, {
    method: "GET",
    headers: config.headers,
  }).then(res => checkResponse(res));
}

export function postOrder(orderIds: string[]) {
  return fetch(`${config.baseURL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: 'Bearer ' + getCookie('accessToken')
    },
    body: JSON.stringify({
      ingredients: orderIds,
    }),
  }).then(res => checkResponse(res));
}

//запрос на получение письма для сброса пароля
export function postForgotPassword(email: string) {
  return fetch(`${config.baseURL}/password-reset`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      email: `${email}`,
    }),
  }).then(res => checkResponse(res));
}

//запрос на обновление пароля
export function postResetPassword(password: string, token: string) {
  return fetch(`${config.baseURL}/password-reset/reset`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      password: `${password}`,
      token: `${token}`,
    }),
  }).then(res => checkResponse(res));
}

//создание пользователя
export function registerNewUser(email: string, password: string, name: string) {
  return fetch(`${config.baseURL}/auth/register`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
    }),
  }).then(res => checkResponse(res));
}

//авторизация
export function login(user: { email: string, password: string }) {
  return fetch(`${config.baseURL}/auth/login`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      email: `${user.email}`,
      password: `${user.password}`,
    }),
  }).then(res => checkResponse(res));
}

//получение данных пользователя
export function getUser() {
  return fetch(`${config.baseURL}/auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
  }).then(res => checkResponse(res));
}

//обновление данных пользователя через профиль

export function updateUser(data: { email: string, name: string }) {
  return fetch(`${config.baseURL}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
    body: JSON.stringify(data),
  }).then(res => checkResponse(res));
}

//обновление токена
export function resetToken() {
  return fetch(`${config.baseURL}/auth/token`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      token: getCookie("refreshToken"),
    }),
  }).then(res => checkResponse(res));
}

//логаут
export function logout() {
  return fetch(`${config.baseURL}/auth/logout`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      token: getCookie("refreshToken"),
    }),
  }).then(res => checkResponse(res));
}
