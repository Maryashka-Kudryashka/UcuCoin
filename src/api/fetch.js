export async function allUsers() {
  return await (await fetch(`/user/allusers`)).json()
}

export async function authUser(email, password) {
  const headers = new Headers()
  headers.append("Content-Type", "application/json")

  const response = await fetch(`/user/auth`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      username: email,
      password: password
    })
  })
  if (response === null) {
    console.log("LOGIN ERROR!!!")
    return "Login error!"
  }
  return response.json()
}

export async function fetchCurrentUser() {
  const headers = new Headers()
  headers.append("Content-Type", "application/json")

  const response = await fetch(`/user/getCurrentUser`, {
    headers
  })
  if (response === null) {
    console.log("No current user ERROR!!!")
    return "getCurrentUser error!"
  }
  return response.json()
}

export async function userLogout() {
  const headers = new Headers()
  headers.append("Content-Type", "application/json")

  const response = await fetch(`/user/logout`, {
    method: "POST",
    headers
  })
  if (response === null) {
    console.log("Cannot logout!")
    return "getCurrentUser error!"
  }
}
