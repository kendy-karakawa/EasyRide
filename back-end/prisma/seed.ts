import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Criando motoristas
  const homer = await prisma.driver.create({
    data: {
      name: "Homer Simpson",
      description:
        "Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).",
      car: "Plymouth Valiant 1973 rosa e enferrujado",
      rating: 2.0, 
      rate: 2.5,
      minKm: 1,
    },
  });

  const dominic = await prisma.driver.create({
    data: {
      name: "Dominic Toretto",
      description:
        "Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.",
      car: "Dodge Charger R/T 1970 modificado",
      rating: 4.0, 
      rate: 5.0,
      minKm: 5,
    },
  });

  const james = await prisma.driver.create({
    data: {
      name: "James Bond",
      description: "Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.",
      car: "Aston Martin DB5 clássico",
      rating: 5.0, 
      rate: 10.0,
      minKm: 10,
    },
  });

  console.log("Motoristas criados com sucesso!");

  // Criando avaliações
  await prisma.review.createMany({
    data: [
      {
        rating: 2.0,
        comment: "Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.",
      },
      {
        rating: 4.0,
        comment:
          "Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!",
      },
      {
        rating: 5.0,
        comment:
          "Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.",
      },
    ],
  });

  console.log("Avaliações criadas com sucesso!");

  // Associando avaliações aos motoristas
  await prisma.driverRating.createMany({
    data: [
      {
        driverId: homer.id,
        reviewId: 1, // ID da avaliação para Homer
      },
      {
        driverId: dominic.id,
        reviewId: 2, // ID da avaliação para Dominic
      },
      {
        driverId: james.id,
        reviewId: 3, // ID da avaliação para James
      },
    ],
  });

  console.log("Avaliações associadas aos motoristas com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
