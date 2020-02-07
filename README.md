<center>

# Mission Control

![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg)
![React](https://img.shields.io/badge/react-16.12.0-blue)
[![code style: prettier](https://img.shields.io/badge/code%20style-prettier-ff69b4)](https://github.com/prettier/prettier)

|                                          [Kevin Afable](https://github.com/KAfable)                                          |                                          [Nicholas Gebhart](http://github.com/gebhartn)                                           |                                             [Dakotah Huey](https://github.com/frescocodes)                                             |
| :--------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------: |
|      [<img src="https://ca.slack-edge.com/T4JUEB3ME-ULJ1MK9GT-17419b760e18-512" width = "200" />](https://github.com/)       |         [<img src="https://ca.slack-edge.com/T4JUEB3ME-ULXHMK9PY-013dd2da8dd8-512" width = "200" />](https://github.com/)         |             [<img src="https://avatars0.githubusercontent.com/u/50816478?s=400&v=4" width = "200" />](https://github.com/)             |
|                     [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/KAfable)                     |                       [<img src="https://github.com/favicon.ico" width="15"> ](http://github.com/gebhartn)                        |                        [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/frescocodes)                        |
| [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/kevinafable/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/nicholas-gebhart/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/dakotah-huey-76439583/) |

|                                              [Tony Kovar](https://github.com/tonyrkovar)                                              |                                     [Roy Wakumelo Jr.](https://github.com/roywakumelojr)                                      |                                  [Tommy Coleman](https://github.com/tommycoleman87)                                   |
| :-----------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------: |
|           [<img src="https://ca.slack-edge.com/T4JUEB3ME-ULXJ07DJS-d95403332534-512" width = "200" />](https://github.com/)           |       [<img src="https://ca.slack-edge.com/T4JUEB3ME-ULXALGWPR-90c177b51aa7-512" width = "200" />](https://github.com/)       |   [<img src="https://ca.slack-edge.com/T4JUEB3ME-UHXNFRBFE-b1accb251340-512" width = "200" />](https://github.com/)   |
|                        [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/tonyrkovar)                        |                  [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/roywakumelojr)                   |              [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/tommycoleman87)              |
| [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/tony-kovar-772295136/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/roywakumelojr) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://github.com/tommycoleman87) |

</center>

## Getting started

To get the server running locally:

- Clone this repo
- Ensure you have configured your environment variables as seen below
- Export environment variables by running `source sourceme.sh`
- Run `docker-compose up --build`
- Run `primsa deploy` to fire up the Prisma data layer
- To reset the DB, run `prisma reset`
- To run the seed, run `prisma seed`

The Apollo instance is listining on port 8000, and an authenticated prisma playground with documentation regarding the exposed methods can be found on port 7000. To authenticate and view the prisma playground:

- Run `prisma token`
- Copy the token and attach it to the HTTP headers inside the playground:

```
{
"authorization": "Bearer {token}"
}
```

### Apollo Server

- [AWS Apollo Stage Console](https://console.aws.amazon.com/ecs/home?region=us-east-1#/clusters/mission-control-stage/services)
- Apollo Server is the best way to quickly build a production-ready, self-documenting API for GraphQL clients, using data from any source.
- Apollo communicates directly with the front-end to act as a bridge between the graphQL client and the prisma ORM data layer.
- Documentation can be found [here](https://www.apollographql.com/docs/apollo-server/getting-started/)

### Prisma

- Prisma is a data layer that sits between Apollo Server and the Database

- The Prisma client squats in the context layer of all resolvers run against the DB and exposes an extensive list of CRUD operations that are generated from the type definitions inside of the datam model.

- Prisma bridges the gap between your database and GraphQL resolvers. It replaces traditional ORMs and makes it easy to implement resilient, production-ready GraphQL servers.

- Documentation can be found [here](https://www.prisma.io/with-graphql)

#### Prisma Data Model

```graphql
type Program {
  id: ID! @id
  name: String! @unique
  createdAt: DateTime! @createdAt
  updatedAt: DateTime! @updatedAt
  products: [Product!]!
}
type Product {
  id: ID! @id
  name: String!
  program: Program!
  createdAt: DateTime! @createdAt
  updatedAt: DateTime! @updatedAt
  projects: [Project!]!
}
type Project {
  id: ID! @id
  name: String!
  product: Product!
  status: Boolean @default(value: false)
  sectionLead: Person @relation(link: INLINE, name: "SectionLead")
  teamLead: Person @relation(link: INLINE, name: "TeamLead")
  projectManagers: [Person!]! @relation(name: "ProjectManager")
  team: [Person!]! @relation(name: "Team")
  notes: [Note!]!
  createdAt: DateTime! @createdAt
  updatedAt: DateTime! @updatedAt
}
type Note {
  id: ID! @id
  topic: String!
  content: String!
  author: Person! @relation(name: "NoteAuthor")
  attendedBy: [Person!]! @relation(name: "NoteAttendee")
  project: Project!
  rating: Int!
  createdAt: DateTime! @createdAt
  updatedAt: DateTime! @updatedAt
}
enum Role {
  SL
  TL
  WEB
  DS
  UX
  PM
}
type Person {
  id: ID! @id
  name: String!
  email: String! @unique
  role: Role!
  authored: [Note!]! @relation(name: "NoteAuthor")
  attended: [Note!]! @relation(name: "NoteAttendee")
  manages: [Project!]! @relation(name: "ProjectManager")
  team: Project @relation(name: "Team")
  sl: [Project!]! @relation(name: "SectionLead")
  tl: Project @relation(name: "TeamLead")
  avatar: String
}
```

### Authentication Services

- Currently, Mission Control only features support for OKTA authentication services, but should work with other providers in theory. Once the client makes a request of the API, a decoded user object is attached to context that holds information about the user's email and claims.

```javascript
const context = async ({ req }) => {
  const { authorization } = req.headers;
  if (authorization) {
    const user = await decodeToken(authorization);
    return { ...req, user, prisma };
  }
  throw new Error('A valid token _must_ be provided!');
};
```

## Environment Variables

In order for the app to function correctly, the user must set up their own environment variables. Create a .env file that includes the following:

- APPLICATION_NAME - determines which application is used in the
- ENVIRONMENT_NAME - determines which environment for the application

- OAUTH_TOKEN_ENDPOINT -
- OAUTH_CLIENT_ID -

- TEST_OAUTH_CLIENT_ID - optional test account
- TEST_OAUTH_CLIENT_SECRET - optional auth test account, note that this doesn't actually use the same authorization flow, this is just for quick testing

- PRISMA_MANAGEMENT_API_SECRET - The secret used when managing any prisma service via CLI eg `prisma deploy` or `prisma seed`
- PRISMA_ENDPOINT - The endpoint of the Prisma service you are trying to manage
- PRISMA_SECRET - Secret used to send requests to the Prisma service, this must be included in the Authorization headers either in each request Apollo sends, the playground of the Prisma service, or Prisma admin view of the Prisma service

- SENDGRID_API_KEY - The key sent back to the SendGrid API to send a notification email to all project managers

## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

**If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**

- Check first to see if your issue has already been reported.
- Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
- Create a live example of the problem.
- Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Attribution

These contribution guidelines have been adapted from [this template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).
