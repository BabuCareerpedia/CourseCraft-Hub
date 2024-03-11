import logger from "src/logger";
import { IUser } from "src/models";
import { executeQuery } from "../helpers/sql.query.util";
import { QueryTypes } from "sequelize";
import { hashPassword } from "src/helpers/encryption";
var crypto=require("crypto") 

const TAG = 'data_stores_mysql_lib_user'

export async function signUp(user: IUser) {
  logger.info(`${TAG}.saveUser()`);
  try {
    const hashedPassword = await hashPassword(user.password);
    const data = {
      uid: crypto.randomUUID(),
      email: user.email,
      password: hashedPassword
    };
    let mentorInsertQuery = `insert into ADMIN (UID, EMAIL, PASSWORD)
    values(:uid, :email, :password)`;
   

    await executeQuery(mentorInsertQuery, QueryTypes.INSERT, {
      ...data,
    });
    return data;

  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.saveUser()`, error);
    throw error;
  }
}


export async function checkEmailExist(email: string) {
    try {
      logger.info(`${TAG}.checkEmailOrPhoneExist()  ==>`, email);
  
      let query = 'select * from ADMIN where EMAIL=:email ';
      const [user] = await executeQuery(query, QueryTypes.SELECT, {
        email
      });
      return user;
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.checkEmailOrPhoneExist()`, error);
      throw error;
    }
  }

  // export async function postgres(user){
  //   try {
  //     logger.info(`${TAG}.checkEmailOrPhoneExist()  ==>`, user);
  //     console.log("aaaaaaaaaaaaaaaa")
  //     console.log(user)
  //     let query = `insert into users (name, email, password)
  //     values(:name, :email, :password)`;
  //     console.log("aaaaaaaaaaaaaaaaaaaaanmmm")
  //     const [user] = await executeQuery(query, QueryTypes.INSERT, {
  //       user
  //     });
  //     return user;
  //   } catch (error) {
  //     logger.error(`ERROR occurred in ${TAG}.checkEmailOrPhoneExist()`, error);
  //     throw error;
  //   }
  // }



  export async function postgres(user) {
    logger.info(`${TAG}.saveUser()`);
    try {
      let mentorInsertQuery = `insert into USERS (name, email, password)
      values(:name, :email, :password)`;
      await executeQuery(mentorInsertQuery, QueryTypes.INSERT, {
        ...user,
      });
      return user;
  
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.saveUser()`, error);
      throw error;
    }
  }
  