import fetch from 'node-fetch';


export class Article {
  constructor(
    public title: string,
    public description: string,
    public updatedDate: string,
    public multimediaUrl?: string,
    public caption?: string,
    public copyright?: string
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
      let caption = secondMultimedia.caption;;
      let copyright = secondMultimedia.copyright;
      
      const mappedNews = new Article(
        title,
        abstract,
        updated_date,
        secondMultimedia?.url,
        caption,
        copyright
      );
      news.push(mappedNews);
    }
    return news; 

  } catch (error) {
    console.error('Error fetching news:', error);
    throw error; 
  }

};
