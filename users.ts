import fetch from 'node-fetch';

export class User {
  constructor(
    public gender: "male" | "female",
    public name: {
      title: "Mr" | "Mrs";
      first: string;
      last: string;
    },
    public location: {
      street: string;
      city: string;
      state: string;
      country: string;
      postcode: number;
    },
    public login: {
      username: string;
      password: string;
    },
    public email: string,
    public picture: {
      large: string;
      medium: string;
      thumbnail: string;
    }
  ) {}

  get fullName() {
    return `${this.name.first} ${this.name.last}`;
  }
}


export class New {
  constructor(
    public title: string,
    public description: string,
    public updatedDate: string,
    public multimediaUrl?: string // Optional multimedia URL property
  ) {}
}



export const loadUsers = async (n: number) => {
  const response = await fetch(`https://randomuser.me/api?results=${n}`);
  const { results } = (await response.json()) as { results: any[] };
  const users: Array<User> = [];
  for (const { gender, name, location, login, email, picture } of results) {
    users.push(new User(gender, name, location, login, email, picture));
  }
  return users;
};


export const loadNews = async (section: string) => {
  const apiKey = 'AIDCcnBkuVJo81RE4s2pS1mSSCmJWvDH'; 
  const url = `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${apiKey}`;
  
  try {
    const response = await fetch(url);
    const { results } = (await response.json()) as { results: any[] };

    const news: Array<New> = [];
    for (const { title, abstract, updated_date, multimedia } of results) {
      const secondMultimedia = multimedia?.[1];

      const mappedNews = new New(
        title,
        abstract,
        updated_date,
        secondMultimedia?.url 
      );
      news.push(mappedNews);
    }

    console.log("news aqui");
    console.log(news);
    return news; 

  } catch (error) {
    console.error('Error fetching news:', error);
    throw error; 
  }

};


const newsData = await loadNews('business');
console.log("outro");
