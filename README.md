## Kong-Api-Gateway-Lab

- run backend

docker run -d --name hello-backend \
  --network kong-api-gateway-lab_kong-net \
  -p 3001:3000 \
  kong-api-gateway-lab-backend:latest

docker run -d --name hello-backend2 \
  --network kong-api-gateway-lab_kong-net \
  -p 3003:3003 \
  kong-api-gateway-lab-backend2:latest

- create service on kong

curl -i -X POST http://localhost:8001/services/ \
  --data name=hello-backend \
  --data url=http://hello-backend:3000

curl -i -X POST http://localhost:8001/services \
  --data name=hello-backend2 \
  --data url=http://hello-backend2:3003


- create route on kong

curl -i -X POST http://localhost:8001/services/hello-backend/routes \
  --data paths[]=/hello

curl -i -X POST http://localhost:8001/services/hello-backend2/routes \
  --data 'paths[]=/hello2'


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

## Docs

- https://emrah-t.medium.com/kong-api-gateway-with-microservices-part-i-how-to-install-and-config-kong-on-kubernetes-9e196621d757

- https://medium.com/api-leadership/expose-backend-api-using-kong-gateway-step-by-step-guide-fcd3aeeaba73

## Cloud Map

```
curl http://sta.sta:3000/hello
nslookup sta.sta

# Update your ECS service to enable execute command
aws ecs update-service \
  --cluster cm-cluster \
  --service frontend-service-56u86q4p \
  --enable-execute-command

#Force a new deployment of your service
aws ecs update-service \
  --cluster cm-cluster \
  --service frontend-service-56u86q4p \
  --force-new-deployment

aws ecs execute-command \
  --cluster cm-cluster \
  --task b7c4c57740b049ef862640564ab96c36 \
  --container frontend \
  --command "/bin/sh" \
  --interactive

# you will see like as

The Session Manager plugin was installed successfully. Use the AWS CLI to start a session.
Starting session with SessionId: ecs-execute-command-feikbspd8tcgv99yyji2bfyx7y
/ #

```