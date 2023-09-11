/*
 * This template contains a HTTP function that responds
 * with a greeting when called
 *
 * Reference PARAMETERS in your functions code with:
 * `process.env.<parameter-name>`
 * Learn more about building extensions in the docs:
 * https://firebase.google.com/docs/extensions/publishers
 */
import * as admin from "firebase-admin"
import * as functions from "firebase-functions";
import * as sharp from "sharp";
import {ModifyImgRouter} from "./router/modify-router";

sharp.cache(false);

// Initialize the Firebase Admin SDK
admin.initializeApp();

exports.modifyImg = functions.https.onRequest(ModifyImgRouter);
