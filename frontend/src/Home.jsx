import { useEffect, useState } from "react";

export default function Home(props) {
  return (
    <div id="home">
      <h1>
        Welcome to the{" "}
        <span style={{ fontSize: "50px", fontWeight: 400 }}>L</span>
        <span
          style={{ fontSize: "45px", fontStyle: "italic", fontWeight: 500 }}
        >
          ge
        </span>
        <span
          style={{
            color: "red",
            fontSize: 45,
            fontWeight: 500,
            fontStyle: "italic",
          }}
        >
          rm
        </span>
        <span
          style={{
            color: "#f9b248",
            fontSize: 45,
            fontWeight: 500,
            fontStyle: "italic",
          }}
        >
          an
        </span>{" "}
        page
      </h1>

      <div style={{ margin: "2rem" }} className="mainBelowPart">
        <h2>Are you struggling with your German?</h2>

        <h4>
          {" "}
          <span style={{ fontSize: "50px", fontWeight: 400 }}>L</span>
          <span
            style={{ fontSize: "35px", fontStyle: "italic", fontWeight: 500 }}
          >
            ge
          </span>
          <span
            style={{
              color: "red",
              fontSize: 35,
              fontWeight: 500,
              fontStyle: "italic",
            }}
          >
            rm
          </span>
          <span
            style={{
              color: "#f9b248",
              fontSize: 35,
              fontWeight: 500,
              fontStyle: "italic",
            }}
          >
            an
          </span>{" "}
          can help you :
        </h4>
        <ul>
          <li>learn basic german</li>
          <li>enhance your vocabulary</li>
          <li>translate from German to English</li>
          <li>improve your English vocabulary </li>
          <li>keep track of what you have learnt </li>
        </ul>
        {/* <button onClick={() => props.setLogin(false)}>logout</button> */}
      </div>
    </div>
  );
}
