import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUsecase from "./list.product.usecase";
import CreateProductUseCase from "../create/create.product.usecase";
import ProductFactory from "../../../domain/product/factory/product.factory";

describe("List products integration test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should list all products", async () => {
    const productRepository = new ProductRepository();
    const createUsecase = new CreateProductUseCase(productRepository);
    const inputProduct1 = {
			type: "a",
			name: "Product1",
			price: 12
		};
    const inputProduct2 = {
			type: "a",
			name: "Product2",
			price: 18
		};
    const product1 = await createUsecase.execute(inputProduct1);
    const product2 = await createUsecase.execute(inputProduct2);
    
    const usecase = new ListProductUsecase(productRepository);
    const output = await usecase.execute({});

    expect(output.products.length).toBe(2);
    expect(output.products[0].id).toBe(product1.id);
    expect(output.products[0].name).toBe(product1.name);
    expect(output.products[0].price).toBe(product1.price);
    expect(output.products[1].id).toBe(product2.id);
    expect(output.products[1].name).toBe(product2.name);
    expect(output.products[1].price).toBe(product2.price);
  });
});