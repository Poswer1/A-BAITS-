import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentUser = createParamDecorator(
    (data: 'id', ctx: ExecutionContext) => { // ctx позволяет получить доступ к текущему запросу (Request), ответу (Response)
        const request = ctx.s
    }
)