import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request } from 'express';
import * as admin from 'firebase-admin';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class PreAuthMiddleware implements NestMiddleware {
  private auth: admin.auth.Auth;
  constructor(private firebaseService: FirebaseService) {
    this.auth = firebaseService.getAuth();
  }

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (token != null && token != ' ') {
      const decodedToken = await this.auth.verifyIdToken(
        token.replace('Bearer', ''),
      );
      req.user = { uid, email, role } = decodedToken;

      next();
    }
  }
}
