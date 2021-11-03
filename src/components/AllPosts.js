import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import sanityClient from "../client.js";

export default function AllPosts() {
  const [allPostsData, setAllPosts] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "post"]{
            title,
            slug,
            mainImage{
              asset->{
                _id,
                url
              }
            }
          }`
      )
      .then((data) => setAllPosts(data))
      .catch(console.error);
  }, []);

  console.log(allPostsData);

  return (
    <div className="min-h-screen p-12 border-solid border-4 border-light-green-500">
      <div className="container mx-auto border-4 border-light-green-500">
        <h2 className="text-5xl flex justify-center subpixel-antialiased font-medium cursive text-green-600 font-serif shadow-sm">Passion Led Us Here</h2>
        <h3 className="text-lg text-gray-600 flex hover:underline justify-center mb-12 font-serif p-4 shadow-sm">
          This is the sign you've been looking for!
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allPostsData &&
            allPostsData.map((post, index) => (
              <Link to={"/" + post.slug.current} key={post.slug.current}>
                <span
                  className="block h-64 relative rounded shadow leading-snug bg-white border-l-8 border-indigo-400 bg-opacity-50"
                  key={index}
                >
                  <img
                    className="w-full h-full rounded-r object-cover absolute"
                    src={post.mainImage.asset.url}
                    alt=""
                  />
                  <span className="block relative h-full flex justify-end items-end pr-4 pb-4">
                    <h2 className="text-gray-800 text-lg font-bold px-3 py-4 bg-red-300 text-red-100 bg-opacity-75 rounded">
                      {post.title}
                    </h2>
                  </span>
                </span>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
