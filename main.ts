import { writeFile } from "fs/promises";
import { render } from "./render.js";
import { loadNews } from "./news.js";


const news = await loadNews('business');
const html = render(news);
await writeFile('index.html', html);