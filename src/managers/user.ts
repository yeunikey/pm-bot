import { User } from "../user/user";
import { Manager } from "./manager";

export class UserManager extends Manager {
    
    private users: Map<number, User> = new Map();

    public addUser(user: User) {
        this.users.set(user.id, user);
    }

    public removeUserById(id: number) {
        this.users.delete(id);
    }

    public removeUser(user: User) {
        this.removeUserById(user.id);
    }

    public containsById(id: number) {
        this.users.has(id);
    }

    public containsUser(user: User) {
        this.containsById(user.id);
    }

}