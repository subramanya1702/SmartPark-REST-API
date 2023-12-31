## Smart-Park-Server

A node js application that provides information about all available parking lots through its REST APIs.

### Requirements

* Node >= 14.0.0
* Mongodb >= 6.0.0
* Docker

### Setting up Mongodb

If you want to run mongodb without docker, go ahead and install mongodb by following the instructions over [here.](https://www.mongodb.com/docs/manual/installation/)
If not, follow the below steps.


1. Download the mongodb image

```sh
docker pull mongo:6.0
```

2. Run a container using the above image

```sh
docker run -dp 27017:27017 --name mongo mongo:6.0
```


### Usage

If you want to run the application as a docker container, check out the instructions over [here.](https://github.com/subramanya1702/Smart-Park#iii-setting-up-nodejs-application)
If not, follow the below steps.

1. Clone the repository

```sh
git clone https://github.com/subramanya1702/SmartPark-REST-API.git
```

2. Navigate to the project directory

```sh
cd SmartPark-REST-API
```

3. Install dependencies

```sh
npm install
```

4. Run the application

```sh
npm run start:{profile}
```

The profile can be dev, prod or test

### API Documentation

#### Request

`GET /parking_lots`

```sh
curl http://localhost:8080/parking_lots
```

#### Response

```sh
HTTP/1.1 200 OK
Date: Mon, 17 Jul 2023 18:13:00 IST
Status: 200 OK
Content-Type: application/json

{
    "parking_lots": [
        {
            "id": "653b6b84613f023b8478bcf7",
            "latitude": 44.56298278509426,
            "longitude": -123.27235573138302,
            "parking_lot_name": "Tebeau Hall",
            "number_of_empty_parking_spaces": 18,
            "total_number_of_parking_spaces": 41,
            "timestamp": "2023-11-30 01:05:33",
            "original_image_url": "http://HOST_NAME:8080/parking_lots/653b6b84613f023b8478bcf7/image?type=originalImage",
            "labelled_image_url": "http://HOST_NAME:8080/parking_lots/653b6b84613f023b8478bcf7/image?type=labelledImage",
            "parking_lot_time_limit": "2 Hr Parking [ 8.30 am to 5.30 am]",
            "parking_charges_in_dollars_per_hour": 2
        }
    ]
}
```

#### Request

`GET /parking_lots/{parking_lot_id}/image?type={type}`

```sh
curl -o image.png http://localhost:8080/parking_lots/{parking_lot_id}/image?type={type}
```

#### Response

```sh
HTTP/1.1 200 OK
Date: Mon, 17 Jul 2023 18:17:00 IST
Status: 200 OK
Content-Type: image/jpeg
```

### Contributors

Subramanya Keshavamurthy [keshavas@oregonstate.edu](mailto://keshavas@oregonstate.edu)
