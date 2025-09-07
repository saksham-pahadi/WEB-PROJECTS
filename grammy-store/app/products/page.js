"use client"
import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';


export default function product() {

    const [product, setProduct] = useState({})
    const [productImages, setProductImages] = useState([])
    const [productTags, setProductTags] = useState([])
    const [productMeta, setProductMeta] = useState({})
    const [index, setIndex] = useState(0);
    const [count, setcount] = useState(1);
    const [QrCode, setQrCode] = useState("")
    const [BarCode, setBarCode] = useState("")
    const [CreatedAt, setCreatedAt] = useState("")
    const [UpdatedAt, setUpdatedAt] = useState("")
    const [Dimentions, setDimentions] = useState({width:"",height:"",depth:""})
    const [Dimention, setDimention] = useState([])

    const [productList, setproductList] = useState([])

    let skeleton = [1]





    const searchParams = useSearchParams()
    const id = searchParams.get("id")
    console.log("id", id) // ✅ get product id








    const getproduct = async () => {

        const requestOptions = {
            method: "GET",
        };

        await fetch(`http://localhost:3000/api/getproducts`, requestOptions)
            .then((response) => response.json())
            .then((result) => {

                setproductList(result.products);
                console.log(productList)


            })
            .catch((error) => console.error(error));




    }




    useEffect(() => {
        async function fetchProduct() {
            await getproduct();
        }
        fetchProduct();

    }, [])


    useEffect(() => {
        setProduct(productList.filter((item) => item.id == id)[0])
        console.log("filter", productList.filter((item) => item.id == id)[0])


    }, [productList])
    useEffect(() => {

        console.log("product", product)
        if (product) {

            setProductImages(product.images)
            setProductTags(product.tags)
            setProductMeta(product.meta)
            setDimention(product.dimensions)
            console.log("product.meta",product.meta)
        }


    }, [product])

    useEffect(() => {

        console.log("proDuctMeta", productMeta)
        if (productMeta) {

            setBarCode(productMeta.barcode)
            setQrCode(productMeta.qrCode)
            setCreatedAt(productMeta.createdAt)
            setUpdatedAt(productMeta.updatedAt)
        }


    }, [productMeta])

    useEffect(() => {

        console.log("proDuctMeta", productMeta)
        if (productMeta) {

            setDimentions({width:Dimention.width ,height:Dimention.height,depth:Dimention.depth})
        }


    }, [Dimention])
    useEffect(() => {

        console.log("productImages", productImages)
        console.log("productTags", productTags)
        console.log("productMeta", productMeta)



    }, [productImages])



    function handleClick(event) {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
    }


    const prevSlide = () => {
        setIndex((prev) => (prev === 0 ? productImages.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setIndex((prev) => (prev === productImages.length - 1 ? 0 : prev + 1));
    };

    return (<div className='h-fit'>
        {product && <div className=''>

            <div className='flex gap-2 p-2 bg-white w-full'>
                <Link className=' no-underline text-black' href="/"><img src="backArrow.svg" alt="" /></Link>
                <p className='flex items-center'>{product.category} <img src="right.svg" alt="" /> {product.title} </p>

            </div>


            <div className='w-full h-fit flex flex-col md:flex-row bg-blue-200'>




                <div className='image h-fit w-full md:w-1/2 lg:w-1/3 bg-green-200'>
                    {productImages == undefined && <img className='' src={product.thumbnail} alt="" />}
                    {productImages != undefined && <div className=" w-full px-5  shadow-lg">
                        {/* Images */}
                        <div className='flex '>


                            <button
                                onClick={prevSlide}
                                className="cursor-pointer"
                            >
                                <ChevronLeft className="text-white" />
                            </button>
                            <div className="flex">
                                <AnimatePresence>
                                    <motion.img
                                        key={productImages[index]}
                                        src={productImages[index]}
                                        alt="carousel"
                                        className=""
                                        initial={{ opacity: 0, x: 100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        transition={{ duration: 0 }}
                                    />
                                </AnimatePresence>
                            </div>

                            {/* Controls */}

                            <button
                                onClick={nextSlide}
                                className="cursor-pointer"
                            >
                                <ChevronRight className="text-white" />
                            </button>
                        </div>



                        {/* Dots */}
                        <div className="flex justify-center p-5 gap-2 w-full">
                            {productImages.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setIndex(i)}
                                    className={`w-3 h-3  rounded-full ${i === index ? "bg-white" : "bg-white/50"
                                        } cursor-pointer`}
                                />
                            ))}
                        </div>
                    </div>}


                </div>




                <div className="details  h-fit w-full md:w-1/2 lg:w-2/3 ">
                    <h2 className='font-bold text-2xl m-3'>{product.title}</h2>
                    <div className="rating flex gap-1 mx-3">
                        <Stack spacing={1}>
                            <Rating size="small" name="half-rating-read" value={product.rating} precision={0.5} readOnly />
                        </Stack>
                        <p className="text-sm">{Math.floor(product.rating * 10) / 10}/
                            <span className="text-gray-500">
                                5.0
                            </span>
                        </p>
                    </div>
                    <p className="font-bold m-3">₹{Math.floor(product.price * 10)}/-</p>
                    <div className="h-[1px] w-9/10 mx-auto mt-4 bg-gray-600 "></div>
                    <p className='mt-3 mx-3'>{product.description}</p>
                    <div className='flex items-center justify-between p-5 '>
                        <div className='flex gap-5'>


                            <div className='flex w-20 h-10 justify-center items-center rounded-lg bg-red-500'>
                                <button className='px-3 py-2 rounded-l-lg bg-gray-200 cursor-pointer' type='button' onClick={() => { setcount(count - 1) }} >-</button>
                                <p className='px-3 py-2  bg-white'>
                                    {count}
                                </p>
                                <button className=' px-3 py-2 rounded-r-lg bg-gray-200 cursor-pointer' type='button' onClick={() => { setcount(count + 1) }} >+</button>
                            </div>
                            <button className='bg-yellow-500 font-semibold h-10 p-3 rounded-lg flex items-center  cursor-pointer'>Add to Cart</button>
                        </div>
                        <div className='flex gap-3'>
                            <button className=' bg-green-500 text-white font-semibold h-10 p-3 rounded-lg flex items-center  cursor-pointer'>Buy now</button>
                            <button className='hover:bg-red-300 font-semibold h-10 w-10 p-2 rounded-full flex items-center  cursor-pointer'><img src="wishlist.svg" alt="" /></button>

                        </div>
                    </div>
                </div>


            </div>



        </div>}
        {product == undefined && <div className="product w-full flex flex-col md:flex-row gap-3 rounded-xl  ">

            <Box className="rounded-md  w-full md:w-1/2 lg:w-1/3 m-2 " sx={{ overflow: 'hidden' }}>
                <Skeleton className='rounded-lg' variant="rectangular" height={450} />





            </Box>
            <Box className="rounded-md  w-full md:w-1/2 lg:w-2/3  m-2 flex flex-col gap-3 " sx={{ overflow: 'hidden' }}>
                <Skeleton className='rounded-lg' variant="rectangular" height={40} />
                <Skeleton className='rounded-lg' variant="rectangular" height={40} />
                <Skeleton className='rounded-lg' variant="rectangular" height={40} />
                <Skeleton className='rounded-lg' variant="rectangular" height={100} />
                <Skeleton className='rounded-lg' variant="rectangular" height={40} />
                <Box className="rounded-md w-full flex gap-5 m-2 " sx={{ overflow: 'hidden' }}>
                    <Skeleton className='rounded-lg w-1/4' variant="rectangular" height={40} />
                    <Skeleton className='rounded-lg w-1/4' variant="rectangular" height={40} />
                    <Skeleton className='rounded-lg w-1/4' variant="rectangular" height={40} />
                    <Skeleton className='rounded-lg w-1/4' variant="rectangular" height={40} />





                </Box>





            </Box>


        </div>
        }

        {product && <div className=''>
            <div>
                <h1 className='font-bold text-2xl m-3 bg-gray-300 pl-3'>Description</h1>
                <h2 className='font-bold text-2xl m-3'>{product.title}</h2>
                 <p className='mt-3 mx-3'>{product.description}</p>
                 <div className='flex gap-5 pl-3 mt-3'>Tags:

                 
                 {productTags != undefined && productTags.map((item,index)=>{
                    return <p key={index} className='px-1 bg-gray-300 rounded-lg'>{item}</p>

                 })}
                 </div>

            </div>
            <div>
                <h1 className='font-bold text-2xl m-3 bg-gray-300 pl-3'>Additional Information</h1>
                <h2 className='font-semibold text-xl m-3'>Warranty - <span className='font-normal'>{product.warrantyInformation}</span></h2>
                <div className="h-[1px] w-full mx-auto mt-4 bg-gray-600 "></div>
                <h2 className='font-semibold text-xl m-3'>Shipping - <span className='font-normal'>{product.shippingInformation}</span></h2>
                <div className="h-[1px] w-full mx-auto mt-4 bg-gray-600 "></div>
                <h2 className='font-semibold text-xl m-3'>Availability - <span className='font-normal'>{product.availabilityStatus}</span></h2>
                <div className="h-[1px] w-full mx-auto mt-4 bg-gray-600 "></div>
                <h2 className='font-semibold text-xl m-3'>Return policy - <span className='font-normal'>{product.returnPolicy}</span></h2>
                <div className="h-[1px] w-full mx-auto mt-4 bg-gray-600 "></div>
                <h2 className='font-semibold text-xl m-3'>Minimum order - <span className='font-normal'>{product.minimumOrderQuantity}</span></h2>
                <div className="h-[1px] w-full mx-auto mt-4 bg-gray-600 "></div>
                <h2 className='font-semibold text-xl m-3'>Weight - <span className='font-normal'>{product.weight}</span></h2>
                <div className="h-[1px] w-full mx-auto mt-4 bg-gray-600 "></div>
                <h2 className='font-semibold text-xl m-3'>Dimentions - <span className='font-normal'>Width:{Dimentions.width}, Height:{Dimentions.height}, Depth:{Dimentions.depth}</span></h2>
                <div className="h-[1px] w-full mx-auto mt-4 bg-gray-600 "></div>
                <h2 className='font-semibold text-xl m-3'>QR code -</h2>
                {QrCode && <img className='h-30 ml-3' src={`${QrCode}`} alt="" />}
                <div className="h-[1px] w-full mx-auto mt-4 bg-gray-600 "></div>
                
                

            </div>

        </div>}


    </div>
    )
};
