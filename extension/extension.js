const vscode = require("vscode");
const path = require("path");
const { pathToFileURL } = require("url");

// Load keywords from the shared dictionary so the completion list stays in sync.
function loadKeywords() {
  const dictionaryPath = pathToFileURL(
    path.join(__dirname, "..", "src", "dictionary.js")
  ).href;

  return import(dictionaryPath)
    .then(({ dict }) => {
      const set = new Set();

      Object.values(dict || {}).forEach((category) => {
        Object.keys(category || {}).forEach((key) => {
          if (key !== "-") {
            set.add(key);
          }
        });
      });

      return Array.from(set);
    })
    .catch((err) => {
      console.error("Failed to load GachiScript keywords:", err);
      return [];
    });
}

function activate(context) {
  const keywordsPromise = loadKeywords();

  const provider = vscode.languages.registerCompletionItemProvider("gachi", {
    provideCompletionItems() {
      return keywordsPromise.then((keywords) =>
        keywords.map(
          (k) => new vscode.CompletionItem(k, vscode.CompletionItemKind.Keyword)
        )
      );
    },
  });

  context.subscriptions.push(provider);
}

function deactivate() {}

module.exports = { activate, deactivate };
