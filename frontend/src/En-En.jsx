import { useEffect, useState, useRef } from "react";
import { Button, Hidden } from "@mui/material";

export default function Translate() {
  const [word, setWord] = useState("home");
  const [loading, setLoading] = useState(false);
  const [translate, setTranslate] = useState([]);
  const [sentence, setSentence] = useState("");
  const [offset, setOffset] = useState({});
  const [showSuggestion, setShowSuggestion] = useState(true);

  useEffect(() => {
    const newWord =
      word.includes(",") ||
      word.includes(".") ||
      word.includes("!") ||
      word.includes("?") ||
      word.includes(":") ||
      word.includes("!")
        ? word.slice(0, -1)
        : word;

    console.log(newWord);

    fetch(`http://localhost:3005/toEnglish/${newWord}`)
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
        console.log(result);
      });
  }, [word]);

  const inputWord = useRef();
  const inputText = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    setWord(inputWord.current.value);
    console.log(inputText.current.value);
  };



  return (
    <div className="TranslateToEnglish">
      <div className="inputField">
        <form onSubmit={submitHandler}>
          <input placeholder="WORD HERE" ref={inputWord} />
          <Button onClick={submitHandler} size="small" variant="contained">
            SEARCH
          </Button>
        </form>
      </div>

      <div className="textArea">
        <textarea
          onChange={() => setSentence(inputText.current.value)}
          ref={inputText}
          placeholder="Write your sentences here and click on every word for more possibilities."
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
            onClick={(e) => {
              if (!showSuggestion) {
                setShowSuggestion(true);
              } else {
                setShowSuggestion(false);
              }
            }}
            style={{
              display: showSuggestion == true ? "none" : "block",
              position: "absolute",
              top: `${offset.top + 23}px`,
              left: `${offset.left - 5}px`,
              zIndex: 1,
            }}
          >
            {loading == true &&
              translate.meanings[0].synonyms.map((item) => (
                <div
                  onClick={() => {
                    setWord(item);
                  }}
                  className="individualWord"
                  style={{
                    padding: "2px 10px",
                    borderBottom: "1px solid black",
                    borderRadius: "5px",
                    boxShadow:
                      "rgba(0, 0, 0, 0.19) 0px 5px 10px, rgba(0, 0, 0, 0.23) 0px 3px 3px",
                  }}
                >
                  {item}
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="instructionForUser">
        Click on a word to look it up & click again to make it disappear.
      </div>

      {loading == true && (
        <div className="translated-word">
          <h5>{translate ? translate.word.toUpperCase() : word}</h5>

          <hr />

          <strong>Synonyms: </strong>

          {translate
            ? translate.meanings[0].synonyms.map((item) => (
                <span>{item + ", "} </span>
              ))
            : ""}

          <hr />

          {translate ? (
            <audio
              controls
              src={
                translate.phonetics
                  ? translate.phonetics.filter((item) => item.audio !== "")[0]
                    ? translate.phonetics.filter((item) => item.audio !== "")[0]
                        .audio
                    : ""
                  : ""
              }
            />
          ) : (
            ""
          )}

          <hr />

          <strong>
            {" "}
            {translate
              ? translate.meanings[0].partOfSpeech.toUpperCase()
              : ""}{" "}
          </strong>

          <hr />

          <strong>Definitions: </strong>
          <br />

          {translate
            ? translate.meanings[0].definitions.map((item) => (
                <div style={{ color: "gray" }}>{item.definition}</div>
              ))
            : word}
        </div>
      )}
    </div>
  );
}
