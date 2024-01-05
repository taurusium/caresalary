import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { FirebaseService } from 'src/modules/firebase/firebase.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private firebaseService: FirebaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;

    if (token != null && token != ' ') {
      const auth = this.firebaseService.getAuth();
      const firestore = this.firebaseService.getFirestore();
      const decodedToken = await auth.verifyIdToken(
        token.replace('Bearer ', ''),
      );
      const { uid } = decodedToken;

      const userRef = firestore.collection('users').doc(uid);
      const userSnap = await userRef.get();
      if (!userSnap.exists) throw new UnauthorizedException();

      request.user = { userId: userRef.id, ...userSnap.data() };

      return true;
    }

    throw new UnauthorizedException();
  }
}
