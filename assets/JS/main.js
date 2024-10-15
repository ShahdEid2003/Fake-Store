const getCategory = async () => {

    const { data } = await axios.get('https://dummyjson.com/products/category-list');
    return data;

};
const displayCategory = async () => {
    const loader = document.querySelector('.loader-container')
    loader.classList.add('active');
    try {
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
    }
    catch (error) {
        document.querySelector(".categories .row").innerHTML = `<p>Loading...</p>`;
    }
    {
        loader.classList.remove('active');
    }

};
displayCategory();

window.onscroll = function () {
    const categories = document.querySelector('.categories');
    const nav = document.querySelector('.header');
    if (window.scrollY > categories.offsetTop) {
        nav.classList.add('scroll-nav');
    }
    else {
        nav.classList.remove('scroll-nav');
    }

}


