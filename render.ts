import { Article } from "./news.js";
import { writeFile } from "fs/promises";

const head = (title: string) => `
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Tinos:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
  <title>${title}</title>
  <link rel="shortcut icon" href="./imgs/nyt-favicon.png" type="image/x-icon">
  <link rel="stylesheet" href="./styles.css"> 
</head>`;


const articleHead = (title: string) => `
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Tinos:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
  <title>The New York Times</title>  
  <link rel="shortcut icon" href="../imgs/nyt-favicon.png" type="image/x-icon">
  <link rel="stylesheet" href="../styles.css"> 
</head>`;


const renderNews = (news: Array<Article>, index: number) => {
  let html = "";
  for (let i = 0; i < news.length; i++) {
    const article = news[i];
    html += `<a href="./news/${index}.html">  
      <div class="article" id="article-${i}">
        <img src="${article.multimediaUrl}" />
        <div class="data">
          <div class="title">${article.title}</div>
          <div class="description">${article.description}</div>
        </div>
      </div>
    </a>`;
  }
  return html;
};


export const render = (news: Array<Article>) => {
  let html = "";

  const header = `
    <header>
      <img src="./imgs/nyt-logo.png" alt="The New York Times" class="logo">
    </header>
  `;

  for (let i = 0; i < news.length; i++) {
    const article = news[i];
    html += renderNews([article], i);
  }

  return `
    <html>
      ${head("The New York Times")}
      <body>
        ${header}
        <div class="news-container">
          ${html}
        </div>
      </body>
    </html>
  `;
};


const renderDetail = (article: Article) => {
  return `
  <html>
    ${articleHead(article.title)}
    <body>
    <header class="logo-small">
    <img src="../imgs/nyt-logo.png" alt="The New York Times" class="logo">
    </header>
    <section>
      <h1>${article.title}</h1>
      <p>${article.description}</p>
      <img src="${article.multimediaUrl}" />
      <p class="caption">${article.caption}</p>
      <p>${article.copyright}</p>
      <p>${article.description} ${article.description} ${article.description} ${article.description} ${article.description}</p>
    </section>
    </body>
  </html>`;
};


export async function createDetailPage(article: Article, index: number) {
  const detailHtml = await renderDetail(article);
  const detailFilePath = `news/${index}.html`; 
  await writeFile(detailFilePath, detailHtml);
}