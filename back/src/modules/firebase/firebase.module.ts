import { Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';

// import * as admin from 'firebase-admin';
// import * as serviceAccount from '../firebase/firebaseServiceAccount.json';

// const firebaseConfig = serviceAccount as admin.ServiceAccount;

// const firebaseProvider = {
//   provide: 'FirestoreInstance',
//   useFactory: () => {
//     const firebaseAdmin = admin.initializeApp({
//       credential: admin.credential.cert(firebaseConfig),
//       databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
//       storageBucket: `${serviceAccount.project_id}.appspot.com`,
//     });
//     return firebaseAdmin.firestore();
//   },
// };

// @Module({
//   imports: [],
//   providers: [firebaseProvider],
//   exports: ['FirestoreInstance'],
// })
@Module({
  imports: [],
  providers: [FirebaseService],
  exports: [FirebaseService],
})
export class FirebaseModule {}
