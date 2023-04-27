import { Router } from 'express';
import userController from '.';
// import User from '../models/user';

const router = Router();

// Validate an existing user and issue a JWT

router.post(
  '/login',
  /*  #swagger.parameters['user'] = {
    in: 'body',
    description: 'User Credentials',
    schema:{
      username : "username",
      password: "password"
    }

} 
#swagger.responses[201] = {
description: 'Login Success',
schema: { 
"success": true,
"token": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTlmZWNjMWM4YTgzYTI5OTFjMjc4ZDMiLCJpYXQiOjE2Mzg3OTA5NTA3OTEsImV4cCI6MTYzODc5MDk1MDc5MX0.fo_7mzhFIjiyy_8aljHM5qMy1fo2Z5fWR770jlRML4uf7Vti7yy0yJ8FCgQWwPZOIo4cCVMDDwTmHiyDJssrtCbfMwFzCavHXewNHameBeUKa6HhjovF1WUhOzT9uN18AE0nNlszGdXyrYTo-UVHHFHf28ZsQxuBqT9n7In0RTH8BpnjiNfcv7x3je7MZnOo3w4LNmvtxzKE-AIc5AnyxSoYZ7d-7Lx423vpM14zwBiyPyK1VzEA1bv2wP7N_OvtVn59gU79r3kozPcY3ME_PBpkIwnFzKwey7dfAIECS_MtBDLhBkTQX2FBEv1IisMsMgPxdluJl1mONu6Q3CbEOlZTjofLdWyQUbHRsIsA6GNGFl39RjkVa2jB2Grgg_OC5cjgMlRns2UnxgbgJA-IaIrq3bSHRsCSXuG4MsbGVhaB02XwPM5wNCjlON59A9891R9fhesh97C42iwv11_Vus7Qs2YLoaPawqCpDyqyF3PSOLhLiJCaUIjriat0p1lHwiJQqnKkBI4JN-hc0e0TLeJUTeW14BAa3d1qKz9Lxt3MghU8SlFnySYvXH3S_5Nc0dKBh58UvYK0bk0nNei_PUxMqO1slu_oOruXI2U7f0SjY5YlD1YThvdEmJR7VB_vthynyIXctO9RXzGIg05mWrrdbpR_0-PDf0xUeu2OiJM",
"expiresIn": "1d"
}
} 

#swagger.responses[401] = {
description: 'Username or password invalid', 
schema:{
"success": false,
"msg": "username or password invalid"
}
} 
*/
  userController.loginUser
);

// Register a new user
router.post(
  '/register',
  /*  #swagger.parameters['user'] = {
    in: 'body',
    description: 'User Credentials',
    schema:{
      username : "username",
      password: "password"
    }

} 
*/
  userController.createUser
);

export default router;
