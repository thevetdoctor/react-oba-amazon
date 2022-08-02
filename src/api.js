export const apiUrl = (() => {
    console.log(process.env.REACT_APP_BASE_URL);
    if (process.env.REACT_APP_BASE_URL) {
        return `${process.env.REACT_APP_BASE_URL}`;
    } else if(window.location.host.indexOf('localhost') >= 0){
        return 'http://localhost:8000';
    } else {
        return 'https://hospitalitee.herokuapp.com';
    }
})();