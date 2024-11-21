import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Criando motoristas com avaliações associadas
  const homer = await prisma.driver.create({
    data: {
      name: "Homer Simpson",
      description:
        "Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).",
      car: "Plymouth Valiant 1973 rosa e enferrujado",
      rate: 2.5,
      minKm: 1,
      review: {
        create: {
          rating: 2.0,
          comment: "Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.",
        },
      },
    },
  });

  const dominic = await prisma.driver.create({
    data: {
      name: "Dominic Toretto",
      description:
        "Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.",
      car: "Dodge Charger R/T 1970 modificado",
      rate: 5.0,
      minKm: 5,
      review: {
        create: {
          rating: 4.0,
          comment:
            "Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!",
        },
      },
    },
  });

  const james = await prisma.driver.create({
    data: {
      name: "James Bond",
      description: "Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.",
      car: "Aston Martin DB5 clássico",
      rate: 10.0,
      minKm: 10,
      review: {
        create: {
          rating: 5.0,
          comment:
            "Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.",
        },
      },
    },
  });

  console.log("Motoristas e avaliações criados com sucesso!");
}


main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
