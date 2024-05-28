import {Link} from "react-router-dom";

const PRODUCTS = [
    { id: 'product-1' , title: 'product 1'},
    { id: 'product-2' , title: 'product 2'},
    { id: 'product-3' , title: 'product 3'}
]

const ProductPage = () => {
    return (
        <>
            <h1>Products</h1>
            <ul>
                {PRODUCTS.map(product => (
                    <li key={product.id}>
                        <Link to={`/products/${product.id}`}>{product.title}</Link>
                    </li>
                ))}
            </ul>
            <Link to="/">Go to home</Link>
        </>
    )
}

export default ProductPage;