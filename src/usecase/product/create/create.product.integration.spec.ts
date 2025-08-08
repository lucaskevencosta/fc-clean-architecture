import { Sequelize } from "sequelize-typescript";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";

describe("Integration test create product use case", () => {

	let sequileze: Sequelize;

	beforeEach(async () => {
		sequileze = new Sequelize({
			dialect: "sqlite",
			storage: ":memory:",
			logging: false,
			sync: { force: true },
		});
		sequileze.addModels([ProductModel]);
		await sequileze.sync();
	});

	afterEach(async () => {
		await sequileze.close();
	});

	it("should create a product", async () => {
		const productRepository = new ProductRepository();
		const usecase = new CreateProductUseCase(productRepository);

		const input = {
			type: "a",
			name: "Product",
			price: 20
		};

		const output = await usecase.execute(input);

		expect(output).toEqual({
			id: expect.any(String),
			name: input.name,
			price: input.price
		})

	});

	it("should throw an error em type not supported", async () => {
		const productRepository = new ProductRepository();
		const usecase = new CreateProductUseCase(productRepository);

		const input = {
			type: "c",
			name: "Product",
			price: 20
		};

		await expect(usecase.execute(input)).rejects.toThrow("Product type not supported");
	});
});