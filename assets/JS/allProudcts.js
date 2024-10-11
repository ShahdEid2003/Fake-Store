const getProducts= async () => {


    const{data}= await axios.get('https://dummyjson.com/products');
    return data;
    
}; 
const displayProducts = async () => {
    const data= await getProducts();
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
   
};
displayProducts();