import { Firestore } from '@google-cloud/firestore';
import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import * as admin from 'firebase-admin';
@Injectable()
export class UsersService {
  private readonly firestore: Firestore;
  private readonly auth: admin.auth.Auth;

  constructor(private readonly firebaseService: FirebaseService) {
    // TODO 의존성 주입에 알맞지 않는 코드라는 생각. 나중에 수정하는거 생각해보기
    //TODO  solution1.   Injection을 사용하게 된다면 init을 두번하는 일이 발생. solution2. provider에서 삼항연산자 사용하기
    this.firestore = firebaseService.getFirestore();
    this.auth = firebaseService.getAuth();
  }

  async signUp() {
    let newUser: admin.auth.UserRecord | null = null;

    await this.firestore.runTransaction(async (transaction) => {
      const userRef = this.firestore.collection('users').doc();
      newUser = await this.auth.createUser({
        email: 'test1@test.com',
        password: 'testtest',
      });

      transaction.set(userRef, {
        userId: newUser.uid,
        name: 'Test1',
        email: 'test1@test.com',
      });
    });

    return newUser;
  }

  async getUser() {
    const user = await this.auth.getUserByEmail('test@test.com');
    return user;
  }
}
