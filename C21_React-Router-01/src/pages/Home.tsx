import {Link, useNavigate} from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();

    const handleNavigate = ()=>{
        navigate('/products');
    }
    return (
        <>
            <h1>Home</h1>
            <Link to="/products">Go to products</Link>
            <p>
                <button onClick={handleNavigate}>Navigate to view product</button>
            </p>
        </>
    )
}

export default HomePage;