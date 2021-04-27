# LAB - Bearer Auth


### Author: Ellis Yoo

### Links and Resources

- [ci/cd](https://github.com/yjyoo773/bearer-auth/actions)
- [back-end server url](https://ellis-bearer-auth.herokuapp.com/)

### Setup
#### How to initialize/run your application (where applicable)
- Dependencies
  - dotenv
  - bcrypt
  - base-64
  - jsonwebtoken
  - morgan
  - cors
  - mongoose
  - express
  - jest
  - @code-fellows/supergoose
- Application is initialized by `npm start`
- Application can run using nodemon by `npm run watch`


#### Tests

- How do you run tests?   
The tests can be run by entering `npm test` or `npm run test-watch` on the command line.  
- Any tests of note?  
The tests are split into three parts each testing the router, basic-auth-middleware, and bearer-auth-middleware.   
- Describe any tests that you did not complete, skipped, etc    
 NA