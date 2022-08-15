# RSS-Server
This is simple REST API for CRUD requests with rss links.

## Version: 1.0.0

**Contact information:**  
Dmitry Kutuzov  

### /user/register

#### POST
##### Summary

Register new user

##### Description

Register new user and return UserModel

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | User successfully registered |
| 400 | Validation error: invalid input request |
| 422 | User already exists |

### /user/login

#### POST
##### Summary

Identificates user

##### Description

Authorizates user by password

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Succesfully authorized |
| 400 | Validation error: invalid input request |
| 401 | Authorization failed |

### /user/info

#### GET
##### Summary

Gets user information

##### Description

Gets user informaion only for authorized user

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Succesfully gets user information |
| 401 | Access token is missing or invalid |
| 404 | User not found |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearerAuth | |

### /rss/

#### GET
##### Summary

Gets user links

##### Description

Gets user rss links

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Gets users rss links |
| 204 | User have no content |
| 401 | Access token is missing or invalid |
| 404 | User not found |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearerAuth | |

### /rss/create

#### POST
##### Summary

Create one rss link

##### Responses

| Code | Description |
| ---- | ----------- |
| 201 | Successfully created link |
| 401 | Access token is missing or invalid |
| 404 | User not found |
| 503 | Server unavailable |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearerAuth | |

### Models

#### UserRegisterDto

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| email | string |  | No |
| password | string |  | No |
| name | string |  | No |

#### UserLoginDto

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| email | string |  | No |
| password | string |  | No |
