import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import FindProductUseCase from "./find.product.usecase";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "../create/create.product.usecase";

describe("Integration test find product use case", () => {
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

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const createUsecase = new CreateProductUseCase(productRepository);
    const findUsecase = new FindProductUseCase(productRepository);

    const productToSave = {
      type: "a",
      name: "Product",
      price: 20
    };

    const savedProduct = await createUsecase.execute(productToSave);

    expect(savedProduct).toEqual({
      id: expect.any(String),
      name: productToSave.name,
      price: productToSave.price
    })

    const input = { id: savedProduct.id }

    const output = await findUsecase.execute(input);

    expect(output).toEqual({
      id: savedProduct.id,
      name: savedProduct.name,
      price: savedProduct.price
    })

  });
});