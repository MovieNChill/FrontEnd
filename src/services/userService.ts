/**
 * Generated by orval v6.10.3 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import type {
  User,
  CustomResponseUser,
  LoginDTO
} from '../entities/user'
import { userApi } from '../api/baseApi'



  export const getAllUsers = (
    
 ) => {
      return userApi<User[]>(
      {url: `/api/users`, method: 'get'
    },
      );
    }
  
export const updateUser = (
    user: User,
 ) => {
      return userApi<User>(
      {url: `/api/users`, method: 'put',
      headers: {'Content-Type': 'application/json', },
      data: user
    },
      );
    }
  
export const register = (
    user: User,
 ) => {
      return userApi<CustomResponseUser>(
      {url: `/api/users/register`, method: 'post',
      headers: {'Content-Type': 'application/json', },
      data: user
    },
      );
    }
  
export const login = (
    loginDTO: LoginDTO,
 ) => {
      return userApi<CustomResponseUser>(
      {url: `/api/users/login`, method: 'post',
      headers: {'Content-Type': 'application/json', },
      data: loginDTO
    },
      );
    }
  
export const getUserByid = (
    id: number,
 ) => {
      return userApi<User>(
      {url: `/api/users/${id}`, method: 'get'
    },
      );
    }
  
export const deleteUser = (
    id: number,
 ) => {
      return userApi<boolean>(
      {url: `/api/users/${id}`, method: 'delete'
    },
      );
    }
  
export type GetAllUsersResult = NonNullable<Awaited<ReturnType<typeof getAllUsers>>>
export type UpdateUserResult = NonNullable<Awaited<ReturnType<typeof updateUser>>>
export type RegisterResult = NonNullable<Awaited<ReturnType<typeof register>>>
export type LoginResult = NonNullable<Awaited<ReturnType<typeof login>>>
export type GetUserByidResult = NonNullable<Awaited<ReturnType<typeof getUserByid>>>
export type DeleteUserResult = NonNullable<Awaited<ReturnType<typeof deleteUser>>>
