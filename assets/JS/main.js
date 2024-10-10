const getCategory = async () => {

    const { data } = await axios.get('https://dummyjson.com/products/category-list');
    return data;

};
const displayCategory = async () => {
    const Categories = await getCategory();
    const result = Categories.map((category) => {
        return `
        <div class="category">
            <h2>${category}</h2>
            <a href="categoryDetails.html?category=${category}">Details</a>
        </div>
        `;
    }).join('');
    document.querySelector(".categories .row").innerHTML = result;
};
displayCategory();

