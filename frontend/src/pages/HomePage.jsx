import React from "react";
import Hero from "../components/Hero";
import Product from "../components/Product";
import NewArrivals from "./NewArrivals";
import Testimonials from "./Testimonials";
import TopBrands from "./TopBrands";
import PromoBanner from "./PromoBanner";

const HomePage = () => {
  return (
    <div>
      <PromoBanner />
      <Hero />
      <TopBrands />
      <Product />
      <NewArrivals />
      <Testimonials />
    </div>
  );
};

export default HomePage;
