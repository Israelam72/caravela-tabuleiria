import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const games = [
  {
    name: "Catan",
    description:
      "Em Catan, você e seus amigos competem para colonizar uma ilha inexplorada. Colete recursos como madeira, tijolo, lã, trigo e minério para construir estradas, vilas e cidades. Negocie com outros jogadores para conseguir o que precisa e torne-se o senhor de Catan!",
    imageUrl:
      "https://cf.geekdo-images.com/W3Bsga_uLP9kO91gZ7H8yw__imagepage/img/M_3Vg1j2HlNgkv7PL5bsZQ2toYA=/fit-in/900x600/filters:no_upscale():strip_icc()/pic2419375.jpg",
    price: 35,
    minPlayers: 3,
    maxPlayers: 4,
    minAge: 10,
    duration: "60-120 min",
    category: "Estratégia",
    available: true,
  },
  {
    name: "Ticket to Ride",
    description:
      "Construa rotas de trem pelo continente e conecte cidades para marcar pontos. Colete cartas coloridas para reivindicar trechos no mapa e complete seus cartões de destino secretos. Um jogo elegante, acessível e viciante para toda a família!",
    imageUrl:
      "https://cf.geekdo-images.com/ZWJg0dCdrWHspVJym5GSkg__imagepage/img/E5HctMxDYIU5kpKnhEaJSSZu3ko=/fit-in/900x600/filters:no_upscale():strip_icc()/pic38668.jpg",
    price: 35,
    minPlayers: 2,
    maxPlayers: 5,
    minAge: 8,
    duration: "30-90 min",
    category: "Família",
    available: true,
  },
  {
    name: "Pandemia",
    description:
      "O mundo está à beira do colapso! Quatro doenças mortais se espalharam pelo globo e cabe a você e sua equipe de especialistas conter o surto antes que seja tarde demais. Jogue em cooperação com os outros jogadores para encontrar a cura das quatro doenças.",
    imageUrl:
      "https://cf.geekdo-images.com/S3ybV1LAp-8SnHIXLLjVqA__imagepage/img/aSWEiCStjkopQ0hKRW8yPuUCfmg=/fit-in/900x600/filters:no_upscale():strip_icc()/pic1534148.jpg",
    price: 35,
    minPlayers: 2,
    maxPlayers: 4,
    minAge: 8,
    duration: "45-60 min",
    category: "Cooperativo",
    available: true,
  },
  {
    name: "Dixit",
    description:
      "Use sua imaginação para descrever cartas com ilustrações surreais e poéticas. Um jogador narra uma carta com uma palavra, frase ou som; os demais escolhem cartas de suas mãos que combinem com a descrição. Um jogo lindo e criativo para todas as idades!",
    imageUrl:
      "https://cf.geekdo-images.com/UYMkIBVIBRrMW62U7RpYwg__imagepage/img/d9vj0DkDHhwpbBQYUqJ1e-Ax-fE=/fit-in/900x600/filters:no_upscale():strip_icc()/pic3483909.jpg",
    price: 30,
    minPlayers: 3,
    maxPlayers: 6,
    minAge: 8,
    duration: "30 min",
    category: "Criativo",
    available: true,
  },
  {
    name: "Carcassonne",
    description:
      "Construa o sul da França medieval peça por peça! A cada turno, um jogador coloca uma ficha de terreno e pode colocar um seguidor como cavaleiro, monge, fazendeiro ou ladrão. Pontue por cidades, estradas e mosteiros completos neste clássico dos jogos de colocação de peças.",
    imageUrl:
      "https://cf.geekdo-images.com/okelbP1pGzaFB34e3Gom2Q__imagepage/img/f_AGFZ8B0CXVZOHb5bLUP1XPnYs=/fit-in/900x600/filters:no_upscale():strip_icc()/pic6544250.jpg",
    price: 30,
    minPlayers: 2,
    maxPlayers: 5,
    minAge: 7,
    duration: "30-45 min",
    category: "Estratégia",
    available: true,
  },
  {
    name: "Codinomes",
    description:
      "Dois agentes-chefe competem para dar pistas de uma palavra que se relacionem com múltiplos cartões de agentes no tabuleiro, sem revelar os do time inimigo. Um jogo de palavras tenso e divertido, perfeito para grupos grandes. Quem vai decifrar os codinomes primeiro?",
    imageUrl:
      "https://cf.geekdo-images.com/F_KDEu0GjdClml8N7c8Imw__imagepage/img/7nEUCelWYdLv7T6hIDiH-K7rdQA=/fit-in/900x600/filters:no_upscale():strip_icc()/pic2582929.jpg",
    price: 25,
    minPlayers: 4,
    maxPlayers: 8,
    minAge: 10,
    duration: "15-30 min",
    category: "Festa",
    available: false,
  },
  {
    name: "7 Wonders",
    description:
      "Lidere uma das sete grandes cidades do mundo antigo e construa uma das Sete Maravilhas do Mundo! Ao longo de três eras, escolha cartas de uma mão passada entre jogadores para desenvolver sua civilização em ciência, comércio, exército e maravilhas arquitetônicas.",
    imageUrl:
      "https://cf.geekdo-images.com/RvFVTEpnbb4NM7k0IF8V7A__imagepage/img/mOzCfxN4hJLSQmSjHAOQFHJXL2A=/fit-in/900x600/filters:no_upscale():strip_icc()/pic860217.jpg",
    price: 35,
    minPlayers: 2,
    maxPlayers: 7,
    minAge: 10,
    duration: "30 min",
    category: "Estratégia",
    available: true,
  },
  {
    name: "Love Letter",
    description:
      "Um jogo de cartas elegante e minimalista em que você tenta entregar sua carta de amor à princesa antes de todos os outros. Com apenas 16 cartas, Love Letter combina deduções lógicas, blefe e um toque de sorte em partidas rápidas e emocionantes.",
    imageUrl:
      "https://cf.geekdo-images.com/BbRPTDclNnFzWLIQPmFLng__imagepage/img/RZmH3uG5XTtjHGdmTi21KFYH0Ho=/fit-in/900x600/filters:no_upscale():strip_icc()/pic1401448.jpg",
    price: 20,
    minPlayers: 2,
    maxPlayers: 4,
    minAge: 10,
    duration: "20 min",
    category: "Cartas",
    available: true,
  },
];

async function main() {
  console.log("Populando banco de dados com jogos de exemplo...");

  for (const game of games) {
    await prisma.game.upsert({
      where: { id: game.name.toLowerCase().replace(/\s+/g, "-") },
      update: game,
      create: { id: game.name.toLowerCase().replace(/\s+/g, "-"), ...game },
    });
  }

  console.log(`${games.length} jogos inseridos com sucesso!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
