
# Nodejs Task Manager Application

A task manager REST API complete with user accounts and authentication.

## Pre-requisites

Install Node.js version 8.0.0 or above

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT` -- communication endpoint

`SENDGRID_API_KEY` -- Form sendgrid website

`MONGODB_URL` -- For managing data on server

`JWT_SECRET` -- To authanticate user

The develompent and test environment variables should be placed into the following files such as:

* Development - `/config/dev.env`
* Test - `/config/test.env`

Tests can be executed by cloning the testing-application branch.
## Getting started

* Clone the repository

```
git clone  <github project url> <project_name>
```
* Install dependencies

```
cd <project_name>
npm install
```

* Build and run the project
```
npm start

```

Navigate to `http://localhost:3000`

## Running Tests

To run tests, run the following command

```bash
  npm run test
```


## API Reference

#### Create user

```http
  POST /{{url}}/users
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. Your user name |
| `email` | `string` | **Required, Unique**. Your user email |
| `password` | `string` | **Required**. Your user password|


#### Login user

```http
  POST {{url}}/users/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. email of user to fetch |
| `password`      | `string` | **Required**. password of user to verify |

####  User profile

```http
  GET /{{url}}/users/me
```
