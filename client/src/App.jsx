// Import router components
import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "./components/layout/PrivateRoutes";

// Import layout
import Layout from "./components/layout/Layout";

// Import pages
import Home from "./pages/Home";
import Dashboard from "./pages/auth/Dashboard";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ProductsPage from "./pages/products/ProductsPage";
import ProductDetailPage from "./pages/products/ProductDetailPage";
import AddProductPage from "./pages/products/AddProductPage";
import NotFound from "./pages/NotFound";
import EditProductPage from "./pages/products/EditProductPage";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />

			<Route element={<Layout />}>
				{/* Auth */}
				<Route path="login" element={<Login />} />
				<Route path="signup" element={<Signup />} />
				{/* Private Auth Routes */}
				<Route element={<PrivateRoutes />}>
					<Route path="dashboard" element={<Dashboard />} />
				</Route>
				{/* Products: /store/... */}
				<Route path="store">
					{/* /store/products/... */}
					<Route path="products" element={<ProductsPage />} />
					{/* /store/product/... */}
					<Route path="product">
						{/* /store/products/$id */}
						<Route path=":id" element={<ProductDetailPage />} />
						<Route element={<PrivateRoutes />}>
							{/* /store/products/add */}
							<Route path="add" element={<AddProductPage />} />
							{/* /store/products/edit/$id */}
							<Route
								path="edit/:id"
								element={<EditProductPage />}
							/>
						</Route>
					</Route>
				</Route>
				<Route path="*" element={<NotFound />} />
			</Route>
		</Routes>
	);
}

export default App;
