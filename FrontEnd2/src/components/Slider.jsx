import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useProductStore } from "../Store/useProductStore";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../Store/useUserStore";

export default function SimpleSlider() {
  const { fetchProducts, products } = useProductStore();
  const Navigate=useNavigate();
  const {Admin}=useUserStore();
  useEffect(() => {
    const f = async () => {
      await fetchProducts();
    };
    f();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  };

  if (!products || products.length === 0) {
    return <div>Loading slider...</div>;
  }

  return (
    <div className="w-full max-w-screen-lg mx-auto">
      <Slider {...settings}>
        {products.map((product, i) => (
          <div key={product.id || i} className="h-80 md:h-96">
            <img
              src={product.image}
              alt={`Slide ${i + 1}`}
              className="w-full h-full object-cover cursor-pointer"
              onClick={() => {
                  const isAdmin = useUserStore.getState().Admin; // get fresh state
                  if (isAdmin) {
                    Navigate(`../product/${product.id}`);
                  }
                }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
