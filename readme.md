## GoIT Node.js Course Template Homework

- hw02 (створення роутів оробки запитів)
- hw03 (MongoDB, графический редактор MongoDB Compass, створення бази данних)
- hw04

  ## POST api/users/signup

  req.body:
  {"email": "vita@i.ua",
  "password": "123456"}

  response:
  "user": {
  "email": "elsa@i.ua",
  "subscription": "starter"
  }

  ## POST api/users/login

  req.body:
  {
  "email": "den@i.ua",
  "password": "654321"
  }
  response:
  {
  "token": "user token",
  "user": {
  "email": "den@i.ua",
  "subscription": "starter"
  }
  }

  ## GET api/users/logout

  Authorization: "Bearer {{token}}"

  response:
  Status: 204 No Content

  ## GET api/users/current

  Authorization: "Bearer {{token}}"

  response:
  {
  "email": "example@example.com",
  "subscription": "starter"
  }

  ## PATCH api/users

  Authorization: "Bearer {{token}}"
  req.body: {
  "subscription" : "['starter', 'pro', 'business']"
  }

  response: {
  "email": "den@i.ua",
  "subscription": "pro"
  }

## GET api/contacts

Authorization: "Bearer {{token}}"
params:
page=1
limit=5
favorite="true/false"

response:
[
{
"_id": "638dade84e889be3d4ed8d44",
"name": "Job HR 5",
"email": "hr5@i.ua",
"phone": "(555) 555-5555",
"favorite": false,
"owner": {
"_id": "6389cc8239a9f6652ae0f6c7",
"email": "den@i.ua",
"subscription": "pro"
}
]

## GET api/contacts/:id

Authorization: "Bearer {{token}}"
params:
id

response:
{
"\_id": "638db54d75a1bf8116da70c5",
"name": "Job HR 7",
"email": "hr7@i.ua",
"phone": "(777) 777-7777",
"favorite": false,
"owner": {
"\_id": "6389cc8239a9f6652ae0f6c7",
"email": "den@i.ua",
"subscription": "pro"
}
}

## POST api/contacts

Authorization: "Bearer {{token}}"
req.body: {
"name": Joi.string().min(2).required(),
"email": Joi.string().email().required(),
"phone": Joi.string()
.pattern(/^\+|\d[\s\d\-\(\)]\*\d$/)
.required(),
}

response:
{
"name": "Job HR",
"email": "hrs@i.ua",
"phone": "(000) 000-0000",
"favorite": false,
"owner": "6389cc8239a9f6652ae0f6c7",
"\_id": "638efae397693a9ddbf58b09",
"\_\_v": 0
}

## DEL api/contacts/:id

Authorization: "Bearer {{token}}"
params:
id

response:
{
"message": "contact deleted"
}

## PUT api/contacts/:id

Authorization: "Bearer {{token}}"
params:
id
req.body: {
"name": Joi.string().min(2),
"email": Joi.string().email(),
"phone": Joi.string().pattern(/^\+|\d[\s\d\-\(\)]\*\d$/),
}).min(1)

response:
{
"\_id": "638dade84e889be3d4ed8d44",
"name": "VITA555555555",
"email": "hr5@i.ua",
"phone": "(555) 555-5555",
"favorite": false,
"owner": "6389cc8239a9f6652ae0f6c7",
"\_\_v": 0
}

## PATCH api/contacts/:id/favorite

Authorization: "Bearer {{token}}"
params:
id
req.body: {
"favorite": Joi.string().required(),
}

response:
{
"\_id": "638dade84e889be3d4ed8d44",
"name": "VITA555555555",
"email": "hr5@i.ua",
"phone": "(555) 555-5555",
"favorite": true,
"owner": "6389cc8239a9f6652ae0f6c7",
"\_\_v": 0
}

## ctrlAuthenticate - мідлвара перевірки токена (авторизації) додана до всіх маршрутів, які мають бути захищені

- hw05
- hw06

### Команди:

- `npm start` &mdash; старт сервера в режимі production
- `npm run start:dev` &mdash; старт сервера в режимі розробки (development)
- `npm run lint` &mdash; запустити виконання перевірки коду з eslint, необхідно виконувати перед кожним PR та виправляти всі помилки лінтера
- `npm lint:fix` &mdash; та ж перевірка лінтера, але з автоматичними виправленнями простих помилок
