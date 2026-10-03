import {type ErrorResponse, type ErrorMessage} from "../types"

export class ServerError implements ErrorResponse {
    status = "error" as const
    data = null
    errors: ErrorMessage[]
    constructor(errors: ErrorMessage[]) {
        this.errors = errors
    }
}