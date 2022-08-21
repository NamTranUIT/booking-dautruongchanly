import express, { NextFunction, Request, Response } from "express";
import { authorizeHandler } from "../authorization/authorization.handler";
import { bookingHandler } from "../booking/booking.handler";
import { userHandler } from "../users/users.handler";
import { ROLES } from "../utils/enums";

export const router = express.Router();

router.get("/health",function (req: Request, res: Response, next: NextFunction) {
  res.send("OK");
});

router.post("/bookings", authorizeHandler.authorizer(ROLES.END_USER), bookingHandler.createBooking);
router.get("/users/:username", authorizeHandler.authorizer(ROLES.ADMIN, ROLES.END_USER), userHandler.getUserDetail);
router.post("/users", userHandler.createUser);
router.post("/login", authorizeHandler.login);
router.get("/logout", authorizeHandler.logout);
