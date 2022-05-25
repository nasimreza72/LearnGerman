import express from "express";
import cors from "cors";
import db from "./db.js";
import axios from "axios";

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import * as dataBase from "./lib/database.js";
import { User } from "./models/User.js";
import Word from "./models/EnglishWords.js";
import GermanWords from "./models/GermanWords.js";
import { hash, compareHashes } from "./lib/crypto.js";

dotenv.config();
dataBase.connect();
const app = express();
app.use(cors());
app.use(express.json());

/////// API FOR ENGLISH TRANSLATION

app.get("/toEnglish/:word", async (req, res) => {
  const selectedWord = await Word.find();

  const existedWord = selectedWord.find(
    (item) => item.word[0] && item.word[0].word == req.params.word.toLowerCase()
  );

  if (existedWord) {
    res.send(existedWord.word[0]);
    console.log("coming From DB ------>");
  } else {
    axios(`https://api.dictionaryapi.dev/api/v2/entries/en/${req.params.word}`)
      .then((result) => {
        console.log("coming From API ------>");
        const singleWord = {
          word: result.data[0],
        };
        Word.create(singleWord);
        res.send(result.data[0]);
      })
      .catch((err) => {
        Word.create({
          word: req.params.word,
          error: err,
        });
        res.send({
          word: req.params.word,
          error: err,
        });
      });
  }
});


///////  Get word list from English DB

app.get("/toEnglish", async (req, res) => {
  const wordList = await Word.find();
  res.send(wordList)

})

///////  Get word list from German DB

app.get("/toGerman", async (req, res) => {
  const wordList = await GermanWords.find();
  res.send(wordList)

})

//////// API FOR GERMAN TRANSLATION

app.get("/toGerman/:word", async (req, res) => {
  console.log(req.url);

  const selectedWord = await GermanWords.find();

  const existedWord = selectedWord.find(
    (item) =>
      item.query &&
      item.query.toLowerCase() == req.params.word.toLowerCase()
  );

  if (existedWord) {
    console.log("coming From DB ------>");
    res.send(existedWord.german_word[0]);
  } else {
    axios(
      `https://petapro-translate-v1.p.rapidapi.com/?query=${req.params.word}&langpair=de-en`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "petapro-translate-v1.p.rapidapi.com",
          "x-rapidapi-key": process.env.RAPID_API_KEY,
        },
      }
    )
      .then((result) => {
        if (result.data[0]) {
          console.log("coming From API ------>");
          const foundWord = {
            german_word: result.data[0],
            query: req.params.word,
          };
          GermanWords.create(foundWord);
          res.send(result.data[0]);
        } else {
          res.status(400);
          res.send({
            l1_text: req.params.word,
            error: "Word not found",
          });
        }
      })

      .catch((err) => {
        Word.create({
          l1_text: req.params.word,
          error: err,
        });
        res.send({
          l1_text: req.params.word,
          error: err,
        });
      });
  }
});

/////////////// Login Start

// This middleware can be used to check if a user contains a valid token
function checkTokenMiddleware(req, res, next) {
  const tokenRaw = req.headers.authorization;
  console.log(`Token raw is: "${tokenRaw}""`);
  if (!tokenRaw) {
    return res.sendStatus(401);
  }

  const tokenToCheck = tokenRaw.split(" ")[1];
  console.log(`Token to check is: "${tokenToCheck}"`);
  if (!tokenToCheck) {
    return res.sendStatus(401);
  }

  const secret = process.env.SECRET;
  jwt.verify(tokenToCheck, secret, (error, payload) => {
    console.log("check password_____>", {
      error,
      payload,
    });
    if (error) {
      return res.status(400).send(error.message);
    }

    User.findById(payload.userId)
      .then((user) => {
        req.userData = {
          userId: user._id,
          username: user.username,
          admin: user.username === "admin",
        };
        next();
      })
      .catch((e) => {
        console.log(e);
        return res.status(400).send(error.message);
      });
  });
}

// This endpoint returns a fresh token
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({
      username,
    });
    const isPasswordCorrect = await compareHashes(password, user.password);

    if (!isPasswordCorrect) {
      res.status(400).send({
        message: "password is not valid",
      });
      return;
    }

    const payload = {
      userId: user._id,
    };
    const options = {
      expiresIn: "300000m",
    };
    const token = jwt.sign(payload, process.env.SECRET, options);
    res.send({token});
  } catch (e) {
    console.log(e);
    res.status(401).send({
      error: "Invalid credentials",
    });
  }
});

// This endpoint is used for registering a new user

app.post("/register", async (req, res) => {
  req.body.password = await hash(req.body.password);
  User.create(req.body)
    .then((user) => res.send(user))
    .catch((e) => {
      console.log(e);
      res.status(400).send(e);
    });
});

// This endpoint is secured; only requests with a valid token can access it

app.get("/secure", checkTokenMiddleware, (req, res) => {
  res.send(`Hooray, ${req.userData.username}, you have access`);
});

// This endpoint is secured; only requests with a valid token can access it
app.get("/users", checkTokenMiddleware, (req, res) => {
  User.find()
    .then((users) => {
      res.send(users);
    })
    .catch((e) => {
      console.log(e);
      res.status(400).send(e.message);
    });
});

/////////// LISTENING

const port = process.env.PORT || 5050;
app.listen(port, () => {
  console.log("Listening on http://localhost:" + port);
});
