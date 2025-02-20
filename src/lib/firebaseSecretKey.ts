
import admin from "firebase-admin";

const serviceAccount = JSON.parse(Buffer.from(process.env.NEXT_APP_PUBLIC_KEY as string, "base64").toString("utf8"));
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

}

export default admin;