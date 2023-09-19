/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    let chain = {}
    for (let i=0; i<this.words.length-1; i++) {
        if (this.words[i] in chain) {
          chain[this.words[i]].push(this.words[i+1]);
      } else {
          chain[this.words[i]] = [this.words[i+1]];
      }
      console.log(chain);
    }
    chain[this.words[this.words.length-1]]=[null]
  }


  /** return random text from chains */

  makeText(numWords = 50) {
    // TODO
      if (numWords) {
      let counter = 0;
      let chain = this.makeChains();
      let words = [];
      for (let word in chain) {
        words.push(word);
      }
      
      let index = Math.floor(Math.random() * words.length);
      let firstWord = words[index];
      
      let textChain = firstWord;

      while (counter < numWords) {
        let wordList = chain[firstWord]
        console.log(wordList);
        if (chain[firstWord][0] === null) {
            return textChain;
        }
        
        let index = Math.floor(Math.random() * wordList.length);
        let nextWord = wordList[index];
        textChain += ' ' + nextWord;
        firstWord = nextWord;
        counter += 1;
      };
      return textChain;
  };
}
}

module.exports = { MarkovMachine }