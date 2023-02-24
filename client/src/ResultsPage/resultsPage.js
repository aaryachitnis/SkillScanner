import React from "react";

export default function ResultsPage () {
  let search = window.localStorage.getItem("search") // retrieving the search request 



  return (
    <>
      <h2> You searched for: {search} </h2>
    </>
  )
}



