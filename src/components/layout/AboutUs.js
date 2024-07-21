// components/layout/AboutUs.js
import React from "react";

const AboutUs = () => {
  return (
    <div className="p-8 rounded-lg my-8 text-center" id="aboutus">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p className="text-lg mb-4">
        Welcome to our Telemedicine platform, where we bring healthcare to your
        fingertips.
      </p>
      <p className="text-lg mb-4">
        Our mission is to provide accessible and convenient medical care to
        everyone, regardless of location. With our team of experienced doctors
        and healthcare professionals, we strive to offer the best telehealth
        services.
      </p>
      <p className="text-lg">
        Whether you need a quick consultation or a follow-up appointment, our
        platform is designed to make the process seamless and efficient. We
        value your health and are committed to providing you with the highest
        quality of care.
      </p>
    </div>
  );
};

export default AboutUs;
