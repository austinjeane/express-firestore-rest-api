const axios = require('axios');

var url = "http://localhost:3000/";

function testUserGetAll() {
    axios.get(url + "user")
        .then(handleResponse)
        .catch(handleError);
}

function testUserGetById() {
    axios.get(url + "user/dq5pqyuDnZs3RTZhD9Kc")
        .then(handleResponse)
        .catch(handleError);
}

function testCreateUser() {
    return axios.post(url + "user", { 
        last_name: 'test last',
        first_name: 'test first',
        email: 'test@test.test',
        bizNumber: '11111',
        username: 'testuser'
    })
        .then(handleResponse)
        .catch(handleError);
}

function testUpdateUser(id) {
    return axios.put(url + "user/" + id, { 
        last_name: 'updated test last',
        first_name: 'updated test first',
        lastUpdate: new Date()
    })
        .then(handleResponse)
        .catch(handleError);
}

function testUserDelete(id) {
    axios.delete(url + "user/" + id)
        .then(handleResponse)
        .catch(handleError);
}

function handleResponse(response) {
    if(response.status === 200) {
        console.log("PASS "+ response.config.url);
        console.log(response.data);
        return response.data;
    } else {
        console.log("FAIL "+ response.config.url);
        console.log(response.data);
    }
}

function handleError(error) {
    console.log("FAIL r" + error.config.url);
    console.log(error.response.data);
    console.log(error.message);
}

testUserGetAll();
testUserGetById();
testCreateUser().then(user => {
    var userId = user.id;

    testUpdateUser(userId).then(() =>{
        testUserDelete(userId);
    });
});
    
