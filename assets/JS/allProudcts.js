const getProducts = async (page) => {
    const skip = (parseInt(page) - 1) * 20;
    const { data } = await axios.get(`https://dummyjson.com/products?limit=20&skip=${skip}`);
    return data;

};


const displayProducts = async (page = 1) => {

    const loader = document.querySelector('.loader-container')
    loader.classList.add('active');

    try {
        const data = await getProducts(page);
        const numberOfPages = Math.ceil(data.total / 20);

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

        let pagenationLinks = ``;
        if (page == 1) {
            pagenationLinks = `<li class="page-item"><button class="page-link" disabled>&laquo;</button></li>`;

        }

        else {
            pagenationLinks = `<li class="page-item"><button onclick=displayProducts('${parseInt(page) - 1}') class="page-link">&laquo;</button></li>`;
        }


        for (let i = 1; i <= numberOfPages; i++) {
            pagenationLinks += `<li class="page-item ${i == page?'active':''}"><button onclick=displayProducts('${i}') class="page-link">${i}</button></li>`;
        }

        if (page == numberOfPages) {
            pagenationLinks += `<li class="page-item"><button class="page-link" disabled>&raquo;</button></li>`;
        }
        else {
            pagenationLinks += `<li class="page-item"><button onclick=displayProducts('${parseInt(page) + 1}') class="page-link">&raquo;</button></li>`;
        }

        document.querySelector(".pagination").innerHTML = pagenationLinks;

    }
    catch (error) {
        document.querySelector(".categories .row").innerHTML = `<p>Loading...</p>`;
    }
    {
        loader.classList.remove('active');
    }

};
displayProducts();
