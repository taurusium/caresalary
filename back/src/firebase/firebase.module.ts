import { Module } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { firebaseConfig } from 'src/configs/firebase.config';

const serviceAccount = firebaseConfig as admin.ServiceAccount;

const firebaseProvider = {
  provide: 'FirestoreInstance',
  useFactory: () => {
    const firebaseAdmin = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: `https://${firebaseConfig.project_id}.firebaseio.com`,
      storageBucket: `${firebaseConfig.project_id}.appspot.com`,
    });
    return firebaseAdmin.firestore();
  },
};

@Module({
  imports: [],
  providers: [firebaseProvider],
  exports: ['FirestoreInstance'],
})
export class FirebaseModule {}
