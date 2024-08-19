export function getLink(text: string) {
  const LINK_REGEX =
    /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(?:-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|live\/|v\/)?)([\w\-]+)(\S+)?$/;
  let parsedString = new DOMParser().parseFromString(text, "text/html")
    .documentElement.textContent;
  let words = parsedString!.split(" ");
  let link = words.find((word) => word.match(LINK_REGEX));

  return link ? link : false;
}
