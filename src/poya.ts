const oHttp = new XMLHttpRequest();
oHttp.open("POST", "https://api.openai.com/v1/completions");
oHttp.setRequestHeader("Accept", "application/json");
oHttp.setRequestHeader("Content-Type", "application/json");
oHttp.setRequestHeader("Authorization", "Bearer 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");

oHttp.onreadystatechange = function () {
  if (oHttp.readyState === 4) {
    let oJson: any = {};
    try {
      oJson = JSON.parse(oHttp.responseText);
    } catch (ex) {
      console.log(ex);
    }

    if (oJson.error && oJson.error.message) {
        console.log("errot");
    } else if (oJson.choices && oJson.choices[0].text) {
      const s: string = oJson.choices[0].text;
      console.log(s);
    }
  }
};


const data = {
  model: "text-davinci-003",
  prompt: "hello world in javascript",
  max_tokens: 2048,
  user: "1",
  temperature: 0.8,
  frequency_penalty: 0.0, // Number between -2.0 and 2.0
  // Positive values decrease the model's likelihood
  // to repeat the same line verbatim.
  presence_penalty: 0.0, // Number between -2.0 and 2.0.
  // Positive values increase the model's likelihood
  // to talk about new topics.
  stop: ["#", ";"], // Up to 4 sequences where the API will stop
  // generating further tokens. The returned text
  // will not contain the stop sequence.
};

oHttp.send(JSON.stringify(data));
