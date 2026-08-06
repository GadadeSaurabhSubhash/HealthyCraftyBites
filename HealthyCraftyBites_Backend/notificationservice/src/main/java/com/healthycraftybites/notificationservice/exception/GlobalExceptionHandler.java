package com.healthycraftybites.notificationservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import com.healthycraftybites.notificationservice.dto.ApiResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {
	
	@ExceptionHandler(InvalidInputException.class)
	public ResponseEntity<ApiResponse<Object>> handleInvalidInput(InvalidInputException ex){
		ApiResponse<Object> response = ApiResponse.failure(ex.getMessage());
		return new ResponseEntity<>(response,HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(MethodArgumentTypeMismatchException.class)
	public ResponseEntity<ApiResponse<Object>> handleMethodArgumentTypeMismatch(MethodArgumentTypeMismatchException ex){
		ApiResponse<Object> response = ApiResponse.failure("Input Value passed for "+ex.getName()+" is of Invalid Type!");
		return new ResponseEntity<>(response,HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(Exception.class)
	public ResponseEntity<ApiResponse<Object>> handleGenericException(Exception ex){
		ApiResponse<Object> response = ApiResponse.failure("Oops! Something went wrong. Please Try Again.");
		return new ResponseEntity<>(response,HttpStatus.INTERNAL_SERVER_ERROR);
	}
}
