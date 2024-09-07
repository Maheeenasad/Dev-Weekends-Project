import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import communityImage from "../public/assets/hero.jpg";
import ValuesSection from "../components/ValuesSection";
import Events from "../components/Events";
import Blog from "../components/Blog";
import Footer from "../components/Footer";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Dev Weekends</title>
        <meta
          name="description"
          content="Join a community dedicated to mentorship, skill development, and competitive excellence."
        />
      </Head>

      <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 h-screen bg-white overflow-hidden">
        {/* Left Column: Content */}
        <div className="flex flex-col justify-center items-start p-8 lg:pl-16 space-y-4">
          <h1 className="text-3xl lg:text-6xl font-bold text-black leading-snug">
            Elevate Your <br /> Tech Journey
          </h1>
          <p className="text-sm lg:text-lg text-gray-700">
            Discover a vibrant community of tech enthusiasts, learn{" "}
            <br className="hidden lg:inline-block" /> from industry experts, and
            unlock new opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/register" passHref>
              <button className="px-4 py-2 text-sm lg:text-lg bg-black text-white rounded-md hover:bg-gray-800 transition">
                Join the Community
              </button>
            </Link>
            <Link href="/chat" passHref>
              <button className="px-4 py-2 text-sm lg:text-lg bg-white border border-gray-400 text-gray-700 rounded-md hover:bg-gray-100 transition">
                Explore AI
              </button>
            </Link>
          </div>
        </div>

        {/* Right Column: Image */}
        <div className="flex justify-center items-center p-8 lg:pr-16">
          <Image
            src={communityImage}
            alt="Community Collaboration"
            width={500}
            height={500}
            className="object-contain"
          />
        </div>
      </div>

      <ValuesSection />
      <Events />
      <Blog />
      <Footer />
    </>
  );
}
