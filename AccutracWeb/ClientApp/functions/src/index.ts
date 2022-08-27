import { UserRecord } from "firebase-admin/lib/auth/user-record";
import * as functions from "firebase-functions";
// // import * as firestore from "firebase-admin/firestore";

// const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { getAuth } = require("firebase-admin/auth");
admin.initializeApp();

interface UserData {
  email: string;
  password: string;
  isAdmin: boolean;
}

exports.createUser = functions.https.onCall(async (data: UserData) => {
  return await getAuth().createUser({
    email: data.email,
    password: data.password,
  })
    .then((userRecord: UserRecord) => {
      console.log("Successfully created new user:", userRecord.uid, 'Is Admin:', data.isAdmin);
      if (data.isAdmin) {
        return getAuth().setCustomUserClaims(userRecord.uid, {
          admin: true,
        })
          .then(() => {
            return userRecord.uid;
          });
      } else if (!data.isAdmin) {
        return userRecord.uid;
      }
    })
    .catch((error: functions.https.HttpsError) => {
      console.log("Error creating new user:", error);
      throw new functions.https.HttpsError("unknown", error.message, error);
    });
});

exports.deleteUserDoc = functions.auth.user().onDelete(async (user) => {
  return await admin.firestore().collection("users").doc(user.uid).delete().then(() => {
    console.log('Document deleted');
  })
  .catch((error: any) => {
    console.log(error);
  })
});

exports.getAllUsers = functions.https.onCall(async () => {
  return await getAuth().listUsers(1000).then((userResults: any) => {
    console.log(userResults);
  })
});
