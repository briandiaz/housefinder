import { UserRO } from "./user.interface";

export interface JwtPayload {
  user: UserRO,
  accessToken: string,
};
