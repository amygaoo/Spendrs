import { BASE_URL } from '../base_url';
import client from './auth';

export const getUserInfo = async (username = "") => {
  try {
    let user = null;
    if (username) {
      user = await client.get(BASE_URL + `/api/user/${username}`);
    } else {
      user = await client.get(BASE_URL + '/api/users');
    }

    if (!user || user.status !== 200 || typeof(user.data) == "string") {
      console.log(user)
      throw Error('Error: User received from API but not correctly formatted');
    }

    return user.data;
  } catch (err) {
    console.log(err);
    alert("Error loading user data!")
    // throw err;
  }
};

export const uploadProfilePic = async (form) => {
  try {
    const picture = new FormData(form)
    console.log(form)
    await client.post(BASE_URL + '/api/users/upload/profile_pic', picture);
    console.log("success!")
  } catch (err) {
    console.log(err);
  }
}

export const changeUserPrivacy = async (privacy) => {
  try {
    console.log("new privacy :>>", privacy)
    const user = await client.patch(BASE_URL + '/api/users/changePrivacy', {"privacy": privacy});

    if (!user || user.status !== 200 || typeof(user.data) == "string") {
      console.log(user)
      throw Error('Error: User received from API but not correctly formatted');
    }

    return user.data;
  } catch (err) {
    console.log(err);
    alert("Error patching user data!")
    // throw err;
  }
}

export const deleteUser = async () => {
  try {
    const user = await client.delete(BASE_URL + '/api/users/deleteUser');

    if (!user || user.status !== 200 || typeof(user.data) == "string") {
      console.log(user)
      throw Error('Error: User received from API but not correctly formatted');
    }
    return user.data;
  } catch (err) {
    console.log(err);
    alert("Error deleting user!")
    // throw err;
  }
}


export const changePassword = async (oldPass, password, confirmPass, passwordStrength) => {
  try {
    const user = await client.patch(BASE_URL + '/api/users/changePassword', {"oldPass": oldPass, "password": password, "confirmPass": confirmPass, "passwordStrength": passwordStrength});

    if (!user ||  typeof(user.data) == "string") {
      console.log(user)
      throw Error('Error: User received from API but not correctly formatted');
    }
    return user.data;
  } catch (err) {
    console.log(err);
    alert("Error changing user password!")
    // throw err;
  }
}