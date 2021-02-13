### SC-USER
Sejutacita microservice for handling auth. (Login, refresh token)
```
Stack : Nodejs, ExpressJs
Database : MongoDB hosted in MongoDb Atlas 
CI/CD : Github actions
Deployment: Kubernetes managed by Digitalocean
```

### Base url : 
```http://167.99.29.250/sc-auth/```

### Path : 
```
/login (POST) ==> to do login
/refresh (POST) ==> to do refresh token
```
for more detail of the api path can be found on http://167.99.29.250/sc-swagger/

### Credential
```
sc-user:abcde
sc-admin:abcde

token expiry 6000 seconds
```

## Configuration / Setup

1. Manual localhost run
```javascript
npm install
node server.js
```

2. Docker in localhost (docker token value is in do-token.txt file)
```
docker login registry.digitalocean.com/sejutacita
docker build -t xxx .
docker run -d -it xxx
```

3. Manual Kubernetes
Update the sc-auth.yaml line 32  into
where xxx is the docker image name (must have same value as per step 2)
```
          image: xxx
```
Run kubernetes command
```
kubectl --kubeconfig="kubeconfig.yaml" apply -f sc-auth.yaml
```
4. Automate kubernetes (deployed to Digitalocean)
```
Just push to the repo and wait +- 1-2 minutes
```