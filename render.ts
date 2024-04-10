import { Article } from "./news.js";
import { writeFile } from "fs/promises";

/*
const head = (title: string) => `
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <link rel="shortcut icon" href="/imgs/nyt-favicon.png" type="image/x-icon">
  <style>
    body {
      margin: 0;
      padding: 0;
    }
    .article {
      font-family: nyt-imperial, serif;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: .4rem;
      border-bottom: 1px solid #ddd;
      background-color: red;
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
      font-family: nyt-imperial, serif;
    }
  </style>
</head>`;
*/

const head = (title: string) => `
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <link rel="shortcut icon" href="/imgs/nyt-favicon.png" type="image/x-icon">
  <link rel="stylesheet" href="./styles.css">  </head>`;


const articleHead = (title: string) => `
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - The New York Times</title>  
  <link rel="stylesheet" href="./detail.css">
  <style></style>
</head>`;


const renderNews = (news: Array<Article>, index: number) => {
  let html = "";
  for (let i = 0; i < news.length; i++) {
    const article = news[i];
    html += `<div class="article" id="article-${i}">
      <a href="./news/${index}.html">  <img src="${article.multimediaUrl}" />
      </a>
      <div class="data">
        <div class="name">${article.title}</div>
        <div class="email">${article.description}</div>
      </div>
    </div>`;
  }
  return html;
};


export const render = (news: Array<Article>) => {
  let html = "";
  for (let i = 0; i < news.length; i++) {
    const article = news[i];
    html += renderNews([article], i); // Wrap article in an array
  }
  return `
  <html>
    ${head("The New York Times")}
    <body>
      ${html}
    </body>
  </html>`;
};


const renderDetail = (article: Article) => {
  return `
  <html>
    ${articleHead(article.title)}
    <body>
      <h1>${article.title}</h1>
      <p>${article.description}</p>
      <img src="${article.multimediaUrl}" />
    </body>
  </html>`;
};


export async function createDetailPage(article: Article, index: number) {
  const detailHtml = await renderDetail(article);
  const detailFilePath = `news/${index}.html`; 
  await writeFile(detailFilePath, detailHtml);
}