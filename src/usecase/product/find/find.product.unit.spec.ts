import ProductFactory from "../../../domain/product/factory/product.factory";
import FindProductUseCase from "./find.product.usecase";

const product = ProductFactory.create("a", "Product1", 20);

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    update: jest.fn(),
  };
};

describe("Unit test find product use case", () => {
  it("should find a product", async () => {
    const productRepository = MockRepository();
    const usecase = new FindProductUseCase(productRepository);

    const output = await usecase.execute({id: product.id});

    expect(output).toEqual({
      id: product.id,
			name: product.name,
			price: product.price
    })
  });
});