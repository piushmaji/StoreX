// filterConfig.js
export const filterConfig = [
    {
        type: "category",
        title: "Category",
        inputType: "list",
        options: [
            "Mobile accessory",
            "Electronics",
            "Smartphones",
            "Modern tech"
        ]
    },
    {
        type: "brand",
        title: "Brands",
        inputType: "checkbox",
        options: ["Samsung", "Apple", "Huawei", "Oppo", "OnePlus"]
    },
    {
        type: "feature",
        title: "Features",
        inputType: "checkbox",
        options: ["Metallic", "Plastic cover", "8GB Ram", "Super power"]
    },
    {
        type: "condition",
        title: "Condition",
        inputType: "radio",
        options: ["Any", "Refurbished", "Brand new", "Old items"]
    },
    {
        type: "rating",
        title: "Rating",
        inputType: "rating",
        options: [4, 3, 2, 1]
    }
]
