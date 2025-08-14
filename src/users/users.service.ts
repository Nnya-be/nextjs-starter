import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user-dto';
import { CreateUserDto } from './dto/create-user-dto';

@Injectable()
export class UsersService {
    private users = [
  {
    "id": 1,
    "name": "Alice Johnson",
    "role": "ENGINEER",
    "email": "alice.johnson@example.com",
    "createdAt": "2025-01-15T10:30:00Z",
    "updatedAt": "2025-08-10T14:20:00Z"
  },
  {
    "id": 2,
    "name": "Bob Smith",
    "role": "ADMIN",
    "email": "bob.smith@example.com",
    "createdAt": "2025-02-20T09:15:00Z",
    "updatedAt": "2025-07-25T16:45:00Z"
  },
  {
    "id": 3,
    "name": "Clara Lee",
    "role": "INTERN",
    "email": "clara.lee@example.com",
    "createdAt": "2025-03-10T12:00:00Z",
    "updatedAt": "2025-08-01T11:10:00Z"
  },
  {
    "id": 4,
    "name": "David Brown",
    "role": "ENGINEER",
    "email": "david.brown@example.com",
    "createdAt": "2025-04-05T08:45:00Z",
    "updatedAt": "2025-08-12T09:30:00Z"
  },
  {
    "id": 5,
    "name": "Emma Davis",
    "role": "INTERN",
    "email": "emma.davis@example.com",
    "createdAt": "2025-05-18T15:20:00Z",
    "updatedAt": "2025-08-13T10:00:00Z"
  }
]

    findAll(role ?: 'INTERN' | 'ADMIN' | 'ENGINEER'){
        if(role){
            const rolesArray =  this.users.filter(user => user.role == role);
            if(rolesArray.length === 0){
                return new NotFoundException("No User Found with this role!")
            }
            return rolesArray;
        }

        return this.users;
    }

    findUser(id: number){
        const user = this.users.find(user => user.id === id);
        if(!user)
            throw new NotFoundException("User Not Found!");
        return user;
    }

    createUser(createUserDto:CreateUserDto){
        const usersByHighestId = [...this.users].sort((a,b) => b.id - a.id);

        const newUser = {
            id: usersByHighestId[0].id + 1,
            ...createUserDto,
            updatedAt: new Date().toISOString(),
            createdAt: new Date().toISOString()
        }

        this.users.push(newUser);

        return newUser;
    }

    updateUser(id: number, updateUserDto:UpdateUserDto){
        this.users = this.users.map(user => {
            if(user.id === id){
                return { ...user, ...updateUserDto, updatedAt: new Date().toISOString() };
            }
            return user;
        })

        return this.findUser(id);
    }

    deleteUser(id: number){
        const removedUser = this.findUser(id);

        this.users = this.users.filter(user => user.id !== id);

        return removedUser;
    }
}
