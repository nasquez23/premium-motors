export const getTestemonials = async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/testemonials`);
    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.message);
    }

    return responseData;
};

export const addTestemonial = async (testemonialData) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/testemonials`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${testemonialData.token}`
        },
        body: JSON.stringify(testemonialData)
    });
    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.message);
    }

    return responseData;
};

export const updateTestemonial = async (testemonialData) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/testemonials/${testemonialData._id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${testemonialData.token}`
        },
        body: JSON.stringify(testemonialData)
    });
    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.message);
    }

    return responseData;
};

export const deleteTestemonial = async (testemonialData) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/testemonials/${testemonialData._id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${testemonialData.token}`
        }
    });
    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.message);
    }

    return responseData;
};