import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FirebaseService } from '../firebase/firebase.service';
import * as admin from 'firebase-admin';

@Injectable()
export class UsersService {
  private auth: admin.auth.Auth;
  private firestore: admin.firestore.Firestore;
  constructor(private firebaseService: FirebaseService) {
    this.auth = firebaseService.getAuth();
    this.firestore = firebaseService.getFirestore();
  }

  async create(createUserDto: CreateUserDto) {
    const { email, username, password, role } = createUserDto;
    let userData = null;

    await this.firestore.runTransaction(async (transaction) => {
      userData = await this.auth.createUser({ email, password });

      const userDataForFirestore = {
        uid: userData.uid,
        email: userData.email,
        role,
        username,
      };

      const userRef = this.firestore.collection('users').doc(userData.uid);
      const user = transaction.set(userRef, userDataForFirestore);

      // return userRef;
    });
    return userData;

    // return 'This action adds a new user';
  }

  async signUp(body: any) {
    const { username, email, password } = body;
    let newUser: admin.auth.UserRecord | null = null;

    // const hashedPassword = await generateHashedPassword(password);

    // 유저 생성(firebase authenticate) db(firestore)저장 transaction 처리
    await this.firestore.runTransaction(async (transaction) => {
      const userRef = this.firestore.collection('users').doc();
      newUser = await this.auth.createUser({
        email,
        password,
      });

      transaction.set(userRef, {
        userId: newUser.uid,
        name: username,
        email,
      });
    });

    return newUser;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
