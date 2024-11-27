// OrderModel.ts
import { defineStore } from 'pinia'
import bcrypt from "bcryptjs";

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      userLogged : null as User | null,
      users: [] as User[]
    }
  },
  actions: {
    async register(username: string, email: string, password: string) : Promise<User> {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const role = username == "admin" ? "admin" : "user"

      const user: User = {
        username: username,
        password: hashedPassword,
        email: email,
        role: role
      }

      this.users.push(user)
      this.userLogged = user
      return user
    },
    async login(username: string, password: string) : Promise<User> {
      const user : User | undefined = this.users.find((user) => user.username === username)

      if(!user)
        throw new TypeError("This user doesn't exist : " + username)

      const isMatch = await bcrypt.compare(password, user.password);

      if(!isMatch)
        throw new TypeError("The password is not correct for : " + username)

      this.userLogged = user
      return user
    },
    logout(){
      this.userLogged = null
    },
    deleteUser(username: string){
      this.users = this.users.filter(user => user.username !== username);
    }
  }
})

export interface User {
  username: string
  password: string
  email: string,
  role: string,
}
