package com.healthycraftybites.menumanagementservice.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthycraftybites.menumanagementservice.dto.IngredientDTO;
import com.healthycraftybites.menumanagementservice.dto.ProductDTO;
import com.healthycraftybites.menumanagementservice.entity.Ingredient;
import com.healthycraftybites.menumanagementservice.entity.Product;
import com.healthycraftybites.menumanagementservice.exception.DuplicateItemException;
import com.healthycraftybites.menumanagementservice.exception.InvalidInputException;
import com.healthycraftybites.menumanagementservice.exception.ItemNotFoundException;
import com.healthycraftybites.menumanagementservice.repository.MenuIngredientRepository;
import com.healthycraftybites.menumanagementservice.repository.MenuProductRepository;

import jakarta.transaction.Transactional;

@Service
public class MenuServiceImpl implements MenuService {

	@Autowired
	MenuProductRepository objMenuProductRepository;
	@Autowired
	MenuIngredientRepository objMenuIngredientRepository;
	
	@Override
	public ProductDTO addNewProduct(ProductDTO objNewProductDTO) {
		
		boolean productExists = objMenuProductRepository.existsByName(objNewProductDTO.getName());
		if(productExists) {
			throw new DuplicateItemException(objNewProductDTO.getName()+" already added in Database!");
		}
		
		
		Product objProductToStore = new Product();
		BeanUtils.copyProperties(objNewProductDTO, objProductToStore);
		
		Product objsavedProduct = objMenuProductRepository.save(objProductToStore);
		
		ProductDTO responseProductDTO = new ProductDTO();
		BeanUtils.copyProperties(objsavedProduct, responseProductDTO);
		
		return responseProductDTO;
	}
	
	@Override
	public List<ProductDTO> viewAllProducts() {
		Iterator<Product> objProductList = objMenuProductRepository.findAll().iterator();
		
		List<ProductDTO> responseProductDTOList = new ArrayList<>();
		while(objProductList.hasNext()) {
			Product objProduct = objProductList.next();
			
			ProductDTO objProductDTO = new ProductDTO();
			BeanUtils.copyProperties(objProduct, objProductDTO);
			responseProductDTOList.add(objProductDTO);
		}
		
		return responseProductDTOList;
	}
	
	@Override
	public ProductDTO changeProductAvailabilityStatus(int targetProductId, int newAvailabilityStatus) {
		if(newAvailabilityStatus!=0 && newAvailabilityStatus!=1) {
			throw new InvalidInputException(newAvailabilityStatus+" is not a valid Availability Status!");
		}
		
		Optional<Product> objTargetProduct = objMenuProductRepository.findById(targetProductId);
		Product objProductToUpdate = new Product();
		if(objTargetProduct.isPresent()) {
			BeanUtils.copyProperties(objTargetProduct.get(), objProductToUpdate);
		}
		else {
			throw new ItemNotFoundException("Product with Product Id: "+targetProductId+" not found in database!");
		}
		
		objProductToUpdate.setAvailabilityStatus(newAvailabilityStatus);
		Product objUpdatedProduct = objMenuProductRepository.save(objProductToUpdate);
		
		ProductDTO objUpdatedProductDTO = new ProductDTO();
		BeanUtils.copyProperties(objUpdatedProduct, objUpdatedProductDTO);
		
		return objUpdatedProductDTO;
	}
	
	
	
	
	
	
	
	

	@Override
	public IngredientDTO addNewIngredient(IngredientDTO objNewIngredientDTO) {
		boolean ingredientExists = objMenuIngredientRepository.existsByName(objNewIngredientDTO.getName());
		if(ingredientExists) {
			throw new DuplicateItemException(objNewIngredientDTO.getName()+" already added in Database!");
		}
		
		
		Ingredient objIngredientToStore = new Ingredient();
		BeanUtils.copyProperties(objNewIngredientDTO, objIngredientToStore);
		
		Ingredient objsavedIngredient = objMenuIngredientRepository.save(objIngredientToStore);
		
		IngredientDTO responseIngredientDTO = new IngredientDTO();
		BeanUtils.copyProperties(objsavedIngredient, responseIngredientDTO);
		
		return responseIngredientDTO;
	}

	@Override
	public List<IngredientDTO> viewAllIngredients() {
		Iterator<Ingredient> objIngredientList = objMenuIngredientRepository.findAll().iterator();
		
		List<IngredientDTO> responseIngredientDTOList = new ArrayList<>();
		while(objIngredientList.hasNext()) {
			Ingredient objIngredient = objIngredientList.next();
			
			IngredientDTO objIngredientDTO = new IngredientDTO();
			BeanUtils.copyProperties(objIngredient, objIngredientDTO);
			responseIngredientDTOList.add(objIngredientDTO);
		}
		
		return responseIngredientDTOList;
	}
	
	@Override
	public IngredientDTO changeIngredientAvailabilityStatus(int targetIngredientId, int newAvailabilityStatus) {
		if(newAvailabilityStatus!=0 && newAvailabilityStatus!=1) {
			throw new InvalidInputException(newAvailabilityStatus+" is not a valid Availability Status!");
		}
		
		Optional<Ingredient> objTargetIngredient = objMenuIngredientRepository.findById(targetIngredientId);
		Ingredient objIngredientToUpdate = new Ingredient();
		if(objTargetIngredient.isPresent()) {
			BeanUtils.copyProperties(objTargetIngredient.get(), objIngredientToUpdate);
		}
		else {
			throw new ItemNotFoundException("Ingredient with Ingredient Id: "+targetIngredientId+" not found in database!");
		}
		
		objIngredientToUpdate.setAvailabilityStatus(newAvailabilityStatus);
		Ingredient objUpdatedIngredient = objMenuIngredientRepository.save(objIngredientToUpdate);
		
		IngredientDTO objUpdatedIngredientDTO = new IngredientDTO();
		BeanUtils.copyProperties(objUpdatedIngredient, objUpdatedIngredientDTO);
		
		return objUpdatedIngredientDTO;
	}

	@Transactional
	@Override
	public ProductDTO deleteProduct(int targetProductId) {
		Optional<Product> objTargetProduct = objMenuProductRepository.findById(targetProductId);
		ProductDTO objDeletedProduct = new ProductDTO();
		if(objTargetProduct.isPresent()) {
			BeanUtils.copyProperties(objTargetProduct.get(),objDeletedProduct);
			objMenuProductRepository.delete(objTargetProduct.get());
		}
		else {
			throw new ItemNotFoundException("Product with Product Id: "+targetProductId+" not found in database!");
		}
		
		return objDeletedProduct;
	}
	
	

}
