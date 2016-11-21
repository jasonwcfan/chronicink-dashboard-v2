export default startConsultation = (clientID) => {
    console.log(clientID);
    return {
        type: 'START_CONSULTATION',
        clientID
    };
}