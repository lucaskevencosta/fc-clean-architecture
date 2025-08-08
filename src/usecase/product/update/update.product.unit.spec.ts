import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductUpdateUsecase from "./update.product.usecase";

const product = ProductFactory.create("a", "ProductA", 20);

const input = {
  id: product.id,
  name: "Product1",
  price: 25
}

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    update: jest.fn(),
  };
};

describe("Unit test for product update use case", () => {
  it("should update a product", async () => {
    const productRepository = MockRepository();
    const usecase = new ProductUpdateUsecase(productRepository);

    const output = await usecase.execute(input);

    expect(output).toEqual(input);
  });
});