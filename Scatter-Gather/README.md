Project Overview:

This project demonstrates a scatter-gather aggregator pattern using Node.js 20 and Express.js, with each service running in a separate Docker container.

Services:

- Rate Service – Returns a random rate for a company.

- Allocation Service – Returns a random allocation duration for a company.

- Logistic Service – Returns a list of locations for a company.

- Caller Service – Implements scatter-gather logic to collect data from all services and return a combined response.

All services are connected via a user-defined Docker bridge network (scatter-gather) for internal communication.

Setup & Run:

1. Build Docker images
- docker build -t rate-service ./service-rate
- docker build -t allocation-service ./service-allocation
- docker build -t logistic-service ./service-logistic
- docker build -t caller-service ./caller-service

2. Create a user-defined bridge network
docker network create -d bridge scatter-gather

3. Run containers and connect to the UDB
- docker run -d --name rate-service --network scatter-net -p 3001:3000 rate-service
- docker run -d --name allocation-service --network scatter-net -p 3002:3000 allocation-service
- docker run -d --name logistic-service --network scatter-net -p 3004:3000 logistic-service
- docker run -d --name caller-service --network scatter-net -p 3000:3000 caller-service

4. Test services(git bash)
- curl http://localhost:3001/rate?company=ABC
- curl http://localhost:3002/allocation?company=ABC
- curl http://localhost:3003/logistic?company=ABC
- curl http://localhost:3000/aggregate?company=ABC

Caller Service returns combined JSON from all services:

- Example Output(in JSON format): 

  {
  "company": "ABC",
  "time": "29/09/2025, 20:35:12",
  "value": 5234,
  "duration": 42,
  "location": ["New York", "London", "Tokyo"]
}

- If any service is down or times out, it returns "no response" for that property.

Logs & Debugging:
- docker logs rate-service
- docker logs allocation-service
- docker logs logistic-service
- docker logs caller-service
