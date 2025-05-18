## Kong-Api-Gateway-Lab

docker run -d --name hello-backend \
  --network kong-api-gateway-lab_kong-net \
  -p 3001:3000 \
  kong-api-gateway-lab-backend:latest

curl -i -X POST http://localhost:8001/services/ \
  --data name=hello-backend \
  --data url=http://hello-backend:3000

curl -i -X POST http://localhost:8001/services/hello-backend/routes \
  --data paths[]=/hello

- Testing

curl http://localhost:8000/hello

- CORS Fix

curl -i -X POST http://localhost:8001/routes/d867c0a4-7739-45fd-84b6-3911932f2d8c/plugins \
  --data "name=cors" \
  --data "config.origins=*" \
  --data "config.methods[]=GET" \
  --data "config.methods[]=POST" \
  --data "config.methods[]=OPTIONS" \
  --data "config.headers=Accept,Authorization,Content-Type" \
  --data "config.credentials=true" \
  --data "config.max_age=3600"
