const prod = {
    url: {
     API_URL: 'https://shy-gray-spider-sock.cyclic.app',
    }
    }

const dev = {
    url: {
     API_URL: 'http://localhost:8080',
    }
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod;
   