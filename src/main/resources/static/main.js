$(document).ready(printUsers());

function addUser() {
    let roles = '?roles=';
    const newRoles = $('#newRoles').val();
    newRoles.forEach(function (item) {
        roles += item + ',';
    })
    const roles1 = roles.substr(0, roles.length - 1);
    let jsonVar = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        age: document.getElementById("age").value,
        email: document.getElementById("email").value,
        password: document.getElementById("exampleInputPassword1").value
    };
    const response = fetch('http://localhost:8081/api/admin/users' + roles1, {
        method: 'POST',
        body: JSON.stringify(jsonVar),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    alert("успешно");
    document.getElementById('table-tab').click();
    $("#usersTable > tbody").empty();
    printUsers();
}

function printUsers() {
    const response = fetch('http://localhost:8081/api/admin/users')
        .then((response) => {
            response.json().then((data) => {
                data.forEach(function (r) {
                    let roles = r.roles;
                    let stringRoles = '';
                    roles.forEach(function (item) {
                        stringRoles += item.name + ' ';
                    })
                    let html = '<tr id=' + r.id + '>' +
                        '<td>' + r.id + '</td>' +
                        '<td>' + r.firstName + '</td>' +
                        '<td>' + r.lastName + '</td>' +
                        '<td>' + r.email + '</td>' +
                        '<td>' + r.age + '</td>' +
                        '<td>' + stringRoles + '</td>' +
                        '<td>' +
                        '<button type="button" class="btn btn-info" data-toggle="modal" data-target="#editModalCenter" onclick="editUser(this)">' +
                        'Edit' +
                        '</button>' +
                        '</td>' +
                        '<td>' +
                        '<button type="button"  class="btnDelete btn btn-danger" data-toggle="modal" data-target="#deleteModalCenter" onclick="deleteRow(this)">' +
                        'Delete' +
                        '</button>' +
                        '</td>' +
                        '</tr>';
                    $('#usersTable').append(html);
                });
            });
        });
}

function getUser() {
    $("#userInfo > tbody").empty();
    const id = document.getElementById("userId").value;
    const url = 'http://localhost:8081/api/admin/users/' + id
    fetch(url)
        .then((response) => {
            response.json().then((data) => {
                console.log(data)
                const roles = data.roles;
                let stringRoles = '';
                roles.forEach(function (item) {
                    stringRoles += item.name + ' ';
                })
                console.log(stringRoles)
                let html = '<tr>' +
                    '<td>' + data.id + '</td>' +
                    '<td>' + data.firstName + '</td>' +
                    '<td>' + data.lastName + '</td>' +
                    '<td>' + data.email + '</td>' +
                    '<td>' + data.age + '</td>' +
                    '<td>' + stringRoles + '</td>' +
                    '</tr>';
                $('#userInfo').append(html);
            })
        })
}

function deleteRow(o) {
    userId = $(o).closest('tr').find('td').eq(0).text();
    document.getElementById('deleteForm').reset();
    const url = 'http://localhost:8081/api/admin/users/' + userId;
    fetch(url)
        .then((response) => {
            response.json().then((data) => {
                $('#idDelete').val(data.id);
                $('#firstNameDelete').val(data.firstName);
                $('#lastNameDelete').val(data.lastName);
                $('#emailDelete').val(data.email);
                $('#ageDelete').val(data.age);
                const roles = data.roles;
                console.log(roles);
                let newRoles = [];
                $('#newRoles option').each(function () {
                    newRoles[$(this).val()] = $(this).val();
                });
                console.log(newRoles)
                roles.forEach(function (item) {
                    if (newRoles.includes(String(item.id))) {
                        $('#deleteFormControlSelect option[id=' + String(Number(item.id + 2)) + ']').prop('selected', true);
                    }
                })
            });
        });
}

function deleteUser() {
    const url = 'http://localhost:8081/api/admin/users/' + userId;
    fetch(url, {
        method: 'DELETE',
    })
        .then(res => res.text())
        .then(res => console.log(res))
    const table = document.getElementById("usersTable");
    const selector = "tr[id='" + userId + "']";
    let row = table.querySelector(selector);
    row.parentElement.removeChild(row);
}



function cleanForm() {
    document.getElementById('addForm').reset();
}

function editUser(o) {
    document.getElementById('editForm').reset();
    const id = $(o).closest('tr').find('td').eq(0).text();
    const url = 'http://localhost:8081/api/admin/users/' + id;
    fetch(url)
        .then((response) => {
            response.json().then((data) => {
                console.log(data)
                $('#idEdit').val(data.id);
                $('#firstNameEdit').val(data.firstName)
                $('#lastNameEdit').val(data.lastName);
                $('#emailEdit').val(data.email);
                $('#ageEdit').val(data.age);
                $('#editInputPassword').val(data.password);
                const roles = data.roles;
                let newRoles = [];
                $('#newRoles option').each(function () {
                    newRoles[$(this).val()] = $(this).val();
                });
                console.log(newRoles)
                roles.forEach(function (item) {
                    if (newRoles.includes(String(item.id))) {
                        $('#editFormControlSelect option[id=' + item.id + ']').prop('selected', true);
                    }
                })
            });
        });
}

function updateUser() {
    let roles = '?roles=';
    const newRoles = $('#editFormControlSelect').val();
    newRoles.forEach(function (item) {
        roles += item + ',';
    })
    console.log(newRoles)
    console.log(roles)
    const roles1 = roles.substr(0, roles.length - 1);
    console.log(roles1)
    const jsonVar = {
        id: document.getElementById("idEdit").value,
        firstName: document.getElementById("firstNameEdit").value,
        lastName: document.getElementById("lastNameEdit").value,
        age: document.getElementById("ageEdit").value,
        email: document.getElementById("emailEdit").value,
        password: document.getElementById("editInputPassword").value
    };
    const response = fetch('http://localhost:8081/api/admin/edit' + roles1, {
        method: 'PUT',
        body: JSON.stringify(jsonVar),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    alert("успешно");
    $("#usersTable > tbody").empty();
    printUsers();
}

let userId;