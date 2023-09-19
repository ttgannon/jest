/** Command-line tool to generate Markov text. */

function generateText(text) {
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText());
  }

  function makeText(path) {
    fs.readFile(path, "utf8", function cb(err, data) {
      if (err) {
        console.error(`Cannot read file: ${path}: ${err}`);
        process.exit(1);
      } else {
        generateText(data);
      }
    });
  
  }

async function makeTextURL(url) {
    let response;
    try {
      response = await axios.get(url);
    } catch (err) {
      console.error(`Error: ${url}: ${err}`);
      process.exit(1);
    }
    generateText(response.data)
  }

  let [method, path] = process.argv.slice(2);

  if (method === "file") {
    makeText(path);
  }
  
  else if (method === "url") {
    makeTextURL(path);
  }
  
  else {
    console.error(`Unknown method: ${method}`);
    process.exit(1);
  }