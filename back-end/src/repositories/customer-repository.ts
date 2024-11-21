import { prisma } from "../configs/database";

async function createCustomer(name: string) {
    return await prisma.customer.create({
        data: {
            name: name
        }
    });
};

async function getCustomerById(customerId:number) {
    return await prisma.customer.findFirst({
        where: {
            id: customerId
        }
    });
};


const customerRepository = {
    createCustomer,
    getCustomerById
};

export default customerRepository;