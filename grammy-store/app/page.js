"use client";
import Image from "next/image";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { redirect } from "next/navigation";
import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { useRouter } from "next/navigation";
import Link from "next/link";



export default function Home() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [productList, setproductList] = useState([])
  const [todayDeals, settodayDeals] = useState([])
  const [todayOffer, settodayOffer] = useState([])
  let skeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]



  const images = [
    "image1.jpg",
    "image2.jpg",
    "image3.jpg",
    "image4.jpg",
    "image5.jpg",
    "image6.jpg"

  ];


 const viewProduct = (id) => {
    router.push(`${process.env.NEXT_PUBLIC_URL}/products?id=${id}`);

  }

  const getproduct = async () => {


    const requestOptions = {
      method: "GET",
    };

    await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getproducts`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        
        setproductList(result.products)

      })
      .catch((error) => console.error(error));




  }



  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000); // 4 seconds




    async function fetchProduct() {
      await getproduct();
    }
    fetchProduct();



    return () => clearInterval(interval);

  }, []);


  useEffect(() => {
    settodayDeals(productList.filter((item) => item.rating > 4).slice(0, 20))
    settodayOffer(productList.filter((item) => item.discountPercentage > 15).slice(0, 20))


  }, [productList])








  return (
    <main>






      <div className="relative w-full overflow-hidden  shadow-lg">
        {/* Images */}
        <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] w-full">
          <AnimatePresence>
            <motion.img
              key={images[index]}
              src={images[index]}
              alt="carousel"
              className="absolute w-full h-full object-cover"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.6 }}
            />
          </AnimatePresence>
        </div>

        {/* Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 p-3 rounded-full hover:bg-black/70"
        >
          <ChevronLeft className="text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 p-3 rounded-full hover:bg-black/70"
        >
          <ChevronRight className="text-white" />
        </button>



        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full ${i === index ? "bg-white" : "bg-white/50"
                }`}
            />
          ))}
        </div>
      </div>






      <div className="flex items-center md:justify-center m-10 gap-5 overflow-x-scroll no-scrollbar">

        <div className="flex flex-col items-center">
          <div className="w-20 h-20 sm:w-30 sm:h-30 rounded-full bg-cover bg-center hover:shadow-[3px_3px_10px_rgba(0,0,0,0.2)] duration-200">
            <img className="rounded-full" src="fashion.jpeg" alt="" />
          </div>
          <p>Fashion</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 sm:w-30 sm:h-30 rounded-full bg-cover bg-center hover:shadow-[3px_3px_10px_rgba(0,0,0,0.2)] duration-200">
            <img className="rounded-full" src="accessories.jpg" alt="" />

          </div>
          <p>Accessories</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 sm:w-30 sm:h-30 rounded-full bg-cover bg-center hover:shadow-[3px_3px_10px_rgba(0,0,0,0.2)] duration-200">
            <img className="rounded-full" src="Electronics.jpeg" alt="" />
          </div>
          <p>Electronic</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 sm:w-30 sm:h-30 rounded-full bg-cover bg-center hover:shadow-[3px_3px_10px_rgba(0,0,0,0.2)] duration-200">
            <img className="rounded-full" src="life-style.jpeg" alt="" />
          </div>
          <p>Life Style</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 sm:w-30 sm:h-30 rounded-full bg-cover bg-center hover:shadow-[3px_3px_10px_rgba(0,0,0,0.2)] duration-200">
            <img className="rounded-full" src="home.jpeg" alt="" />
          </div>
          <p>Home</p>
        </div>



      </div>






      <h3 className="font-semibold mx-10 text-xl">Deals of the Day</h3>
      <div className="h-[1px] w-9/10 mx-10 mt-4 bg-gray-300"></div>



      <div className="today-deals mx-10 flex gap-3 py-3 mt-5 overflow-x-scroll no-scrollbar">

        {todayDeals.length > 0 && todayDeals.map((item) => {
          return <div onClick={()=>{
            viewProduct(item.id)
          }} key={item.id} className="product h-fit bg-gray-300 p-3 rounded-xl cursor-pointer hover:shadow-[3px_3px_10px_rgba(0,0,0,0.2)] transition-all duration-200 ">
            <div className={`product-image h-50 w-50 rounded-xl bg-cover bg-center`} style={{ backgroundImage: `url(${item.thumbnail})` }}>
              {/* <img src={item.thumbnail} alt="" /> */}

            </div>
            <p className="text-sm text-gray-500 mt-2">{item.category}</p>
            <h5 className="font-bold text-wrap w-50">{item.title}</h5>

            <div className="rating flex gap-1">
              <Stack spacing={1}>
                <Rating size="small" name="half-rating-read" value={item.rating} precision={0.5} readOnly />
              </Stack>
              <p className="text-sm">{Math.floor(item.rating * 10) / 10}/
                <span className="text-gray-500">
                  5.0
                </span>
              </p>
            </div>
            <p className="font-bold">₹{Math.floor(item.price * 10)}/-</p>

            <div className="mt-2 mx-1 flex items-center justify-between">

              <button className="w-1/2 text-sm bg-emerald-200 border border-emerald-200 hover:border-emerald-500 p-2 rounded-xl " type="button" >Add to cart</button>
              <button title="Wishlist" type="buttom"><img className='hover:bg-emerald-200 p-2 rounded-full' src="wishlist.svg" alt="" /></button>
            </div>
          </div>
        })}

        {todayDeals.length == 0 && skeleton.map((item) => {

          return <div key={item} className="product flex gap-4  p-3 rounded-xl cursor-pointer ">

            <Box className="flex flex-col gap-2" sx={{ overflow: 'hidden' }}>
              <Skeleton className="rounded-md" variant="rectangular" width={200} height={210} />
              <Skeleton className="rounded-sm" variant="rectangular" width={200} height={20} />
              <Skeleton className="rounded-sm" variant="rectangular" width={200} height={20} />
              <Skeleton className="rounded-sm" variant="rectangular" width={200} height={20} />
              <Skeleton className="rounded-sm" variant="rectangular" width={100} height={20} />
              <Skeleton className="rounded-md" variant="rectangular" width={200} height={25} />

            </Box>

          </div>



        })}

      </div>




      <div className="m-10  flex sm:flex-row gap-2 overflow-x-scroll no-scrollbar">
        <img className="w-1/2 rounded-xl sm:w-1/3" src="image9.jpg" alt="" />
        <img className="w-1/2 rounded-xl sm:w-1/3" src="image7.jpg" alt="" />
        <img className="w-1/2 rounded-xl sm:w-1/3" src="image10.jpg" alt="" />
        <img className="w-1/2 rounded-xl sm:w-1/3" src="image8.jpg" alt="" />

      </div>


      <h3 className="font-semibold mx-10 text-xl">Today's Offers</h3>
      <div className="h-[1px] w-9/10 mx-10 mt-4 bg-gray-300"></div>




      <div className="today-deals mx-10 flex gap-3 py-3 mt-5 overflow-x-scroll no-scrollbar">

        {todayOffer.length > 0 && todayOffer.map((item) => {
          return <div onClick={()=>{
            viewProduct(item.id)
          }} key={item.id} className="product h-fit bg-gray-300 p-3 rounded-xl cursor-pointer hover:shadow-[3px_3px_10px_rgba(0,0,0,0.2)] transition-all duration-200 ">
            <div className={`product-image h-50 w-50 rounded-xl bg-cover bg-center`} style={{ backgroundImage: `url(${item.thumbnail})` }}>
              {/* <img src={item.thumbnail} alt="" /> */}

            </div>
            <p className="text-sm text-gray-500 mt-2">{item.category}</p>
            <h5 className="font-bold text-wrap w-50">{item.title}</h5>


            <div className="rating flex gap-1">
              <Stack spacing={1}>
                <Rating size="small" name="half-rating-read" value={item.rating} precision={0.5} readOnly />
              </Stack>
              <p className="text-sm">{Math.floor(item.rating * 10) / 10}/
                <span className="text-gray-500">
                  5.0
                </span>
              </p>


            </div>
            <p className="font-bold">₹{Math.floor(item.price * 10)}/- <span className="font-normal text-sm text-gray-500">{Math.floor(item.discountPercentage)}% OFF</span></p>

            <div className="mt-2 mx-1 flex items-center justify-between">

              <button className="w-1/2 text-sm bg-emerald-200 border border-emerald-200 hover:border-emerald-500 p-2 rounded-xl " type="button" >Add to cart</button>
              <button title="Wishlist" type="buttom"><img className='hover:bg-emerald-200 p-2 rounded-full' src="wishlist.svg" alt="" /></button>
            </div>
          </div>
        })}

        {todayOffer.length == 0 && skeleton.map((item) => {

          return <div key={item} className="product flex gap-4  p-3 rounded-xl cursor-pointer ">

            <Box className="flex flex-col gap-2" sx={{ overflow: 'hidden' }}>
              <Skeleton className="rounded-md" variant="rectangular" width={200} height={210} />
              <Skeleton className="rounded-sm" variant="rectangular" width={200} height={20} />
              <Skeleton className="rounded-sm" variant="rectangular" width={200} height={20} />
              <Skeleton className="rounded-sm" variant="rectangular" width={200} height={20} />
              <Skeleton className="rounded-sm" variant="rectangular" width={100} height={20} />
              <Skeleton className="rounded-md" variant="rectangular" width={200} height={25} />

            </Box>

          </div>



        })}


      </div>



    </main>
  );
}
