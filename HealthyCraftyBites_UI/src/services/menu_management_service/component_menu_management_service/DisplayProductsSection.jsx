import MenuItemDisplayCard from "./MenuItemDisplayCard";

function DisplayProductSection({
    productData,
    dataCategorySelected,
    errorMessage
}) {

    const filteredProductData = productData.filter(
        (product) => product.category === dataCategorySelected
    );

    return (
        <div className="DisplayProductSection p-2">

            {errorMessage && (
                <div className="ErrorMessage p-2">
                    {errorMessage}
                </div>
            )}

            {filteredProductData.map((product) => (
                <MenuItemDisplayCard
                    key={product.productId}
                    currentProduct={product}
                />
            ))}

        </div>
    );
}

export default DisplayProductSection;