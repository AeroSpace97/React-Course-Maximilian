import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Home from './pages/Home';
import ProductPage from './pages/Products';
import RootLayout from "./layouts/RootLayout.tsx";
import ErrorPage from "./pages/Error.tsx";
import ProductDetailPage from "./pages/ProductDetail.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        errorElement: <ErrorPage />,
        children: [
            {path: '/', element: <Home/>},
            {path: '/products', element: <ProductPage/>},
            {path: '/products/:productId', element: <ProductDetailPage/>},
        ]
    }
]);

function App() {
    return <RouterProvider router={router}/>
}

export default App
