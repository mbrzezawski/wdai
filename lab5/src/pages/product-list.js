import React, { useEffect, useState } from 'react';
import Product from './product';
import '../style.css';
import productsData from './products.json';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [originalProducts, setOriginalProducts] = useState([]);
    const [sort, setSort] = useState('none');
    const [search, setSearch] = useState('');

    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(products));
    }, [products]);

    useEffect(() => {
        const savedProducts = localStorage.getItem('products');
        if (savedProducts) {
            setProducts(JSON.parse(savedProducts));
        } else {
            setProducts(productsData.products);
        }
        setOriginalProducts(productsData.products);
    }, []);

    useEffect(() => {
        let sortedProducts = [...products];
        if (sort === 'asc') {
            sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sort === 'desc') {
            sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
        } else {
            sortedProducts = [...originalProducts];
        }

        const filteredProducts = sortedProducts.filter((product) =>
            product.title.toLowerCase().includes(search.toLowerCase())
        );

        setProducts(filteredProducts);
    }, [sort, search, originalProducts]);

    const handleProductEdit = (editedProduct) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === editedProduct.id ? editedProduct : product
            )
        );
    };

    return (
        <div>
            <nav>
                <h1>LISTA PRODUKTÓW</h1>
            </nav>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="none">Bez sortowania</option>
                <option value="asc">Sortuj alfabetycznie rosnąco</option>
                <option value="desc">Sortuj alfabetycznie malejąco</option>
            </select>
            <input
                type="search"
                placeholder="szukaj"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className="product-list">
                {products.map((product) => (
                    <Product key={product.id} product={product} onEdit={handleProductEdit} />
                ))}
            </div>
        </div>
    );
}

export default ProductList;
