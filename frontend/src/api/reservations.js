export const addReservation = async (reservationData) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/reservations`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData.data)
    });
    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.message);
    }

    return responseData;
};