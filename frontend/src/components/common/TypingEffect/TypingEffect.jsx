import { useEffect, useState } from 'react';

// Unfinished and experimental custom typing effect
// DO NOT USE IT YET!
const TypingEffect = (props) => {
  // const [character, setCharacters] = useState([]);
  const [currentString, setCurrentString] = useState('');

  const typeString = (string, period) => {};

  useEffect(() => {
    // Set the initial value of the typing effect
    // setCurrentString(props.initialValue);

    // Run the effect every 2.5 seconds
    const interval = setInterval(() => {
      // Iterate through the provided list of strings
      for (const string of props.strings) {
        // Iterate through each character
        for (const character of string) {
          setTimeout(() => {
            // console.log(string);
            setCurrentString('');
            setCurrentString(currentString + character);
          }, 1000);
        }
      }
    }, 500);

    // Cleanup
    return () => {
      clearInterval(interval);
    };
  }, [currentString]);

  return (
    <span>
      <p>{currentString}</p>
    </span>
  );
};

export default TypingEffect;
