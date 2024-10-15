const getProducts = async () => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    const { data } = await axios.get(`https://dummyjson.com/products/category/${category}`);
    return data;

};
const displayProducts = async () => {
    const loader = document.querySelector('.loader-container')
    loader.classList.add('active');
    try {
        const data = await getProducts();
        const result = data.products.map((product) => {
            return `
        <div class="product">
            <img src='${product.thumbnail}' alt="${product.description}">
            <h3>${product.title}</h3>
           <span class="price">${product.price}</span>
        </div>
        `;
        }).join(' ');
        document.querySelector(".products .row").innerHTML = result;
    }
    catch (error) {
        document.querySelector(".categories .row").innerHTML = `<p>Loading...</p>`;
    }
    {
        loader.classList.remove('active');
    }
};
displayProducts();
