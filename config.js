let baseUrl = ''

if (process.env.NODE_ENV === 'production') {
   baseUrl = 'https://chronusapp.herokuapp.com/api/v1/';
} else {
   baseUrl = 'http://localhost:8000/api/v1/';
}

export const apiHost = baseUrl;