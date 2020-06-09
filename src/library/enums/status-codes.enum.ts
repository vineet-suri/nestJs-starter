export const enum STATUS_CODE {
    // sonarignore:start
    OK = 200,
    CREATED,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORISED,
    FORBIDDEN = 403,
    NOT_FOUND,
    UNPROCESSED_ENTITY = 422,
    INTERNAL_SERVER_ERROR = 500,
    // sonarignore:end
}
