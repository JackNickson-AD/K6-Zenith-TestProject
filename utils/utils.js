import { check, fail } from 'k6';

export function get_random_client_id(res){
    var client_array = JSON.parse(res.body)
    var index = Math.floor(Math.random() * client_array.length);
    return client_array[index]["id"] // returns a random client id for subsequent calls to prevent server cache
}

export function get_random_car(res){
    var car_array = JSON.parse(res.body)

    var index = Math.floor(Math.random() * car_array.length);
    let car_client = {
        "carId": car_array[index]["id"],
        "clientId": car_array[index]["clientId"],
    }

    return car_client // returns a random car and client id for subsequent calls to prevent server cache
}

export function set_request_header(){
    return {
        headers: {
            'Content-Type': 'application/json',
        },
    };
}

export function response_status_check(res){
    if (
        !check(res, {
            "status code was 200": (res) => res.status == 200,
        })
    ) {
        fail('status code was *not* 200 actual status was ' + res.status);
    }
}