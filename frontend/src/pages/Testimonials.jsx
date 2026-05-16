import React from "react";

const testimonials = [
  {
    name: "Ali Khan",
    role: "Verified Buyer",
    review:
      "Absolutely blown away by the quality! Ordered a smartphone and it arrived in pristine condition. The packaging was top-notch and the delivery was faster than expected. This is now my go-to online store!",
  },
  {
    name: "Ayesha Noor",
    role: "Regular Customer",
    review:
      "I've been shopping here for 6 months now and every single order has been perfect. The cash on delivery option gives me peace of mind, and their customer support team is incredibly helpful. 5 stars!",
  },
  {
    name: "Usman Raza",
    role: "Happy Customer",
    review:
      "Found exactly what I was looking for at unbeatable prices! The product descriptions are detailed and accurate. Easy returns policy is a lifesaver. Will definitely recommend to all my friends.",
  },
  {
    name: "Hira Shah",
    role: "Online Shopper",
    review:
      "The website is so user-friendly and beautiful! Shopping for fashion and electronics has never been this enjoyable. Fast shipping, secure payments, and amazing product variety. Love this platform!",
  },
  {
    name: "Ahmed Hassan",
    role: "Tech Enthusiast",
    review:
      "Got my gaming laptop yesterday and it's performing like a beast! The specs matched exactly as described. Their tech support helped me set it up over chat. Exceptional service all around!",
  },
  {
    name: "Fatima Malik",
    role: "Fashion Lover",
    review:
      "The dresses I ordered fit perfectly and the quality is outstanding. Colors are vibrant and fabric is premium. Their styling tips in the product descriptions are really helpful. My new favorite fashion destination!",
  },
];

const Testimonials = () => {
  return (
    <section className=" bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 py-8 px-4 mb-16">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-emerald-400 mb-2">
        What Our Customers Say
      </h2>
      <p className="text-center text-sm text-gray-300 mb-6 max-w-xl mx-auto">
        Thousands of customers trust us for quality products and reliable
        service.
      </p>

      <div className="max-w-6xl mx-auto grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {testimonials.map((item, index) => (
          <div
            key={index}
            className="
              bg-white p-4 rounded-xl shadow
              transform transition-all duration-300
              hover:scale-105 hover:shadow-lg
            "
          >
            <p className="text-xs text-gray-600 italic mb-3 leading-relaxed">
              “{item.review}”
            </p>
            <h4 className="text-sm font-semibold text-emerald-400">
              {item.name}
            </h4>
            <p className="text-xs text-gray-400">{item.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
