import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/Cart/CartSlice";
import { toast } from "react-hot-toast";

const DEFAULT_RATING = 3;
const MAX_CHARS = 200;

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [tempRating, setTempRating] = useState(DEFAULT_RATING);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError("Invalid product ID");
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/product/${id}`);
        if (!res.ok) {
          setError("Product not found");
          setProduct(null);
          return;
        }
        const data = await res.json();

        if (!data.data) {
          setError("Invalid product data");
          setProduct(null);
          return;
        }

        setProduct(data.data);

        const savedReviews =
          JSON.parse(localStorage.getItem(`reviews-${id}`)) || [];
        setReviews(savedReviews);
        setError(null);
      } catch (error) {
        console.error("Error loading product:", error);
        setError("Failed to load product. Please try again.");
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // ⭐ Select rating
  const handleRatingSelect = (value) => {
    setTempRating(value);
  };

  // 📝 Submit review
  const submitReview = () => {
    if (!reviewText.trim()) {
      toast.error("Please write a review");
      return;
    }

    const newReview = {
      id: Date.now(),
      rating: tempRating,
      text: reviewText,
      time: new Date().toLocaleString(),
    };

    const updatedReviews = [newReview, ...reviews];

    setReviews(updatedReviews);
    setReviewText("");
    setTempRating(DEFAULT_RATING);

    localStorage.setItem(`reviews-${id}`, JSON.stringify(updatedReviews));

    toast.success("Review submitted");
  };

  // 🗑 Delete review
  const deleteReview = (reviewId) => {
    const filtered = reviews.filter((r) => r.id !== reviewId);
    setReviews(filtered);
    localStorage.setItem(`reviews-${id}`, JSON.stringify(filtered));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-center text-lg text-gray-600">
          Loading product details...
        </p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg text-red-600 mb-4">
            {error || "Product not found"}
          </p>
          <a
            href="/products"
            className="text-emerald-600 hover:text-emerald-700 font-semibold"
          >
            ← Back to Products
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-28 px-6 grid md:grid-cols-2 gap-8">
      {/* LEFT IMAGE */}
      <div className="border rounded-lg p-6">
        <img
          src={`/uploads/${product.productImage}`}
          alt={product.productName}
          className="w-full h-96 object-contain"
        />
      </div>

      {/* RIGHT DETAILS */}
      <div className="space-y-4">
        <h2 className="text-3xl font-bold">{product.productName}</h2>

        {/* Category Badge */}
        <div className="flex items-center gap-2">
          <span className="inline-block bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold capitalize">
            {product.productCategory}
          </span>
        </div>

        <p className="text-gray-600">{product.productDescription}</p>

        {/* ⭐ Rating */}
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <span
              key={s}
              onClick={() => handleRatingSelect(s)}
              className={`text-2xl cursor-pointer ${
                s <= tempRating ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              ★
            </span>
          ))}
        </div>

        <p className="text-xl text-emerald-600 font-semibold">
          {product.productPrice} Rs
        </p>

        <button
          onClick={() => {
            dispatch(addToCart(product));
            toast.success("Added to cart");
          }}
          className="bg-gradient-to-r from-emerald-500 to-slate-600 hover:from-emerald-600 hover:to-slate-700 text-white px-6 py-2 rounded-full transition"
        >
          Add to Cart
        </button>

        {/* 📝 Review Form */}
        <div className="pt-6 border-t space-y-2">
          <textarea
            rows="3"
            value={reviewText}
            onChange={(e) =>
              e.target.value.length <= MAX_CHARS &&
              setReviewText(e.target.value)
            }
            placeholder="Write your review..."
            className="w-full border p-3 rounded"
          />

          <div className="flex justify-between text-xs text-gray-500">
            <span>
              {reviewText.length}/{MAX_CHARS}
            </span>
          </div>

          <button
            onClick={submitReview}
            className="bg-gradient-to-r from-emerald-500 to-slate-600 text-white px-5 py-2 rounded-full hover:from-emerald-600 hover:to-slate-700"
          >
            Submit Review
          </button>
        </div>

        {/* 📚 PREVIOUS REVIEWS */}
        {reviews.length > 0 && (
          <div className="mt-6 space-y-4">
            <h3 className="font-semibold text-lg">Customer Reviews</h3>

            {reviews.map((r) => (
              <div key={r.id} className="bg-slate-100 p-4 rounded space-y-1">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span
                      key={s}
                      className={`text-sm ${
                        s <= r.rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>

                <p>{r.text}</p>

                <div className="flex justify-between text-xs text-gray-500">
                  <span>{r.time}</span>
                  <button
                    onClick={() => deleteReview(r.id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
