import { notFoundError } from "../errors/not-found-error";
import customerRepository from "../repositories/customer-repository";

export async function createCustomer(name: string) {
    return customerRepository.createCustomer(name);
}

export async function checkCustomer(customerId: number) {
    const customer = await customerRepository.getCustomerById(customerId);
    if (!customer) throw notFoundError("NO_RIDES_FOUND", "Nenhum registro encontrado.");
    return customer;
}

const customerService = {
    createCustomer,
    checkCustomer
};
  
export default customerService;