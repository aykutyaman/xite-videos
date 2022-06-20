const validData = {
  genres: [
    { id: 5, name: "Pop" },
    { id: 6, name: "Electronic/Dance" },
    { id: 8, name: "Rock" },
    { id: 13, name: "Country" },
    { id: 14, name: "Rap/Hip-Hop" },
    { id: 17, name: "Jazz" },
    { id: 24, name: "Latin" },
    { id: 25, name: "R&B/Soul" },
    { id: 26, name: "Holiday" },
    { id: 29, name: "Reggae" },
    { id: 45, name: "Alternative/Indie" },
    { id: 58, name: "Soundtracks" },
    { id: 59, name: "Hard Rock/Metal" },
    { id: 63, name: "Classical" },
    { id: 168, name: "Other/Non-Music" },
    { id: 1329, name: "Blues" },
    { id: 1337, name: "Children's" },
    { id: 9669, name: "Folk/Americana" },
    { id: 9670, name: "Regional Popular" },
    { id: 9671, name: "Religious/Spiritual" },
    { id: 9672, name: "World/Roots" },
  ],
  videos: [
    {
      id: 501437,
      artist: "Pants Velour",
      title: "All In",
      release_year: 2014,
      genre_id: 14,
      image_url:
        "https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/679a82b1e7110c16e14412f1debaa118c10078a9/images/501437/images/app/w522_h292.jpg",
    },
    {
      id: 501649,
      artist: "El Koala",
      title: "Veni paca to",
      release_year: 2014,
      genre_id: 8,
      image_url:
        "https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/679a82b1e7110c16e14412f1debaa118c10078a9/images/501649/images/app/w522_h292.jpg",
    },
    {
      id: 501895,
      artist: "Tom Petty and the Heartbreakers",
      title: "I Should Have Known It",
      release_year: 2010,
      genre_id: 8,
      image_url:
        "https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/679a82b1e7110c16e14412f1debaa118c10078a9/images/501895/images/app/w522_h292.jpg",
    },
    {
      id: 502139,
      artist: "Waka Flocka Flame",
      title: "Grove St. Party",
      release_year: 2011,
      genre_id: 6,
      image_url:
        "https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/679a82b1e7110c16e14412f1debaa118c10078a9/images/502139/images/app/w522_h292.jpg",
    },
    {
      id: 502992,
      artist: "Beyoncé",
      title: "Single Ladies (Put a Ring on It)",
      release_year: 2008,
      genre_id: 62,
      image_url:
        "https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/679a82b1e7110c16e14412f1debaa118c10078a9/images/502992/images/app/w522_h292.jpg",
    },
    {
      id: 503026,
      artist: "John Mayer",
      title: "Something Like Olivia",
      release_year: 2013,
      genre_id: 5,
      image_url:
        "https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/679a82b1e7110c16e14412f1debaa118c10078a9/images/503026/images/app/w522_h292.jpg",
    },
    {
      id: 503037,
      artist: "Olly Murs",
      title: "Army of Two",
      release_year: 2013,
      genre_id: 5,
      image_url:
        "https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/679a82b1e7110c16e14412f1debaa118c10078a9/images/503037/images/app/w522_h292.jpg",
    },
    {
      id: 503130,
      artist: "Olly Murs ft. Travie McCoy",
      title: "Wrapped Up",
      release_year: 2014,
      genre_id: 1,
      image_url:
        "https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/679a82b1e7110c16e14412f1debaa118c10078a9/images/503130/images/app/w522_h292.jpg",
    },
    {
      id: 503345,
      artist: "Fielfraz",
      title: "Personal Jesus",
      release_year: 1991,
      genre_id: 8,
      image_url:
        "https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/679a82b1e7110c16e14412f1debaa118c10078a9/images/503345/images/app/w522_h292.jpg",
    },
    {
      id: 503423,
      artist: "Djavan",
      title: "Om",
      release_year: 2014,
      genre_id: 5,
      image_url:
        "https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/679a82b1e7110c16e14412f1debaa118c10078a9/images/503423/images/app/w522_h292.jpg",
    },
    {
      id: 503546,
      artist: "Olly Murs ft. Demi Lovato",
      title: "Up",
      release_year: 2014,
      genre_id: 5,
      image_url:
        "https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/679a82b1e7110c16e14412f1debaa118c10078a9/images/503546/images/app/w522_h292.jpg",
    },
    {
      id: 503677,
      artist: "School is Cool",
      title: "Envelop Me",
      release_year: 2014,
      genre_id: 45,
      image_url:
        "https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/679a82b1e7110c16e14412f1debaa118c10078a9/images/503677/images/app/w522_h292.jpg",
    },
    {
      id: 504038,
      artist: "Mini Mini Club",
      title: "Krasnoludki",
      release_year: 2005,
      genre_id: 5,
      image_url:
        "https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/679a82b1e7110c16e14412f1debaa118c10078a9/images/504038/images/app/w522_h292.jpg",
    },
    {
      id: 504282,
      artist: "Anthrax",
      title: "Got The Time",
      release_year: 1990,
      genre_id: 59,
      image_url:
        "https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/679a82b1e7110c16e14412f1debaa118c10078a9/images/504282/images/app/w522_h292.jpg",
    },
    {
      id: 504508,
      artist: "Tony Bennett",
      title: "Fly Me to the Moon (In Other Words) (Live)",
      release_year: 1994,
      genre_id: 17,
      image_url:
        "https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/679a82b1e7110c16e14412f1debaa118c10078a9/images/504508/images/app/w522_h292.jpg",
    },
    {
      id: 504733,
      artist: "Elizma Theron",
      title: "Trane",
      release_year: 2015,
      genre_id: 1,
      image_url:
        "https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/679a82b1e7110c16e14412f1debaa118c10078a9/images/504733/images/app/w522_h292.jpg",
    },
    {
      id: 504752,
      artist: "Joaquin Sabina",
      title: "Dieguitos y Mafaldas",
      release_year: 2015,
      genre_id: 24,
      image_url:
        "https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/679a82b1e7110c16e14412f1debaa118c10078a9/images/504752/images/app/w522_h292.jpg",
    },
    {
      id: 504791,
      artist: "Roupa Nova",
      title: "Cantar Faz Feliz o Coração",
      release_year: 2009,
      genre_id: 8,
      image_url:
        "https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/679a82b1e7110c16e14412f1debaa118c10078a9/images/504791/images/app/w522_h292.jpg",
    },
    {
      id: 504960,
      artist: "Death Destruction",
      title: "Dead Pilot",
      release_year: 2014,
      genre_id: 59,
      image_url:
        "https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/679a82b1e7110c16e14412f1debaa118c10078a9/images/504960/images/app/w522_h292.jpg",
    },
    {
      id: 505238,
      artist: "F.A.N.S.",
      title: "Besos",
      release_year: 2014,
      genre_id: 1,
      image_url:
        "https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/679a82b1e7110c16e14412f1debaa118c10078a9/images/505238/images/app/w522_h292.jpg",
    },
  ],
};

const invalidVideos = [
  {
    id: 866934,
    artist: "Kid3rd",
    title: 100,
    release_year: 2017,
    genre_id: 165,
    image_url:
      "https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/679a82b1e7110c16e14412f1debaa118c10078a9/images/866934/images/app/w522_h292.jpg",
  },
];

export { validData, invalidVideos };
