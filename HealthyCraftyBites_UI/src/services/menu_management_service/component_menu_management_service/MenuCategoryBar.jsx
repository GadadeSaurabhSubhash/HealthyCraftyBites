import "../css_menu_management_service/MenuCategoryBarCSS.css";

function MenuCategoryBar({ dataCategorySelected, setDataCategorySelected }) {
    return (
        <div className="menuCategoryBar d-flex justify-content-center py-3">
            <div
                className={dataCategorySelected === "Salad" ? "active" : ""}
                onClick={() => setDataCategorySelected("Salad")}
            >
                Salads
            </div>

            <div>|</div>

            <div
                className={dataCategorySelected === "Sandwich" ? "active" : ""}
                onClick={() => setDataCategorySelected("Sandwich")}
            >
                Sandwiches
            </div>

            <div>|</div>

            <div
                className={dataCategorySelected === "Roll" ? "active" : ""}
                onClick={() => setDataCategorySelected("Roll")}
            >
                Rolls
            </div>

            <div>|</div>

            <div
                className={dataCategorySelected === "Beverage" ? "active" : ""}
                onClick={() => setDataCategorySelected("Beverage")}
            >
                Beverages
            </div>
        </div>
    );
}

export default MenuCategoryBar;