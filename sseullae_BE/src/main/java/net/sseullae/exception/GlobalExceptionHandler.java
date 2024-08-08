package net.sseullae.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<ErrorResponse> handleCustomException(CustomException e) {
        ErrorResponse errorResponse = new ErrorResponse(e.getErrorCodeName(), e.getErrorMessage());
        return ResponseEntity.status(e.getErrorCode()).body(errorResponse);
    }

}
