import customerRepository from "../repositories/customer-repository";

export async function createCustomer(name: string) {
    return customerRepository.createCustomer(name);
}

const customerService = {
    createCustomer,
};
  
export default customerService;