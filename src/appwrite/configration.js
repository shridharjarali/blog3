import Config from "../config/config";
import { Client, ID,Databases,Storage,Query } from "appwrite";
import { Permission,Role } from "appwrite";

export class Service{
    
    client = new Client();
    databases;
    storage;

    constructor() {
        this.client
            .setEndpoint(Config.appWriteURL)
            .setProject(Config.appWriteProjectID)

        this.databases = new Databases(this.client)
        this.storage = new Storage(this.client)
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        // console.log("in configration");
        // console.log(title)
        // console.log(slug);
        // console.log(content);
        // console.log(featuredImage);
        // console.log(status);
        // console.log(userId);        
        
             const permissions = [
            Permission.read(Role.any()),       
            Permission.write(Role.user(userId)) 
        ]
       
        try {
            return await this.databases.createDocument(
                Config.appWriteDatabaseID,
                Config.appWriteCollectionID,
                ID.unique(),
                {
                    title,
                    slug,
                    content,
                    featuredImage,
                    status,
                    userId,
                },
                permissions
            )
        } catch (error) {
            throw error;
        }
    }

    async updatePost(slug,{title,content,featuredImage,status,userID}){
        try {
            return await this.databases.updateDocument(Config.appWriteDatabaseID,Config.appWriteCollectionID,slug,{title,content,featuredImage,status})
        } catch (error) {
            throw error;
        }
    }

    async deletePost(slug){
        try {
            return await this.databases.deleteDocument(Config.appWriteDatabaseID,Config.appWriteCollectionID,slug)
        } catch (error) {
            throw error;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(Config.appWriteDatabaseID,Config.appWriteCollectionID,slug)
        } catch (error) {
            throw error;
        }
    }

    async getPosts(quries = [Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(Config.appWriteDatabaseID,Config.appWriteCollectionID,quries)
        } catch (error) {
            throw error;
        }
    }

    async getMyPosts(userID,quries = [Query.equal("userId",[userID])])
    {
        try {
            return await this.databases.listDocuments(Config.appWriteDatabaseID,Config.appWriteCollectionID,quries)
        } catch (error) {
            throw error
        }
    }

    async uploadFile(file){
        try {
            return await this.storage.createFile(Config.appWriteBucketID,ID.unique(),file)
        } catch (error) {
            throw error;
        }
    }

    async deleteFile(fileID){
        console.log(this.storage.deleteFile(Config.appWriteBucketID,fileID));
        
        try {
            return await this.storage.deleteFile(Config.appWriteBucketID,fileID)
        } catch (error) {
            throw error;
        }
    }

    getFilePreview(fileID){
        try {
            // return this.storage.getFilePreview(Config.appWriteBucketID,fileID)
             return this.storage.getFileView(Config.appWriteBucketID,fileID)
        } catch (error) {
            throw error;
        }
    }
}

const service = new Service();

export default service