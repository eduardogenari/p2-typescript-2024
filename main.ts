import { writeFile } from "fs/promises";
import { render, createDetailPage } from "./render.js";
import { loadNews } from "./news.js";


const news = await loadNews('arts');
const html = render(news);
await writeFile('index.html', html);

for (let i = 0; i < news.length; i++) {
const article = news[i];
await createDetailPage(article, i); 
}

/*
sections for future filter:

arts
automobiles
books
business
fashion
food
health
home
insider
magazine
movies
nyregion
obituaries
opinion
politics
realestate
science
sports
sundayreview
technology
theater
t-magazine
travel
upshot
us
world
*/
