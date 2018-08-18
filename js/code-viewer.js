// Code highlighting JS
// TODOS (larissa - or liz, after bootcamp):
// - Add support for comments
// - Add support for numbers in variable names
// - Add support for arrow functions
// - Add support for template literals
const codeBlocks = Array.from(document.getElementsByTagName("code"));
const replacementMap = new Map([
  // white - punctuation
  // +, -, /, *, **, ^, &, |, <, >, {, }, [, ], ), ,, =
  [
    /[\+\-\/\*\^\&\|\<\>\{\}\[\]\)\,\=\;\{\}]/g,
    "<span class='cv-punctuation'>$&</span>"
  ],
  // dark blue - reserved words for declaring stuff
  // let, const, var, true, false, null, undefined, function
  [
    /let|const|var|true|false|null|undefined|function/g,
    "<span class='cv-keyword'>$&</span>"
  ],
  // yellow - global function names
  // functions are the thing after a space and end in a (
  [/\s\w+\(/g, "<span class='cv-function'>$&</span>"],
  // purple - control flow operators
  // if, else, for, while, return
  [/if|else|for|while|return/g, "<span class='cv-operator'>$&</span>"],
  // green - runtime objects
  // console, Object, Array
  [/console|Object|Array|Math/g, "<span class='cv-runtime'>$&</span>"],
  // red - strings
  // '', "", ``
  [/".*"/g, "<span class='cv-text'>$&</span>"],
  // red - strings
  // '', "", ``
  [/`.*`/g, "<span class='cv-text'>$&</span>"],
  // light green - numbers
  [/\d+/g, "<span class='cv-numeral'>$&</span>"],
  // yellow - method names - put at end (because of earlier regex)
  // methods are the thing after a . and end in a (
  [/\.\w+\(/g, "<span class='cv-function'>$&</span>"],
  // white - punctuation that needs to be put at the end (because of earlier regex)
  // ., (
  [/[\.\(]/g, "<span class='cv-punctuation'>$&</span>"]
]);

codeBlocks.forEach(block => {
  let updatedText = block.innerText;
  replacementMap.forEach((wrapperTemplate, regex) => {
    updatedText = updatedText.replace(regex, wrapperTemplate);
  });

  block.innerHTML = updatedText;
});
