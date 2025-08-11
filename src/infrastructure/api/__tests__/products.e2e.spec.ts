import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        type: "a",
        name: "Produto 1",
        price: 10
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Produto 1");
    expect(response.body.price).toBe(10);
  });

  it("should not create a product", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        type: "c",
        name: "Produto 1",
        price: 10
      });

    expect(response.status).toBe(500);
  });

  it("should list all products", async () => {
    const productResponse = await request(app)
      .post("/product")
      .send({
        type: "a",
        name: "Produto 1",
        price: 10
      });
    expect(productResponse.status).toBe(200)

    const product2Response = await request(app)
      .post("/product")
      .send({
        type: "a",
        name: "Produto 2",
        price: 15
      });
    expect(product2Response.status).toBe(200)
    
    const response = await request(app).get("/product").send()
      
    expect(response.status).toBe(200)
    expect(response.body.products.length).toBe(2)
    
    const product1 = response.body.products[0];
    expect(product1.name).toBe("Produto 1");
    expect(product1.price).toBe(10);

    const product2 = response.body.products[1];
    expect(product2.name).toBe("Produto 2");
    expect(product2.price).toBe(15);
  });
});