import fetch from 'node-fetch';

const BASE_URL = "http://localhost:3000/dev/"


const post = (data = {}, url = '') => {
    return new Promise((resolve, reject) => {


        return fetch(`${BASE_URL}${url}`, {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },

        })
            .then((res) => res.json())
            .then((json) => {
                resolve(json);
            })
            .catch((error) => {
                console.log("FETCH error: ", error);
                reject(error);
            })
    })
}

export default {
    registerUser: (data) => post(data, 'users/register'),
    listUser: (data) => post(data, 'users/list',),
    createMessageBoard: (data) => post(data, 'messageBoard/create'),
    listMessageBoard: (data) => post(data, 'messageBoard/list'),
    createMessage: (data) => post(data, 'message/create'),
    listMessage: (data) => post(data, 'message/list')
}
