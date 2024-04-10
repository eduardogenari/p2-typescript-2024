import fetch from 'node-fetch';


export class Article {
  constructor(
    public title: string,
    public description: string,
    public updatedDate: string,
    public multimediaUrl?: string 
  ) {}
}


export const loadNews = async (section: string) => {
  const apiKey = 'AIDCcnBkuVJo81RE4s2pS1mSSCmJWvDH'; 
  const url = `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${apiKey}`;
  
  try {
    const response = await fetch(url);
    const { results } = (await response.json()) as { results: any[] };

    const news: Array<Article> = [];
    for (const { title, abstract, updated_date, multimedia } of results) {
      const secondMultimedia = multimedia?.[1];

      const mappedNews = new Article(
        title,
        abstract,
        updated_date,
        secondMultimedia?.url 
      );
      news.push(mappedNews);
    }
    console.log(news);
    return news; 

  } catch (error) {
    console.error('Error fetching news:', error);
    throw error; 
  }

};
