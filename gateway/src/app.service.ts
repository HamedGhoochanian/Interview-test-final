import {Injectable} from "@nestjs/common";
import {PostType, User} from "./app.types";
import {broker} from './broker';
import Debug from "debug";

const debug = Debug("service");

@Injectable()
export class UserService {
    async get(id: string): Promise<User> {
        try {
            const user = <User>(await broker.call('users.get', {id}, {nodeID: "db-micro"}));
            debug(user);
            return user;
        } catch (e) {
            return null;
        }
    }

    async list(): Promise<User[]> {
        const users = <User[]>(await broker.call('users.find', null, {nodeID: "db-micro"}));
        debug(users, typeof users);
        return users;
    }

    async delete(id: string): Promise<boolean> {
        try {
            const user = <User>(await broker.call('users.get', {id}, {nodeID: "db-micro"}));
            debug(user)
            await broker.call('users.remove', {id}, {nodeID: "db-micro"})
            return true;
        } catch (e) {
            return false;
        }
    }

    async create(name: string): Promise<User> {
        const user = <User>await broker.call('users.create', {name}, {nodeID: 'db-micro'});
        debug(user)
        return user
    }

    async update(id: string, name: string): Promise<any> {
        try {
            const user = <User>(await broker.call('users.get', {id}, {nodeID: "db-micro"}));
            debug(user);
            const updated = (await broker.call('users.updateUser', {id, update: {$set: {name}}}, {nodeID: "db-micro"}));
            debug(updated);
            return updated;
        } catch (e) {
            return null;
        }
    }
}

@Injectable()
export class PostService {
    async get(id: string): Promise<PostType> {
        try {
            const post = <PostType>await broker.call('posts.get', {id}, {nodeID: "db-micro"});
            debug(post);
            return post;
        } catch (e) {
            return null;
        }
    }

    async list(): Promise<PostType[]> {
        const posts = <PostType[]>await broker.call('posts.find', null, {nodeID: "db-micro"});
        debug(posts);
        return posts;
    }

    async delete(id: string): Promise<boolean> {
        try {
            const post = <User>(await broker.call('posts.get', {id}, {nodeID: "db-micro"}));
            debug(post)
            await broker.call('posts.remove', {id}, {nodeID: "db-micro"})
            return true;
        } catch (e) {
            return false;
        }
    }

    async create(title: string, content: string, author: string): Promise<PostType> {
        try {
            await broker.call('users.get', {id: author}, {nodeID: "db-micro"});
        } catch (e) {
            return null;
        }
        const post = <PostType>await broker.call('posts.create', {
            title,
            content,
            author,
            dateCreated: new Date(),
        }, {nodeID: "db-micro"});
        debug(post);
        return post;
    }

    async update(id: string, params: { title: string, content: string, author: string }): Promise<any> {
        try {
            const post = <PostType>(await broker.call('posts.get', {id}, {nodeID: "db-micro"}));
            debug(post);
            if (params.author) {
                try {
                    await broker.call('users.get', {id: params.author}, {nodeID: "db-micro"});
                } catch (e) {
                    return false;
                }
            }
            const updateParams = {
                title: params.title ?? post.title,
                content: params.content ?? post.content,
                author: params.author ?? post.author,
            }
            const updated = (await broker.call('posts.updatePost', {
                id,
                update: {$set: updateParams}
            }, {nodeID: "db-micro"}));
            debug(updated);
            return updated;
        } catch (e) {
            return null;
        }
    }
}
