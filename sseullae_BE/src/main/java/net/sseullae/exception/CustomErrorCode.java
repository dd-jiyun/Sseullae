package net.sseullae.exception;

import org.springframework.http.HttpStatus;

public enum CustomErrorCode implements ErrorCode {
    DUPLICATE_NICKNAME(HttpStatus.BAD_REQUEST, "닉네임이 이미 사용 중입니다."),
    INPUT_VALUE_INVALID(HttpStatus.BAD_REQUEST, "입력 값이 올바르지 않습니다."),

    MEMBER_NOT_FOUND(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다."),
    ANSWER_NOT_FOUND(HttpStatus.NOT_FOUND, "답변을 찾을 수 없습니다.");

    private final HttpStatus status;
    private final String message;

    CustomErrorCode(HttpStatus status, String message) {
        this.status = status;
        this.message = message;
    }

    @Override
    public HttpStatus getStatus() {
        return status;
    }

    @Override
    public String getMessage() {
        return message;
    }

}
