"use client";

import { useEffect } from "react";
import "./module.style.css";

const DummyClient = () => {
  useEffect(() => {
    const reviews = [
      {
        name: "রিফাত হোসেন",
        phone: "০১৮*******৪৫",
        title: "আত্মবিশ্বাস ফিরে পেয়েছি!",
        desc: "আগে দুর্বলতা ও স্বপ্নদোষে ভুগতাম। Panagold + G-Timex খাওয়ার ৭ দিনের মধ্যে স্পষ্ট পরিবর্তন অনুভব করেছি। এখন দেহে শক্তি ও আত্মবিশ্বাস দুই-ই ফিরে এসেছে!",
        avatar: "R",
        rating: 5,
      },
      {
        name: "মোহাম্মদ রাকিব",
        phone: "০১৭*******২১",
        title: "দেহে নতুন শক্তির অনুভূতি!",
        desc: "Panagold + G-Timex নেওয়ার আগে দুর্বল লাগতো, কাজে মনোযোগ ছিল না। এখন প্রতিদিন দেহে শক্তি টের পাই, আত্মবিশ্বাস অনেক বেড়েছে। সত্যিই অসাধারণ পণ্য।",
        avatar: "M",
        rating: 5,
      },
      {
        name: "সাদমান ইসলাম",
        phone: "০১৯*******৩২",
        title: "স্বপ্নদোষের সমস্যা দূর হয়েছে",
        desc: "আমি অনেক বছর ধরে স্বপ্নদোষের সমস্যায় ভুগছিলাম। অনেক কিছু ট্রাই করেও ফল পাইনি। কিন্তু G-Timex ব্যবহার শুরু করার ১০ দিন পরেই বিশাল পরিবর্তন! এখন আমি পুরোপুরি স্বাভাবিক জীবন যাপন করছি।",
        avatar: "S",
        rating: 5,
      },
      {
        name: "নাসির উদ্দিন",
        phone: "০১৬*******৯৪",
        title: "ডায়াবেটিসে নিয়ন্ত্রণ ও শক্তি দুটোই!",
        desc: "আমি ডায়াবেটিসে ভুগতাম, যার কারণে দুর্বলতা ছিল অনেক। Panagold + G-Timex একসাথে নেওয়ার পর ব্লাড সুগার নিয়ন্ত্রণে এসেছে, দেহেও প্রচুর এনার্জি পাচ্ছি।",
        avatar: "N",
        rating: 5,
      },
    ];

    const reviewsWrapper = document.querySelector(".reviews-wrapper");

    function generateReviewCards() {
      if (!reviewsWrapper) return;

      reviewsWrapper.innerHTML = "";
      reviews.forEach((review) => {
        const reviewCard = `
          <div class="review-card">
            <div class="review-content">
              <div>
                <div class="stars">
                  ${'<svg class="star"><polygon points="9.9,1.1 12.3,6.9 18.6,7.3 13.8,11.4 15.3,17.6 9.9,14.2 4.5,17.6 6,11.4 1.2,7.3 7.5,6.9"></polygon></svg>'.repeat(
                    review.rating
                  )}
                </div>
                <h3 class="review-title">${review.title}</h3>
                <p class="review-desc">${review.desc}</p>
              </div>
              <div class="review-footer">
                <div class="avatar">${review.avatar}</div>
                <div class="reviewer-info">
                  <p class="reviewer-name">${review.name}</p>
                  <p class="reviewer-phone">${review.phone}</p>
                </div>
              </div>
            </div>
          </div>`;
        reviewsWrapper.innerHTML += reviewCard;
      });

      reviewsWrapper.innerHTML += reviewsWrapper.innerHTML;
    }

    generateReviewCards();

    const orderButtons = document.querySelectorAll(".order-btn");
    const handleOrderClick = (e) => {
      e.preventDefault();
      alert("অর্ডার প্রক্রিয়া শুরু হয়েছে! দয়া করে আপনার তথ্য পূরণ করুন।");
    };

    orderButtons.forEach((button) => {
      button.addEventListener("click", handleOrderClick);
    });

    const imageSlider = document.querySelector(".image-container-slider");
    const animatedImages = document.querySelectorAll(
      ".animated-image-1, .animated-image-2"
    );

    const handleMouseEnter = () => {
      animatedImages.forEach((img) => {
        img.style.animationPlayState = "paused";
      });
    };

    const handleMouseLeave = () => {
      animatedImages.forEach((img) => {
        img.style.animationPlayState = "running";
      });
    };

    if (imageSlider) {
      imageSlider.addEventListener("mouseenter", handleMouseEnter);
      imageSlider.addEventListener("mouseleave", handleMouseLeave);
    }

    const scrollContainer = document.querySelector(".scroll-container");
    let isScrolling = true;

    const toggleScrollButton = document.createElement("button");
    toggleScrollButton.textContent = "Pause Reviews";
    toggleScrollButton.style.position = "absolute";
    toggleScrollButton.style.top = "10px";
    toggleScrollButton.style.right = "10px";
    toggleScrollButton.style.padding = "10px 20px";
    toggleScrollButton.style.background = "var(--background)";
    toggleScrollButton.style.color = "#fff";
    toggleScrollButton.style.border = "none";
    toggleScrollButton.style.borderRadius = "8px";
    toggleScrollButton.style.cursor = "pointer";

    const reviewsSection = document.querySelector(".reviews-section");
    if (reviewsSection) {
      reviewsSection.prepend(toggleScrollButton);

      const handleToggleClick = () => {
        isScrolling = !isScrolling;
        if (scrollContainer) {
          scrollContainer.style.animationPlayState = isScrolling
            ? "running"
            : "paused";
        }
        toggleScrollButton.textContent = isScrolling
          ? "Pause Reviews"
          : "Resume Reviews";
      };

      toggleScrollButton.addEventListener("click", handleToggleClick);
    }

    const priceText = document.querySelectorAll(".price-text")[1];
    const originalPrice = 1200;
    const discountPrice = 1000;
    let timeLeft = 3600;

    function updatePrice() {
      if (timeLeft > 0 && priceText) {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        priceText.innerHTML = `৳ <del>${originalPrice}</del> ${discountPrice} <br><small>Offer ends in ${minutes}m ${seconds}s</small>`;
        setTimeout(updatePrice, 1000);
      } else if (priceText) {
        priceText.innerHTML = `৳ ${originalPrice}`;
      }
    }

    updatePrice();

    return () => {
      orderButtons.forEach((button) => {
        button.removeEventListener("click", handleOrderClick);
      });

      if (imageSlider) {
        imageSlider.removeEventListener("mouseenter", handleMouseEnter);
        imageSlider.removeEventListener("mouseleave", handleMouseLeave);
      }

      if (toggleScrollButton && reviewsSection) {
        toggleScrollButton.remove();
      }
    };
  }, []);

  return (
    <div id="iyio">
      <div className="root-1">
        <div className="wrapper-div">
          <div className="hero-section">
            <div>
              <h1 className="common-class title-1">
                পুরুষের গোপন দুর্বলতার স্থায়ী সমাধান 💪
                <br />
                Panagold &amp; G-Timex কম্বোতে ফিরে পান আত্মবিশ্বাস ও শক্তি 🔥
              </h1>
              <div className="image-container-slider">
                <div className="left-side">
                  <img
                    src="https://stx-v3-static-assets.obs.as-south-208.rcloud.reddotdigitalit.com/naturecure-online/images/builder/68f0cd9ce026d94e6c116a3d/1760613825430_photo-2025-10-16-17-14-18.jpg"
                    alt="Panagold and G-Timex Combo"
                    className="animated-image-1"
                  />
                </div>
                <div className="divider-1"></div>
                <div className="right-side">
                  <img
                    src="https://stx-v3-static-assets.obs.as-south-208.rcloud.reddotdigitalit.com/naturecure-online/images/builder/68f0cd9ce026d94e6c116a3d/1760613829330_photo-2025-10-16-17-14-18--2-.jpg"
                    alt="Herbal Combo Pack for Men"
                    className="animated-image-2"
                  />
                </div>
              </div>
              <div className="order-container">
                <a href="#checkout-now" className="order-btn">
                  <button className="submit-btn">
                    <span> আজই অর্ডার করুন </span>
                  </button>
                </a>
              </div>
              <h2 className="common-class title-2">
                কেমিক্যাল ও ইনজেকশন ছাড়াই 🛡️
                <span className="colorful-text">100% ভেষজ ফর্মুলায়</span> ফিরে
                পান
                <span className="colorful-text">পুরুষত্ব ও প্রাণশক্তি</span>!
              </h2>
            </div>
          </div>
          <h3 className="common-class title-2">
            কম্বো প্রোডাক্ট 💊 –
            <span className="colorful-text">Panagold + G-Timex</span>– যৌন
            স্বাস্থ্য উন্নত করে, আত্মবিশ্বাস ফিরিয়ে আনে।
          </h3>
          <ul className="health-benefits">
            <li className="health-benefits-li">
              <img
                src="https://cdn-icons-png.flaticon.com/128/190/190411.png"
                alt="leaf"
                className="check-image-1"
              />
              🌿 Panagold: পুরুষত্ব বৃদ্ধি ও শুক্রাণু উন্নতিতে কার্যকর।
            </li>
            <li className="health-benefits-li">
              <img
                src="https://cdn-icons-png.flaticon.com/128/3209/3209265.png"
                alt="lungs"
                className="check-image-1"
              />
              🔥 G-Timex: স্বপ্নদোষ, প্রমেহ ও ডায়াবেটিসে শক্তিশালী প্রভাব।
            </li>
            <li className="health-benefits-li">
              <img
                src="https://cdn-icons-png.flaticon.com/128/4315/4315609.png"
                alt="safe"
                className="checkimage-1"
              />
              🚫 পার্শ্বপ্রতিক্রিয়ামুক্ত হারবাল ফর্মুলা – সম্পূর্ণ নিরাপদ ও
              পরীক্ষিত।
            </li>
            <li className="health-benefits-li">
              <img
                src="https://cdn-icons-png.flaticon.com/128/2913/2913461.png"
                alt="doctor"
                className="check-image-1"
              />
              🩺 বিশেষজ্ঞ ও আয়ুর্বেদিক চিকিৎসকদের বিশ্বাসযোগ্য কম্বো।
            </li>
          </ul>
          <h3 className="common-class title-2">
            দুর্বলতা, স্বপ্নদোষ বা আত্মবিশ্বাস হারানো? 😟
            <br />
            <span className="colorful-text">Panagold + G-Timex</span> নিন,
            পরিবর্তন দেখুন নিজের চোখে!
          </h3>
          <div className="image-container">
            <div className="image-stack">
              <img
                src="https://stx-v3-static-assets.obs.as-south-208.rcloud.reddotdigitalit.com/naturecure-online/images/builder/68f0cd9ce026d94e6c116a3d/1760613829330_photo-2025-10-16-17-14-18--2-.jpg"
                alt="Herbal Combo Product"
                className="top-img"
              />
              <img
                src="https://stx-v3-static-assets.obs.as-south-208.rcloud.reddotdigitalit.com/naturecure-online/images/builder/68f0cd9ce026d94e6c116a3d/1760613825430_photo-2025-10-16-17-14-18.jpg"
                alt="Herbal Medicine Bottle"
                className="bottom-img"
              />
            </div>
          </div>
          <div className="order-container">
            <a href="#checkout-now" className="order-btn">
              <button className="submit-btn">
                <span> অর্ডার কনফার্ম করুন </span>
              </button>
            </a>
          </div>
          <h3 className="common-class title-2">
            আমাদের সন্তুষ্ট গ্রাহকদের মতামত 💬
          </h3>
        </div>
      </div>
      <section className="reviews-section">
        <div className="fade-left"></div>
        <div className="fade-right"></div>
        <div className="scroll-container">
          <div className="reviews-wrapper"></div>
        </div>
      </section>
      <div className="root-1">
        <div className="wrapper-div">
          <div className="price-value">
            <div className="price-desc">
              <img
                src="https://stx-v3-static-assets.obs.as-south-208.rcloud.reddotdigitalit.com/naturecure-online/images/products/e8ecac5042764239a23d/1760003617360_photo-2025-10-09-15-53-17.webp"
                alt="Diamum Capsules"
              />
              <a href="#checkout-now" className="price-text">
                ৳ 750
              </a>
            </div>
            <div className="price-desc">
              <img
                src="https://stx-v3-static-assets.obs.as-south-208.rcloud.reddotdigitalit.com/naturecure-online/images/builder/68f0cd9ce026d94e6c116a3d/1760613822157_photo-2025-10-16-16-56-31.jpg"
                alt="Combo Pack"
                id="i7r4ey"
              />
              <a href="#checkout-now" className="price-text">
                ৳ <del>1200</del> 1000
              </a>
            </div>
          </div>
          <h2 className="common-class title-3">
            আর দেরি না করে আজই সংগ্রহ করুন আমাদের
            <span className="colorful-text">
              {" "}
              সীমিত সময়ের প্রাকৃতিক সমাধান{" "}
            </span>
            । "আজই কিনুন" বাটনে ক্লিক করে অর্ডার সম্পন্ন করুন এবং
            <span className="colorful-text">
              নিজের স্বাস্থ্য সুরক্ষিত করুন
            </span>{" "}
            । স্টক সীমিত, তাই দ্রুত ব্যবস্থা নিন!
          </h2>
        </div>
      </div>
    </div>
  );
};

export default DummyClient;
