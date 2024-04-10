import { writeFile } from "fs/promises";
import { render, createDetailPage } from "./render.js";
import { loadNews } from "./news.js";


const news = await loadNews('business');
const html = render(news);
await writeFile('index.html', html);


for (let i = 0; i < news.length; i++) {
const article = news[i];
await createDetailPage(article, i); 
}
