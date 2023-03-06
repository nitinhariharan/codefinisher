import * as vscode from 'vscode';
import { Configuration, OpenAIApi } from "openai";
import { matchSearchPhrase } from './utils/matchSearchPhrase';
let str="";
const configuration = new Configuration({
    apiKey: 'your api key',
  });
  const openai = new OpenAIApi(configuration);

export function activate(_: vscode.ExtensionContext) {

    const provider: vscode.CompletionItemProvider = {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        provideInlineCompletionItems: async (document, position, context, token) => {

            const textBeforeCursor = document.getText(
                new vscode.Range(position.with(undefined, 0), position)
            );
            str=str+textBeforeCursor;
            console.log(textBeforeCursor);
            const match = matchSearchPhrase(textBeforeCursor);
            const items: any[] = [];

            if (match) {
                /*
                let rs;
                try {
            >       rs = await search(match.searchPhrase);
                    if (rs) {
                        items = rs.results.map(item => {
                            const output = `\n${match.commentSyntax} Source: ${item.sourceURL} ${match.commentSyntaxEnd}\n${item.code}`;
                            return {
                                text: output,
                                insertText: output,
                                range: new vscode.Range(position.translate(0, output.length), position)
                            };
                        });
                    }
                } catch (err: any) {
                    vscode.window.showErrorMessage(err.toString());
                }
                */
                let rs;
                try {
                    rs = match.searchPhrase;
                    console.log(rs);
                    if (rs) {



    const completion =  openai.createCompletion({
        model: "text-davinci-003",
        prompt: match.searchPhrase,
    max_tokens: 1024,
      });
      //console.log(completion);
      const output:any = (await completion).data.choices[0].text;
      //console.log(output);
      items[0] = {
        text: output,
        insertText: output,
        range: new vscode.Range(position.translate(0, output.length), position)

};
                    }
                } catch (err: any) {
                    vscode.window.showErrorMessage(err.toString());
                }
            }
            console.log(items);
            return {items};
        },

    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    vscode.languages.registerInlineCompletionItemProvider({pattern: "**"}, provider);
}

//const OPENAI_API_KEY: string = "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";

