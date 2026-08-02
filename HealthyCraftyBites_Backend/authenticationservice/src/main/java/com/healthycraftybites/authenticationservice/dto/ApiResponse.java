package com.healthycraftybites.authenticationservice.dto;

import java.time.LocalDateTime;


public class ApiResponse<T> {

    private boolean success;
    private String message;
    private T data;
    private LocalDateTime timestamp;

   
    private ApiResponse(boolean success, String message, T data) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.timestamp = LocalDateTime.now();
    }

    /**
     * Use this when the operation completed successfully.
     * Example: ApiResponse.success("Product added successfully", savedProductDTO);
     */
    public static <T> ApiResponse<T> success(String message, T data) {
        return new ApiResponse<>(true, message, data);
    }

    /**
     * Use this when the operation failed (validation error, not found, etc.)
     * Example: ApiResponse.failure("Product not found");
     */
    public static <T> ApiResponse<T> failure(String message) {
        return new ApiResponse<>(false, message, null);
    }

    // Getters only - Jackson (Spring's JSON library) uses these to
    // convert this object into JSON automatically. No setters needed
    // since this object is only ever built once via the factory methods
    // above and then sent straight to the client.

    public boolean isSuccess() {
        return success;
    }

    public String getMessage() {
        return message;
    }

    public T getData() {
        return data;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }
}

 /**
  * A generic wrapper class used to send consistent, structured responses
  * to the client for every API endpoint in this project.
  *
  * Example success response:
  * {
  *   "success": true,
  *   "message": "Product added successfully",
  *   "data": { "id": 1, "name": "Paneer Tikka", "price": 250.0 },
  *   "timestamp": "2026-07-27T10:15:30"
  * }
  *
  * Example failure response:
  * {
  *   "success": false,
  *   "message": "Product with id 5 not found",
  *   "data": null,
  *   "timestamp": "2026-07-27T10:15:30"
  * }
  *
  * @param <T> the type of the data payload (e.g. ProductDTO, List<ProductDTO>, etc.) 
*/ 