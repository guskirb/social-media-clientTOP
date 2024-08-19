import { Fragment } from "react/jsx-runtime";

export const urlifyString = (text: string) => {
  const URL_REGEX = /(https?:\/\/[^\s]+)/g;
  let parsedString = new DOMParser().parseFromString(text, "text/html")
    .documentElement.textContent;
  let words = parsedString!.split(" ");

  return (
    <p className="whitespace-pre-line">
      {words.map((word, index) => (
        <Fragment key={index}>
          {word.match(URL_REGEX) ? (
            <>
              <span
                className="string_url"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.location.href = word;
                }}
              >
                {word}
              </span>{" "}
            </>
          ) : (
            word + " "
          )}
        </Fragment>
      ))}
    </p>
  );
};
