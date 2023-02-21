import React from "react";

export default function ResultsPage () {
    let search = window.localStorage.getItem("search")

    const results =  fetch ('http://localhost:3001/resultspage', {
        method: "POST",
        crossDomain: true,
        headers: { 
          "Content-Type": "application/json",
          Accept:"application/json",
          "Accept-Control-Allow-Origin":"*",
        },
        body: JSON.stringify({
          search,
        }),
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
    })

    return (
        <>
            <h2> You searched for: {search} </h2>
        </>
    )
}



