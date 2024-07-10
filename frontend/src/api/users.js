export const getUserData = async (userData) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/user/${userData.userId}`, {
        headers: {
            'Authorization': `Bearer ${userData.token}`
        }
    });
    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.message);
    }

    return responseData;
};

export const updateUserProfile = async (userData) => {
    const formData = new FormData();
    for (const key in userData.user) {
        formData.append(key, userData.user[key]);
    }

    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/user/${userData.user._id}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${userData.token}`,
        },
        body: formData
    });
    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.message);
    }

    console.log(responseData);
    return responseData;
};

export const loginUser = async (userData) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    });
    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.message);
    }

    return responseData;
};

export const registerUser = async (userData) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    });
    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.message);
    }

    return responseData;
};