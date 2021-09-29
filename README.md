# Project Title
k6_demo

## Description
k6 project running against demo web services covering the following functionality@
* Requests (GET, POST, DELETE, PUT)
* Scenarios
* Batches (parallel requests)
* Stages (Ramp up and down)
* Parameterization and correlation
* Checks
* Thresholds, pacing and think time
* Reporting using InfluxDB and Grafana

## Getting Started

### Dependencies

* Docker
* Containerized WebApi (https://github.com/JoeBatt1989/WebAPI)

### docker-compose.yml
docker-compose.yml will scaffold an environment which includes the following:
* InfluxDB which a DB named 'K6' running on localhost:8086
* Grafana with a k6 dashboard and InfluxDB datasource running on localhost:3000
* WebAPI running on localhost:8081
* Latest k6 image

### Running the Tests

1. Follow WebApi README to create a docker image named webapi
2. 'docker compose up' from root will start the environment
3. 'k6 run --out influxdb=http://localhost:8086/k6 tests/scenarios.js'
4. Go to localhost:3000 and select dashboard in Grafana to visualize the results

## Authors
Joe Batt
