export const getCars = async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cars`);
    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.message);
    }

    return responseData;
};

export const getCarById = async (carId) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cars/${carId}`);
    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.message);
    }

    return responseData;
};

export const addCar = async (data) => {
    const formData = new FormData();
    for (const key in data) {
        formData.append(key, data[key]);
    }

    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cars/add`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${data.token}`
        },
        body: formData
    });
    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.message);
    }

    return responseData;
};

export const updateCar = async (data) => {
    const formData = new FormData();
    for (const key in data) {
        formData.append(key, data[key]);
    }

    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cars/${data._id}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${data.token}`
        },
        body: formData
    });
    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.message);
    }

    return responseData;
};

export const deleteCar = async (data) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cars/${data.carId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${data.token}`
        }
    });
    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.message);
    }

    return responseData;
};