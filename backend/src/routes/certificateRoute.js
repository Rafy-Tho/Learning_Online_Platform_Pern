import express from "express";
import {
  claimCertificate,
  getCertificate,
  checkCertificateEligibility,
  getCertificateById,
  getMyCertificates,
} from "../controllers/certificateControllers.js";
import requireAuth from "../middlewares/requireAuth.js";

const certificateRoute = express.Router({ mergeParams: true });

certificateRoute.get("/check", requireAuth, checkCertificateEligibility);
certificateRoute
  .route("/")
  .post(requireAuth, claimCertificate)
  .get(requireAuth, getCertificate);

export default certificateRoute;

export const standaloneCertificateRoute = express.Router();
standaloneCertificateRoute.get("/mine", requireAuth, getMyCertificates);
standaloneCertificateRoute.get("/:id", getCertificateById);
