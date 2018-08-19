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
  [/[\.\(]/g, "<span class='cv-punctuation'>$&</span>"],
  [
    /<span class='cv-punctuation'>\/<\/span><span class='cv-punctuation'>\/<\/span>.*\n/g,
    "<span class='cv-comment'>$&</span>"
  ],
  // find comment type /* to */
  // find comment type
  // <span class='cv-punctuation'>/</span><span class='cv-punctuation'>*</span> to <span class='cv-punctuation'>*</span><span class='cv-punctuation'>/</span>
  [
    /<span class='cv-punctuation'>\/<\/span><span class='cv-punctuation'>\*<\/span>.*<span class='cv-punctuation'>\*<\/span><span class='cv-punctuation'>\/<\/span>/g,
    "<span class='cv-comment'>$&</span>"
  ]
]);

codeBlocks.forEach(block => {
  let updatedText = block.innerText;
  replacementMap.forEach((wrapperTemplate, regex) => {
    updatedText = updatedText.replace(regex, wrapperTemplate);
  });

  // Remove the punctuation wrappers from the /* and */ inside the comment
  const commentRegex = /<span class='cv-comment'><span class='cv-punctuation'>\/<\/span><span class='cv-punctuation'>\*<\/span>(.*)<span class='cv-punctuation'>\*<\/span><span class='cv-punctuation'>\/<\/span><\/span>/g;
  updatedText = updatedText.replace(commentRegex, (match, inside) =>
    withoutInnerTags(match, inside, "<span class='cv-comment'>/* $$$ */</span>")
  );

  // Remove the punctuation wrappers from the // inside the comment
  const unwrappedCommentRegex = /<span class='cv-punctuation'>\/<\/span><span class='cv-punctuation'>\/<\/span>(.*\n)/g;
  updatedText = updatedText.replace(unwrappedCommentRegex, (match, inside) =>
    withoutInnerTags(match, inside, "<span class='cv-comment'>// $$$</span>")
  );

  block.innerHTML = updatedText;
});

function withoutInnerTags(match, inside, template) {
  const DELIMITER = "$$$";
  const replacementRegex = /(<span class='cv-.*?'>.*?<\/span>)/g;
  const nextInside = inside.replace(replacementRegex, function(
    match,
    ...matches
  ) {
    const replacementInsideRegex = /<span class='cv-.*?'>(.*?)<\/span>/g;
    return match.replace(replacementInsideRegex, (match, window) => window);
  });

  const [prefix, suffix] = template.split(DELIMITER);
  return `${prefix}${nextInside}${suffix}`;
}
