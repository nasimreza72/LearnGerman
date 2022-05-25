import { useEffect, useState, useRef } from "react";
import { Button } from "@mui/material";

export default function TranslateToGerman() {
  const [word, setWord] = useState("willkommen");
  const [loading, setLoading] = useState(false);
  const [translate, setTranslate] = useState([]);
  const [sentence, setSentence] = useState("");
  const [offset, setOffset] = useState({});
  const [showSuggestion, setShowSuggestion] = useState(true);

  useEffect(() => {
    let newWord =
      word.includes(",") ||
      word.includes(".") ||
      word.includes("!") ||
      word.includes("?") ||
      word.includes(":") ||
      word.includes("!")
        ? word.slice(0, -1)
        : word;

    // const ßChecker = newWord.replaceAll("ß", "ss") || newWord;
    // const äChecker = ßChecker.replaceAll("ä", "a") || ßChecker;
    // const öChecker = äChecker.replaceAll("ö", "o") || äChecker;
    // const üChecker = öChecker.replaceAll("ü", "u") || öChecker;

   newWord =  newWord.replaceAll("ß", "ss")
     .replaceAll("ä", "a") 
     .replaceAll("ö", "o") 
     .replaceAll("ü", "u") 

    fetch(`http://localhost:3005/toGerman/${newWord}`)
      .then((response) => response.json())
      .then((result) => {
        if (result.error) {
          console.log(result.error);
          alert("Error fetching translation");
          setLoading(false);
          return;
        }
        setTranslate(result);
        setLoading(true);
      });
  }, [word]);

  const inputWord = useRef();
  const inputText = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    setWord(inputWord.current.value);
    console.log(inputWord.current.value);
  };

  return (
    <div className="TranslateToGerman">
      <div className="inputField">
        <form onSubmit={submitHandler}>
          <input placeholder="WORT HIER" ref={inputWord} />
          <Button onClick={submitHandler} size="small" variant="contained">
            SEARCH
          </Button>
        </form>
      </div>

      <div className="textArea">
        <textarea
          onChange={() => setSentence(inputText.current.value)}
          ref={inputText}
          placeholder="Schreiben Sie hier Ihre Sätze und klicken Sie auf der rechten Seite auf einzelne Wörter, um sie nachzuschlagen."
          className="textField"
        ></textarea>

        <div
          onClick={(e) => console.log(e.target.offsetLeft)}
          className="textDiv"
        >
          {sentence.split(" ").map((item) => (
            <span
              className="individualWord"
              onClick={(e) => {
                if (!showSuggestion) {
                  setShowSuggestion(true);
                } else {
                  setShowSuggestion(false);
                }
                setWord(item);
                setOffset({
                  left: e.target.offsetLeft,
                  top: e.target.offsetTop,
                });
              }}
            >
              {" "}
              {item}{" "}
            </span>
          ))}

          <div
            style={{
              display: showSuggestion == true ? "none" : "block",
              position: "absolute",
              width: "100px",
              padding: "5px",
              textAlign: "justify",
              zIndex: 1,
              top: `${offset.top + 18}px`,
              left: `${offset.left - 5}px`,
              background: "white",
              opacity: 0.75,
              borderRadius: "5px",
            }}
          >
            {translate.synonyme1}
          </div>
        </div>
      </div>
      <div className="instructionForUser">
      Schreiben Sie hier Ihre Sätze und klicken Sie auf der rechten Seite auf einzelne Wörter, um sie nachzuschlagen.
      </div>

      {loading == true && (
        <div className="translated-word">
          <h5>
            {" "}
            {translate
              ? translate.l2_text
                ? translate.l2_text.toUpperCase() +
                  "(" +
                  translate.l1_text.toLowerCase() +
                  ")"
                : ""
              : ""}{" "}
          </h5>
      
          <hr />
          <strong>Synonyms: </strong>
          {translate ? (translate.synonyme1 ? translate.synonyme1 : "") : ""}
          <hr />
          <strong>Wortart: </strong>
          {translate ? (translate.wortart ? translate.wortart : "") : ""}
          <hr />
          {translate
            ? translate.sentences[0]
              ? translate.sentences[0]
                  .join("")
                  .replaceAll("<b>", "")
                  .replaceAll("</b>", "")
                  .split(".")
                  .map((item, index) => {
                    if (index == 1) {
                      return (
                        <div style={{ color: "gray" }}>
                          {" "}
                          <strong>Translation: </strong> {item}.
                        </div>
                      );
                    } else {
                      return <div>{item}</div>;
                    }
                  })
              : ""
            : ""}
          <br />
          {translate
            ? translate.sentences[1]
              ? translate.sentences[1]
                  .join("")
                  .replaceAll("<b>", "")
                  .replaceAll("</b>", "")
                  .split(".")
                  .map((item, index) => {
                    if (index == 1) {
                      return (
                        <div style={{ color: "gray" }}>
                          {" "}
                          <strong>Translation: </strong> {item}.
                        </div>
                      );
                    } else {
                      return <div>{item}</div>;
                    }
                  })
              : ""
            : ""}
        </div>
      )}
    </div>
  );
}
