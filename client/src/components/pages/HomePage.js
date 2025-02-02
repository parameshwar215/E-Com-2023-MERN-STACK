import React, { useEffect,useState } from 'react'
import Layout from '../Layout/Layout'
import { useAuth } from '../../context/auth'
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Spinner from "../Spinner";
function HomePage() {
  const [auth,setAuth]=useAuth()
  const [products, setProducts] = useState([]);

  // Fetch All Products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-products");
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting products");
    }
  };

  // Fetch products on component mount
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
        </div>
        <div className="col-md-9">
          <h1 className="text-center">Product Details</h1>
          <div className="d-flex flex-wrap">
            {products.length > 0 ? (
              products.map((p) => (
                <Link
                  key={p._id}
                  to={`/dashboard/admin/update-product/${p?.slug}`}
                  className="product-link"
                >
                  <div className="card m-2" style={{ width: "18rem", height: "22rem" }}>
                    <img
                      src={`/api/v1/product/product-photo/${p?._id}`}
                      style={{ height: "14rem" }}
                      className="card-img-top"
                      alt={p?.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p?.name}</h5>
                      <h5 className="card-title">Rs. {p?.price}/-</h5>
                      <p className="card-text">{p?.description}</p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div>
                 <Spinner/>
                <p className="text-center">Loading products...</p>
              </div>
              
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default HomePage
