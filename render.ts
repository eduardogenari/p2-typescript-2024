import { Article } from "./news.js";

const head = (title: string) => `
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
    }
    .article {
      font-family: sans-serif;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: .4rem;
      border-bottom: 1px solid #ddd;
    }
    .article img {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      margin-right: 0.7rem;
    }
    .article .name {
      font-weight: bold;
    }
    .article .email {
      font-family: monospace;
    }
  </style>
</head>`;


const renderNews = (news: Array<Article>) => {
  let html = "";
  for (const article of news) {
    html += `<div class="article">
      <img src="${article.multimediaUrl}" />
      <div class="data">
        <div class="name">${article.title}</div>
        <div class="email">${article.description}</div>
      </div>
    </div>`;
  }
  return html;
}


export const render = (news: Array<Article>) => {
  return `
<html>
  ${head("News List")}
  <body>
    ${renderNews(news)}
  </body>
</html>`;
};
