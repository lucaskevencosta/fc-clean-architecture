import CreateProductUseCase from "./create.product.usecase";

const input = {
	type: "a",
	name: "Product",
	price: 20
};

const MockRepository = () => {
	return {
		create: jest.fn(),
		findAll: jest.fn(),
		find: jest.fn(),
		update: jest.fn(),
	};
};

describe("Unit test create product use case", () => {
	it("Should create a product", async () => {
		const productRepository = MockRepository();
		const usecase = new CreateProductUseCase(productRepository);

		const output = await usecase.execute(input);

		expect(output).toEqual({
			id: expect.any(String),
			name: input.name,
			price: input.price
		});
	});

	it("Should throw exception em type not supported", async () => {
		const productRepository = MockRepository();
		const usecase = new CreateProductUseCase(productRepository);

		input.type = "c"

		await expect(usecase.execute(input)).rejects.toThrow("Product type not supported");
	});
});