import React, { useState, useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import Layout from "../../Layout/Layout";
import AdminMenu from "../../Layout/AdminMenu";
import { Select, Upload,Option } from 'antd'
import axios from "axios";
import toast from "react-hot-toast";

function UpdateProduct() {
    const navigate=useNavigate()
    const params=useParams()
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");

    //Create Product 
    const createProduct=async(e)=>{
        e.preventDefault()
        try{
            const productData=new FormData()
            productData.append("name",name);
            productData.append("description",description);
            productData.append("price",price);
            productData.append("quantity",quantity);
            productData.append("photo",photo);
            productData.append("shipping",shipping);
            productData.append("category",category);
            const {data}=await axios.post(`/api/v1/product/create-product`,productData)
            if(data?.success){
                toast.success("Product Created successsfully")
                navigate('/dashboard/admin/products')
            }
            else{
                toast.error(data?.massage)
            }

        }catch(error){
            console.log(error)
            toast.error("Somthing went wrong")

        }
    }

    //get single product
    const singleProduct=async()=>{
        try{
            const {data}=await axios.get(`/api/v1/product/get-product/${params.slug}`)
            const {data1}=await axios.get(`/api/v1/product/get-photo/${data.product._id}`)
            setName(data.product.name)
            setCategory(data.product.category)
            setPhoto(data1.photo.photo)
            setQuantity(data.product.quantity)
            setPrice(data.product.price)
            setDescription(data.product.description)
            setShipping(data.product.shipping)
        


        }catch(error){
            console.log(error)

        }

    }
    //get all category
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("/api/v1/category/getAll-category");
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something wwent wrong in getting catgeory");
        }
    };
    useEffect(() => {
        getAllCategory()
        singleProduct()
    }, [])

   
  return (
    <Layout title={"Dashboard - Create Product"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Update Product</h1>
                        <div className="m-1 w-75">
                            <Select bordered={false} placeholder="slecet a category"
                         
                                showSearch className="form-select mb-3" onChange={(value) => {setCategory(value) }}>
                                {categories?.map(c => (
                                    <option key={c._id} value={c._id}>{c.name}</option>
                                ))}

                            </Select>
                            <div className="mb-3">
                                <label className="btn btn-secondary col-md-12">
                                    {photo ? photo.name : "Upload Image"}
                                    <input type="file" name="photo" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} hidden></input>
                                </label>
                            </div>
                            <div className="mb-3">
                                {photo && (
                                    <div className="text-center">
                                        <img src={URL.createObjectURL(photo)} alt="producr-photo" height={"200px"} className="img img-responsive" />
                                    </div>

                                )
                                }

                            </div>
                            <div className="mb-3">
                                <input type="text" value={name} placeholder="Product Name" className="form-control" 
                                onChange={(e)=>setName(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <textarea type="text" value={description} placeholder="Product Descriptin" className="form-control" 
                                onChange={(e)=>setDescription(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <input type="Number" value={price} placeholder="Product Price" className="form-control" 
                                onChange={(e)=>setPrice(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <input type="Number" value={quantity} placeholder="Quantity" className="form-control" 
                                onChange={(e)=>setQuantity(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <Select 
                                bordered={false}
                                placeholder="select Shipping"
                                size="large"
                                value={shipping}
                             //   showSearch
                                className="form-select mb-3"
                                onChange={(value)=>setShipping(value)}
                                >
                                    <option value='0'>No</option>
                                    <option value='1'>Yes</option>
                                </Select>

                            </div>
                            <div className="mb-3">
                                <button onClick={createProduct} className="btn btn-primary">Update Product</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
  )
}

export default UpdateProduct
