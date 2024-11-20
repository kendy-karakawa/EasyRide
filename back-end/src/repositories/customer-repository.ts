import { prisma } from "../configs/database";

async function createCustomer(name: string) {
    return await prisma.customer.create({
        data: {
            name: name
        }
    });
};


const customerRepository = {
    createCustomer
};

export default customerRepository;