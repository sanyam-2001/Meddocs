const admin = require("firebase-admin");

const serviceAccount = require("./meddocs-f70f8-firebase-adminsdk-hxzx0-c0c7249f47.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "gs://meddocs-f70f8.appspot.com/"
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

module.exports = {
    db,
    bucket
}