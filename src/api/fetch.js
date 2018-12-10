
export async function allUsers() {
    return await ((await fetch(`http://localhost:5000/user/allusers`)).json());
}
  
