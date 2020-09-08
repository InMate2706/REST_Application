$(document).ready(printUsers());

function addUser() {
    var roles = '?roles=';
    var newRoles = $('#newRoles').val();
    newRoles.forEach(function (item) {
        roles += item + ',';
    })
    var roles1 = roles.substr(0, roles.length - 1);
    var jsonVar = {
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
    var responce = fetch('http://localhost:8081/api/admin/users')
        .then((response) => {
            response.json().then((data) => {
                data.forEach(function (r) {
                    var roles = r.roles;
                    var stringRoles = '';
                    roles.forEach(function (item, i, roles) {
                        stringRoles += item.role + ' ';
                    })
                    console.log(r.firstName);
                    var html = '<tr id=' + r.id + '>' +
                        '<td>' + r.id + '</td>' +
                        '<td>' + r.firstName + '</td>' +
                        '<td>' + r.lastName + '</td>' +
                        '<td>' + r.email + '</td>' +
                        '<td>' + r.age + '</td>' +
                        '<td>' + r.role + '</td>' +
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

function deleteRow(o) {
    userId = $(o).closest('tr').find('td').eq(0).text();
    document.getElementById('deleteForm').reset();
    var url = 'http://localhost:8081/api/admin/users/' + userId;
    fetch(url)
        .then((response) => {
            response.json().then((data) => {
                $('#idDelete').val(data.id);
                $('#firstNameDelete').val(data.firstName);
                $('#lastNameDelete').val(data.lastName);
                $('#emailDelete').val(data.email);
                $('#ageDelete').val(data.age);
                var roles = data.roles;
                console.log(roles);
                var newRoles = [];
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
    var url = 'http://localhost:8081/api/admin/users/' + userId;
    fetch(url, {
        method: 'DELETE',
    })
        .then(res => res.text())
        .then(res => console.log(res))
    var table = document.getElementById("usersTable");
    var selector = "tr[id='" + userId + "']";
    var row = table.querySelector(selector);
    row.parentElement.removeChild(row);
}

function getUser() {
    $("#userInfo > tbody").empty();
    var id = document.getElementById("userId").value;
    var url = 'http://localhost:8081/api/admin/users/' + id;
    fetch(url)
        .then((response) => {
            response.json().then((data) => {
                var roles = data.roles;
                var stringRoles = '';
                roles.forEach(function (item,) {
                    stringRoles += item.role + ' ';
                })
                var html = '<tr>' +
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

function cleanForm() {
    document.getElementById('addForm').reset();
}

function editUser(o) {
    document.getElementById('editForm').reset();
    var id = $(o).closest('tr').find('td').eq(0).text();
    var url = 'http://localhost:8081/api/admin/users/' + id;
    fetch(url)
        .then((response) => {
            response.json().then((data) => {
                $('#idEdit').val(data.id);
                $('#firstNameEdit').val(data.firstName);
                $('#lastNameEdit').val(data.lastName);
                $('#emailEdit').val(data.email);
                $('#ageEdit').val(data.age);
                $('#editInputPassword').val(data.password);
                var roles = data.roles;
                var newRoles = [];
                $('#newRoles option').each(function () {
                    newRoles[$(this).val()] = $(this).val();
                });
                roles.forEach(function (item, i, roles) {
                    if (newRoles.includes(String(item.id))) {
                        $('#editFormControlSelect option[id=' + item.id + ']').prop('selected', true);
                    }
                })
            });
        });
}

function updateUser() {
    var roles = '?roles=';
    var newRoles = $('#editFormControlSelect').val();
    newRoles.forEach(function (item) {
        roles += item + ',';
    })
    var roles1 = roles.substr(0, roles.length - 1);
    var jsonVar = {
        id: document.getElementById("idEdit").value,
        firstName: document.getElementById("firstNameEdit").value,
        lastName: document.getElementById("lastNameEdit").value,
        age: document.getElementById("ageEdit").value,
        email: document.getElementById("emailEdit").value,
        password: document.getElementById("editInputPassword").value
    };
    var response = fetch('http://localhost:8081/api/admin/edit' + roles1, {
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

var userId;