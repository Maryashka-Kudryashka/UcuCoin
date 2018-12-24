export async function allUsers() {
  return await (await fetch(`http://localhost:5000/user/allusers`)).json();
}

export async function authUser(email, password) {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const response = await fetch(`http://localhost:5000/user/auth`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      email: email,
      password: password
    })
  });
  console.log(response, "RESPONCE")
  if (response === null) {
    console.log("LOGIN ERROR!!!");
    return "Login error!";
  }
  return response.json();
}
