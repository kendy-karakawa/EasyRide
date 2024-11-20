import { prisma } from "../configs/database";

async function getDriverById (driverId: number) {
    return prisma.driver.findFirst({
        where: {
            id: driverId
        }
    })
};


const driverRepository = {
    getDriverById
};

export default driverRepository;