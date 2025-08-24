import Config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthServise {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(Config.appWriteURL)
            .setProject(Config.appWriteProjectID)

        this.account = new Account(this.client)
    }

    
        async createAccount({email,password,name})
        {
            try {
                // console.log("create account");
                
                const userAcc = await this.account.create(ID.unique(),email,password,name)
                return this.login({email,password})
            } catch (error) {
                throw error;
            }
        }

        async login({email,password}){
            try {
                // console.log(email);
                // console.log(password);
                
                return await this.account.createEmailPasswordSession(email,password)
            } catch (error) {
                throw error;
                
            }
        }
        
        async getCurrentUser(){
            try {
                return await this.account.get()
            } catch (error) {
                // console.log(error);
                return false;
            }
        }

        async logout(){
            // console.log("servise logout");
            
            try {
                return await this.account.deleteSessions()
            } catch (error) {
                throw error;
                return false
            }
        }
}

const authServise = new AuthServise()

export default authServise