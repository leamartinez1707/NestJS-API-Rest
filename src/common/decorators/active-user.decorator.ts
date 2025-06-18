import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { RequestWithUser } from "src/auth/auth.controller";


export const ActiveUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    return request.user; // Assuming the user is attached to the request object
})