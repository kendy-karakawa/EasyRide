import { prisma } from "../configs/database";

async function getDriverById (driverId: number) {
    return prisma.driver.findFirst({
        where: {
            id: driverId
        }
    })
};

async function findAll() {
    return await prisma.driver.findMany({
        include: {
            review: true
        }
    })
}


const driverRepository = {
    getDriverById,
    findAll
};

export default driverRepository;