let baseUrl = '';
let wsHost = '';

if (process.env.NODE_ENV === 'production') {
   baseUrl = 'https://chronusapp.herokuapp.com/api/v1/';
   wsHost = 'wss://chronusapp.herokuapp.com'; 
} else {
   baseUrl = 'http://localhost:8000/api/v1/';
   wsHost = 'ws://127.0.0.1:8000';
}

export { baseUrl, wsHost };