const vscode = require("vscode");

const keywords = [];

function activate(context) {
  const provider = vscode.languages.registerCompletionItemProvider("gachi", {
    provideCompletionItems() {
      return keywords.map(
        (k) => new vscode.CompletionItem(k, vscode.CompletionItemKind.Keyword)
      );
    },
  });
  context.subscriptions.push(provider);
}

function deactivate() {}

module.exports = { activate, deactivate };
