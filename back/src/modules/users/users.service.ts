import { Firestore } from '@google-cloud/firestore';
import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/modules/firebase/firebase.service';
import * as admin from 'firebase-admin';
import { generateHashedPassword } from 'common/utils/passowrd.generator';
@Injectable()
export class UsersService {
  private readonly firestore: Firestore;
  private readonly auth: admin.auth.Auth;

  constructor(private readonly firebaseService: FirebaseService) {
    // TODO 의존성 주입에 알맞지 않는 코드라는 생각. 나중에 수정하는거 생각해보기
    //TODO  solution1.   Injection을 사용하게 된다면 init을 두번하는 일이 발생. solution2. provider에서 삼항연산자 사용하기
    // 삼항연산자
    //     import { Module, Global } from '@nestjs/common';
    // import * as admin from 'firebase-admin';

    // @Global() // Makes this module available globally
    // @Module({
    //   providers: [
    //     {
    //       provide: 'FirestoreInstance',
    //       useFactory: () => {
    //         const firebaseApp = admin.apps.length ? admin.app() : admin.initializeApp();
    //         return firebaseApp.firestore(); // Access Firestore service
    //       },
    //     },
    //     {
    //       provide: 'AuthInstance',
    //       useFactory: () => {
    //         const firebaseApp = admin.apps.length ? admin.app() : admin.initializeApp();
    //         return firebaseApp.auth(); // Access Auth service
    //       },
    //     },
    //   ],
    //   exports: ['FirestoreInstance', 'AuthInstance'], // Export Firestore and Auth services
    // })
    // export class FirebaseModule {}

    this.firestore = firebaseService.getFirestore();
    this.auth = firebaseService.getAuth();
  }

  async signUp(body: any) {
    const { username, email, password } = body;
    let newUser: admin.auth.UserRecord | null = null;

    const hashedPassword = await generateHashedPassword(password);

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

  async getUserById(userId: string) {
    return await this.auth.getUser(userId);
  }
  async getUserByEmail(email: string) {
    const user = await this.auth.getUserByEmail(email);
    return user;
  }
}
