export interface ErrorResponse {
    status: "error",
    data: null,
    errors: ErrorMessage[]
}

export type ErrorMessage = {
    message: string
}

export type SuccessResponse<T>={
    status: "success",
    data: T,
    errors: null
}

export type Paginated<T> = {
    content: T,
    currentPage: number,
    hasNext: boolean,
    hasPrevious: boolean,
    nextPageUrl: string | null,
    previousPageUrl: string | null,
    totalPages: number,
    totalItems: number
}