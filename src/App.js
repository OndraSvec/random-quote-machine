import React, {useState, useEffect} from 'react';
import './App.scss';
import COLORS_ARRAY from "./colorsArray";
import { FaLockOpen, FaTwitter } from "react-icons/fa";
import { RiDoubleQuotesL } from "react-icons/ri";
import { motion } from "framer-motion";

function App() {
  const [quote, setQuote] = useState("When I was 5 years old, my mother always told me that happiness was the key to life. When I went to school, they asked me what I wanted to be when I grew up. I wrote down 'happy'. They told me I didn't understand the assignment, and I told them they didn't understand life.");
  const [author, setAuthor] = useState("John Lennon");
  const [quotesArray, setQuotesArray] = useState(null);
  const [colorTheme, setColorTheme] = useState("#077db0");

  let quoteDBUrl = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"

  const fetchQuotes = async(url) => {
    const response = await fetch(url);
    const parsedJSON = await response.json();
    setQuotesArray(parsedJSON.quotes);
  }
  useEffect(() => {
   fetchQuotes(quoteDBUrl)
  }, [quoteDBUrl]);

  const getRandomQuote = () => {
    let randomInt = Math.floor(quotesArray.length * Math.random());
    setQuote(quotesArray[randomInt].quote);
    setAuthor(quotesArray[randomInt].author);
    setColorTheme(COLORS_ARRAY[randomInt]);
  }

  return (
    <div className="App">
      <motion.header className="App-header" animate={{backgroundColor: colorTheme}} transition={{type: "tween", duration: 1}}>
        <div id="quote-box">
          <motion.p id="text" initial={{color: colorTheme, opacity: 0.1}} animate={{color: colorTheme, opacity: 1}} transition={{type: "tween", duration: 1}}>
            <RiDoubleQuotesL /> {quote}
          </motion.p>
          <motion.p id="author" initial={{color: colorTheme, opacity: 0.1}} animate={{color: colorTheme, opacity: 1}} transition={{type: "tween", duration: 1}}>
            - {author}
          </motion.p>
          <div className='button-container'>
            <motion.button id="twitter-button" initial={{backgroundColor: colorTheme, color: 'white', opacity: 0.1}} animate={{backgroundColor: colorTheme, color: 'white', opacity: 1}} transition={{type: "tween", duration: 1}}><a id="tweet-quote" href={encodeURI(`http://www.twitter.com/intent/tweet?text=${quote} - ${author}`)} target="_blank"><FaTwitter id="twitter-icon"/></a></motion.button>
            <motion.button id="new-quote" onClick={() => getRandomQuote()} initial={{backgroundColor: colorTheme, color: 'white', opacity: 0.1}} animate={{backgroundColor: colorTheme, color: 'white', opacity: 1}} transition={{type: "tween", duration: 1}}>New Quote</motion.button>  
          </div>
        </div>
      </motion.header>
    </div>
  );
}

export default App;
