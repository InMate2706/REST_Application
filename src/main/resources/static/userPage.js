$(document).ready (getUser());

function getUser() {
    var url = 'http://localhost:8081/user';
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