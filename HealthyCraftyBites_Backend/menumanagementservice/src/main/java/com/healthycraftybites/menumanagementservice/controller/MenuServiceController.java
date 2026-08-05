package com.healthycraftybites.menumanagementservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.healthycraftybites.menumanagementservice.dto.ApiResponse;
import com.healthycraftybites.menumanagementservice.dto.IngredientDTO;
import com.healthycraftybites.menumanagementservice.dto.ProductDTO;
import com.healthycraftybites.menumanagementservice.service.MenuService;

@RestController
@RequestMapping("/menumanagementservice/menuservice")
public class MenuServiceController {
	
	@Autowired
	MenuService objMenuService;
	
	@PostMapping("/addnewproduct")
	public ResponseEntity<ApiResponse<ProductDTO>> addNewProduct(@RequestBody ProductDTO objNewProductDTO) {
		ProductDTO savedProduct = objMenuService.addNewProduct(objNewProductDTO);
		
		ApiResponse<ProductDTO> response = ApiResponse.success("Product added successfully", savedProduct);
		
		return new ResponseEntity<>(response,HttpStatus.CREATED);
	}
	
	@GetMapping("/viewallproducts")
	public ResponseEntity<ApiResponse<List<ProductDTO>>> viewAllProducts() {
		List<ProductDTO> objProductsList = objMenuService.viewAllProducts();
		
		ApiResponse<List<ProductDTO>> response = ApiResponse.success("All Products are fetched and sent successfully", objProductsList);
		
		return new ResponseEntity<>(response,HttpStatus.OK);
	}
	
	@PatchMapping("/changeproductavailabilitystatus")
	public ResponseEntity<ApiResponse<ProductDTO>> changeProductAvailabilityStatus(@RequestParam(name = "targetProductId") int targetProductId,@RequestParam(name = "newAvailabilityStatus") int newAvailabilityStatus) {
		ProductDTO objUpdatedProduct = objMenuService.changeProductAvailabilityStatus(targetProductId, newAvailabilityStatus);
		
		ApiResponse<ProductDTO> response = ApiResponse.success("Availability Status Updated successfully", objUpdatedProduct);
		
		return new ResponseEntity<>(response,HttpStatus.OK);
	}
	
	@DeleteMapping("/deleteproduct")
	public ResponseEntity<ApiResponse<ProductDTO>> deleteProduct(@RequestParam(name = "targetProductId") int targetProductId) {
		ProductDTO objDeletedProduct = objMenuService.deleteProduct(targetProductId);
		
		ApiResponse<ProductDTO> response = ApiResponse.success("Product Deleted successfully", objDeletedProduct);
		
		return new ResponseEntity<>(response,HttpStatus.OK);
	}
	
	@GetMapping("/getproduct")
	public ResponseEntity<ApiResponse<ProductDTO>> getProduct(@RequestParam(name = "targetProductName") String targetProductName) {
		ProductDTO objTargetProduct = objMenuService.viewProduct(targetProductName);
		
		ApiResponse<ProductDTO> response = ApiResponse.success("Product fetched successfully", objTargetProduct);
		
		return new ResponseEntity<>(response,HttpStatus.OK);
	}
	
	@PutMapping("/updateproduct")
	public ResponseEntity<ApiResponse<ProductDTO>> updateProduct(@RequestBody ProductDTO objProductDTO) {
		ProductDTO updatedProduct = objMenuService.updateProduct(objProductDTO);
		
		ApiResponse<ProductDTO> response = ApiResponse.success("Product updated successfully", updatedProduct);
		
		return new ResponseEntity<>(response,HttpStatus.CREATED);
	}
	
	
	
	
	
	
	//related to INGREDIENTS!
	@PostMapping("/addnewingredient")
	public ResponseEntity<ApiResponse<IngredientDTO>> addNewIngredient(@RequestBody IngredientDTO objNewIngredientDTO) {
		IngredientDTO savedIngredient = objMenuService.addNewIngredient(objNewIngredientDTO);
		
		ApiResponse<IngredientDTO> response = ApiResponse.success("Ingredient added successfully", savedIngredient);
		
		return new ResponseEntity<>(response,HttpStatus.CREATED);
	}
	
	@GetMapping("/viewallingredients")
	public ResponseEntity<ApiResponse<List<IngredientDTO>>> viewAllIngredients() {
		List<IngredientDTO> objIngredientsList = objMenuService.viewAllIngredients();
		
		ApiResponse<List<IngredientDTO>> response = ApiResponse.success("All Products are fetched and sent successfully", objIngredientsList);
		
		return new ResponseEntity<>(response,HttpStatus.OK);
	}
	
	@PatchMapping("/changeingredientavailabilitystatus")
	public ResponseEntity<ApiResponse<IngredientDTO>> changeIngredientAvailabilityStatus(@RequestParam(name = "targetIngredientId") int targetIngredientId,@RequestParam(name = "newAvailabilityStatus") int newAvailabilityStatus) {
		IngredientDTO objUpdatedIngredient = objMenuService.changeIngredientAvailabilityStatus(targetIngredientId, newAvailabilityStatus);
		
		ApiResponse<IngredientDTO> response = ApiResponse.success("Availability Status Updated successfully", objUpdatedIngredient);
		
		return new ResponseEntity<>(response,HttpStatus.OK);
	}
	
	@DeleteMapping("/deleteingredient")
	public ResponseEntity<ApiResponse<IngredientDTO>> deleteIngredient(@RequestParam(name = "targetIngredientId") int targetIngredientId) {
		IngredientDTO objDeletedIngredient = objMenuService.deleteIngredient(targetIngredientId);
		
		ApiResponse<IngredientDTO> response = ApiResponse.success("Ingredient Deleted successfully", objDeletedIngredient);
		
		return new ResponseEntity<>(response,HttpStatus.OK);
	}
	
	@GetMapping("/getingredient")
	public ResponseEntity<ApiResponse<IngredientDTO>> getIngredient(@RequestParam(name = "targetIngredientName") String targetIngredientName) {
	    IngredientDTO objTargetIngredient = objMenuService.viewIngredient(targetIngredientName);
	    
	    ApiResponse<IngredientDTO> response = ApiResponse.success("Ingredient fetched successfully", objTargetIngredient);
	    
	    return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@PutMapping("/updateingredient")
	public ResponseEntity<ApiResponse<IngredientDTO>> updateIngredient(@RequestBody IngredientDTO objIngredientDTO) {
	    IngredientDTO updatedIngredient = objMenuService.updateIngredient(objIngredientDTO);
	    
	    ApiResponse<IngredientDTO> response = ApiResponse.success("Ingredient updated successfully", updatedIngredient);
	    
	    return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
}
