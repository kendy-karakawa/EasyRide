import { notFoundError } from '../../src/errors/not-found-error';
import { invalidDistanceError } from '../../src/errors/invalid-distance-error';
import driverRepository from '../../src/repositories/driver-repository';
import driverService from '../../src/services/driver-service';

jest.mock("../../src/repositories/driver-repository");

const mockedDriverRepository = driverRepository as jest.Mocked<typeof driverRepository>;

describe("Driver Service - checkDriver", () => {
  it("deve lançar um erro de 'DRIVER_NOT_FOUND' quando o motorista não for encontrado", async () => {
    mockedDriverRepository.getDriverById.mockResolvedValue(null);

    await expect(driverService.checkDriver(1, 10)).rejects.toEqual(
      notFoundError("DRIVER_NOT_FOUND", "Motorista não encontrado.")
    );

    expect(mockedDriverRepository.getDriverById).toHaveBeenCalledWith(1);
  });

  it("deve lançar um erro de 'invalidDistanceError' quando a distância for menor que a mínima", async () => {
    mockedDriverRepository.getDriverById.mockResolvedValue({ id: 1, name: "teste", description: "teste", car: "teste", rate: 1, minKm: 20, });

    await expect(driverService.checkDriver(1, 10)).rejects.toEqual(
      invalidDistanceError()
    );

    expect(mockedDriverRepository.getDriverById).toHaveBeenCalledWith(1);
  });

  it("não deve lançar erro quando o motorista for encontrado e a distância for válida", async () => {
    mockedDriverRepository.getDriverById.mockResolvedValue({ id: 1, name: "teste", description: "teste", car: "teste", rate: 1, minKm: 1, });

    await expect(driverService.checkDriver(1, 10)).resolves.not.toThrow();

    expect(mockedDriverRepository.getDriverById).toHaveBeenCalledWith(1);
  });
});

describe("Driver Service - getAllDrivers", () => {
  it("deve retornar os motoristas formatados corretamente", async () => {
    const mockDrivers = [
       {
        id: 1,
        name: "John Doe",
        description: "Experienced driver",
        car: "Sedan",
        rate: 100,
        minKm: 10,
        review: {
            id: 1,
            rating: 4.5,
            comment: "Great service" ,
            driverId: 1
        },
      }
    ];

    mockedDriverRepository.findAll.mockResolvedValue(mockDrivers);

    const result = await driverService.getAllDrivers();

    expect(result).toEqual([
      {
        id: 1,
        name: "John Doe",
        description: "Experienced driver",
        vehicle: "Sedan",
        review: {
          rating: 4.5,
          comment: "Great service",
        },
        value: 100,
        minKm: 10,
      },
    ]);

    expect(mockedDriverRepository.findAll).toHaveBeenCalledTimes(1);
  });
});



