import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request } from 'express';
import * as admin from 'firebase-admin';
import { FirebaseService } from 'src/modules/firebase/firebase.service';

@Injectable()
export class PreAuthMiddleware implements NestMiddleware {
  constructor(private firebaseService: FirebaseService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (token != null && token != ' ') {
      const auth = this.firebaseService.getAuth();
      const firestore = this.firebaseService.getFirestore();
      const decodedToken = await auth.verifyIdToken(
        token.replace('Bearer ', ''),
      );
      const { uid } = decodedToken;

      //해당 문서의 reference를 가져옴
      const userRef = firestore.collection('users').doc(uid);

      //문서 데이터
      const userSnap = await userRef.get();
      if (!userSnap.exists) throw new UnauthorizedException();

      req.user = { ...decodedToken, ...userSnap.data() };
      console.log(
        '!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
        userSnap.data(),
        '!!!!!!!!!!!!!!',
      );
      console.log(req.user);

      next();
    }
  }
}
