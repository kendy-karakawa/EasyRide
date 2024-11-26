import rideService from "../../src/services/ride-service";
import driverService from "../../src/services/driver-service";
import googleMapsApi from "../../src/integration/google-maps-api";
import rideRepository from "../../src/repositories/ride-repository";
import driverRepository from "../../src/repositories/driver-repository";
import { notFoundError } from "../../src/errors/not-found-error";
import { invalidDriverError } from "../../src/errors/invalid-driver-error";

jest.mock("../../src/services/driver-service");
jest.mock("../../src/integration/google-maps-api", () => ({
    getRoutes: jest.fn(),
}));
jest.mock("../../src/repositories/ride-repository");
jest.mock("../../src/repositories/driver-repository");


describe("Ride Service - confirmRide", () => {
    it("deve confirmar uma corrida com sucesso", async () => {
      const mockData = {
        customer_id: "1",
        origin: "teste",
        destination: "teste2",
        distance: 10,
        duration: 1,
        driver: {
          id: 1,
          name: "Homer Simpson"
        },
        value: 10
      };

      (driverService.checkDriver as jest.Mock).mockResolvedValue(undefined);
      (rideRepository.createRide as jest.Mock).mockResolvedValue(undefined);
  
      await expect(rideService.confirmRide(mockData)).resolves.not.toThrow();
  
      expect(driverService.checkDriver).toHaveBeenCalledWith(1, 10);
      expect(rideRepository.createRide).toHaveBeenCalledWith(mockData);
    });
});


describe("Ride Service - getEstimate", () => {
    it("deve retornar uma estimativa com rota e motoristas", async () => {
      (driverService.getAllDrivers as jest.Mock).mockResolvedValue([
        { id: 1, name: "John", description: "Good driver", car: "Sedan", rate: 50, minKm: 5 },
      ]);
  
      (googleMapsApi.getRoutes as jest.Mock).mockResolvedValue({
        routes: [
          {
            legs: [
              {
                startLocation: { latLng: { latitude: 10, longitude: 20 } },
                endLocation: { latLng: { latitude: 30, longitude: 40 } },
                distanceMeters: 10000,
                duration: "600s",
                polyline: { encodedPolyline: "mockedPolyline" },
              },
            ],
          },
        ],
      });
  
      const result = await rideService.getEstimate(1, "originAddress", "destinationAddress");
  
      expect(result).toEqual({
        origin: { latitude: 10, longitude: 20 },
        destination: { latitude: 30, longitude: 40 },
        distance: 10,
        duration: 600,
        routeResponse: "mockedPolyline",
        options: [
          { id: 1, name: "John", description: "Good driver", car: "Sedan", rate: 50, minKm: 5 },
        ],
      });
  
      expect(driverService.getAllDrivers).toHaveBeenCalledTimes(1);
      expect(googleMapsApi.getRoutes).toHaveBeenCalledWith("originAddress", "destinationAddress");
    });
});

describe("Ride Service - getRideHistory", () => {
    it("deve retornar todos os históricos de corridas de um cliente, quando o draiver_id for undefined", async () => {
      const mockRides = [
        {
          id: 1,
          timestamp: new Date("2024-01-01").getTime(),
          origin: "A",
          destination: "B",
          distance: 10,
          duration: 600,
          value: 50,
          driver: { id: 1, name: "John" },
        },
        {
          id: 2,
          timestamp: new Date("2024-02-01").getTime(),
          origin: "C",
          destination: "D",
          distance: 20,
          duration: 1200,
          value: 100,
          driver: { id: 2, name: "Jane" },
        },
      ];
  
      (rideRepository.getRidesByCustomerId as jest.Mock).mockResolvedValue(mockRides);
  
      const result = await rideService.getRideHistory(1, undefined);
  
      expect(result).toEqual({
        customer_id: 1,
        rides: [
          {
            id: 2,
            date: mockRides[1].timestamp,
            origin: "C",
            destination: "D",
            distance: 20,
            duration: 1200,
            value: 100,
            driver: { id: 2, name: "Jane" },
          },
          {
            id: 1,
            date: mockRides[0].timestamp,
            origin: "A",
            destination: "B",
            distance: 10,
            duration: 600,
            value: 50,
            driver: { id: 1, name: "John" },
          },
        ],
      });
  
      expect(rideRepository.getRidesByCustomerId).toHaveBeenCalledWith(1);
    });
    it("deve lançar um erro 'NO_RIDES_FOUND' quando não houver corridas, quando o draiver_id for undefined", async () => {
            
        (rideRepository.getRidesByCustomerId as jest.Mock).mockResolvedValue([]);
    
        await expect(rideService.getRideHistory(1, undefined)).rejects.toEqual(
            notFoundError("NO_RIDES_FOUND", "Nenhum registro encontrado.")
          )
    
    
        expect(rideRepository.getRidesByCustomerId).toHaveBeenCalledWith(1);
    });
    it("deve retornar o histórico de corridas de um clinte filtrada por motorista, quando o draiver_id for informado", async () => {
        const mockRides = [
          {
            id: 1,
            timestamp: new Date("2024-01-01").getTime(),
            origin: "A",
            destination: "B",
            distance: 10,
            duration: 600,
            value: 50,
            driver: { id: 1, name: "John" },
          }
        ];
    
        (driverRepository.getDriverById as jest.Mock).mockResolvedValue({ id: 1, name: "John", description: "Good driver", car: "Sedan", rate: 50, minKm: 5 });
        (rideRepository.getRidesByCustomerIdAndDriverId as jest.Mock).mockResolvedValue(mockRides);
    
        const result = await rideService.getRideHistory(1, 1);
    
        expect(result).toEqual({
          customer_id: 1,
          rides: [
            {
              id: 1,
              date: mockRides[0].timestamp,
              origin: "A",
              destination: "B",
              distance: 10,
              duration: 600,
              value: 50,
              driver: { id: 1, name: "John" },
            },
          ],
        });
    
        expect(driverRepository.getDriverById).toHaveBeenCalledWith(1);
        expect(rideRepository.getRidesByCustomerIdAndDriverId).toHaveBeenCalledWith(1,1);
    });
    it("deve lançar um erro 'invalidDriverError' quando o motorista não existir, quando o draiver_id for informado", async () => {
            
        (driverRepository.getDriverById as jest.Mock).mockResolvedValue(null);
    
        await expect(rideService.getRideHistory(1, 1)).rejects.toEqual(
            invalidDriverError()
          )
    
        expect(driverRepository.getDriverById).toHaveBeenCalledWith(1);
    });
    it("deve lançar um erro 'NO_RIDES_FOUND' quando não houver corridas, quando o draiver_id for informado", async () => {
        (driverRepository.getDriverById as jest.Mock).mockResolvedValue({
          id: 1,
          name: "John Doe",
        });
        (rideRepository.getRidesByCustomerIdAndDriverId as jest.Mock).mockResolvedValue([]);
    
        await expect(rideService.getRideHistory(1, 1)).rejects.toEqual(
          notFoundError("NO_RIDES_FOUND", "Nenhum registro encontrado.")
        );
    
        expect(driverRepository.getDriverById).toHaveBeenCalledWith(1);
        expect(rideRepository.getRidesByCustomerIdAndDriverId).toHaveBeenCalledWith(1, 1);
    });
});

