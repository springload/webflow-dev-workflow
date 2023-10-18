import React from "react";
import { createRoot } from "react-dom/client";

const App = ({ markup }) => {
  return (
    <div className="margin-small">
      <h2 className="heading-style-h3">This is a React Job Part</h2>
      <div class="padding-bottom padding-large"></div>
      <div className="text-wrapper-ad">
        <div dangerouslySetInnerHTML={markup} />
      </div>
    </div>
  );
};

const getResponseText = async () => {
  const response = await fetch(
    "https://thelumerymiddlewarefunctionsexternal.azurewebsites.net/api/JobPostingsTrigger?code=U7K/iDr2KvzAN0SQF3ygXjagEtXkBPI67CgY/MUq4AKr6w/iYyt3gQ==",
  );

  console.log(response);

  return await response.text();
};

const main = async () => {
  const responseText = await getResponseText();
  const markup = { __html: responseText };

  const root = createRoot(document.getElementById("react-root"));
  root.render(<App markup={markup} />);
};

main();
