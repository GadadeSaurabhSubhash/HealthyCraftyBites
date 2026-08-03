package com.healthycraftybites.menumanagementservice.service;

import java.util.List;

import com.healthycraftybites.menumanagementservice.dto.IngredientDTO;
import com.healthycraftybites.menumanagementservice.dto.ProductDTO;

public interface MenuService {
	public ProductDTO addNewProduct(ProductDTO objNewProductDTO);
	public IngredientDTO addNewIngredient(IngredientDTO objNewIngredientDTO);
	public List<ProductDTO> viewAllProducts();
	public List<IngredientDTO> viewAllIngredients();
	public ProductDTO changeProductAvailabilityStatus(int targetProductId, int newAvailabilityStatus);
	public IngredientDTO changeIngredientAvailabilityStatus(int targetIngredientId, int newAvailabilityStatus);
	public ProductDTO deleteProduct(int targetProductId);
	public IngredientDTO deleteIngredient(int targetIngredientId);
	public ProductDTO viewProduct(String targetProductName);
	public ProductDTO updateProduct(ProductDTO objProductDTO);
	public IngredientDTO viewIngredient(String targetIngredientName);
	public IngredientDTO updateIngredient(IngredientDTO objIngredientDTO);
}
