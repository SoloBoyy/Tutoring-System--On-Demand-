import Data from "./tutor-data.json";
import React, { useState } from "react";
import "./search-bar.css";

export const SearchBar = () => {
  const [query, setQuery] = useState("")
  var dataPoints = [];
  console.log(dataPoints);
  return (
    <div className="search-bar">
      <input placeholder="Search for a Class" onChange={event => setQuery(event.target.value)}/>
      {
        Data.filter(post => {
          if (query == '') {
            return '';
          } else if (post.class.toLowerCase().includes(query.toLowerCase())) {
            dataPoints.push({lat: post.latitude, lng: post.longitude});
            return post;
          }
        }).map((post, index) => (
          <div className="box" key={index}>
            <p className="class-title"><b>{post.class}</b></p>
            <p>{"Tutor: " + post.name}</p>
            <p>{"Email: " + post.email}</p>
            <p>{"Location: " + post.location}</p>
          </div>
        ))
      }
    </div>
  )
};
export default SearchBar;