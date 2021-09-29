export function get_client_payload(){
    var clients = [
        {
            "title": "Mr",
            "firstName": "James",
            "lastName": "Test",
            "email": "james.test@test.com",
            "contactDetails": {
                "phoneType": "Home",
                "phoneNumber": "01132965944"
            }
        },
        {
            "title": "Mrs",
            "firstName": "Janey",
            "lastName": "Test",
            "email": "jane.test@test.com",
            "contactDetails": {
                "phoneType": "Home",
                "phoneNumber": "01132965944"
            }
        },
        {
            "title": "Mrs",
            "firstName": "Janet",
            "lastName": "Test",
            "email": "jane.test@test.com",
            "contactDetails": {
                "phoneType": "Home",
                "phoneNumber": "01132965944"
            }
        },
        {
            "title": "Mrs",
            "firstName": "Janes",
            "lastName": "Test",
            "email": "jane.test@test.com",
            "contactDetails": {
                "phoneType": "Home",
                "phoneNumber": "01132965944"
            }
        }
    ]

    return clients[Math.floor(Math.random() * clients.length)];
}


export function get_car_payload(clientId){

    var cars = [
        {
            "clientId": clientId,
            "make": "Ford",
            "model": "Focus",
            "registration": "YY12 HYG"
        },
        {
            "clientId": clientId,
            "make": "Vauxhall",
            "model": "Astra",
            "registration": "YY18 HHG"
        },
        {
            "clientId": clientId,
            "make": "BMW",
            "model": "318i",
            "registration": "FH20 SED"
        },
        {
            "clientId": clientId,
            "make": "Kia",
            "model": "Ceed",
            "registration": "FD19 QWE"
        }
    ]

    return cars[Math.floor(Math.random() * cars.length)];
}

export function get_address_payload(clientId){

    var addresses = [
        {
            "clientId": clientId,
            "addressLine1": "12 Fake Street",
            "addressLine2": "Leeds",
            "postcode": "LS12 6BN"
        },
        {
            "clientId": clientId,
            "addressLine1": "13 Fake Street",
            "addressLine2": "Leeds",
            "postcode": "LS8 9HH"
        },
        {
            "clientId": clientId,
            "addressLine1": "20 Fake Street",
            "addressLine2": "Leeds",
            "postcode": "LD10 8ST"
        },
        {
            "clientId": clientId,
            "addressLine1": "22 Fake Street",
            "addressLine2": "Leeds",
            "postcode": "LS16 0YY"
        }
    ]

    return addresses[Math.floor(Math.random() * addresses.length)];
}