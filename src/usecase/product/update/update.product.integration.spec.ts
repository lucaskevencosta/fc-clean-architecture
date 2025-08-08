import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "../create/create.product.usecase";
import ProductUpdateUsecase from "./update.product.usecase";

describe("Integration test update product", () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true }
    });
    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should update product", async () => {
    const productRepository = new ProductRepository();
    const saveUsecase = new CreateProductUseCase(productRepository);

    const productToSave = {
			type: "a",
			name: "Product",
			price: 20
		};

		const saveOutput = await saveUsecase.execute(productToSave);

		expect(saveOutput).toEqual({
			id: expect.any(String),
			name: productToSave.name,
			price: productToSave.price
		})

    const usecase = new ProductUpdateUsecase(productRepository);
    const input  = {
			id: saveOutput.id,
			name: "ProductA",
			price: 25
		};

    const output = await usecase.execute(input);

    expect(output).toEqual({
      id: input.id,
      name: input.name,
      price: input.price
    });
  });
});