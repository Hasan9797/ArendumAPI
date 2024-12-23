import { Request } from "express";
import { CustomJwtPayload } from "./CustomJwtPayload.Interface";

export interface RequestCustom extends Request
{
    user?: CustomJwtPayload;
}