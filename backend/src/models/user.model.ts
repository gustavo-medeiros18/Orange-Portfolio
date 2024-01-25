import { User } from '../types/user';

const userMocked: User= {
    id: 1,
    name: 'fulano',
    lastName: 'silva',
    email: 'fulano@gmail.com',
    password: 'senhaDofulano',
}

const findAll = async (): Promise<User[]> => {

    const mockedListOfUser = await [userMocked, userMocked]
    
    return mockedListOfUser as User[];
  };
  
  const findByEmail = async (_email: string): Promise<User | undefined> => {


    return userMocked;
  
  }
  
  export default {
    findAll,
    findByEmail,
  };