import express, { Request, Response } from "express";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import ListProductUsecase from "../../../usecase/product/list/list.product.usecase";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
    const repository = new ProductRepository();
    const usecase = new CreateProductUseCase(repository);

    try {
        const input = {
            type: req.body.type,
            name: req.body.name,
            price: req.body.price,
        };

        const output = await usecase.execute(input);
        res.send(output);
    } catch (error) {
        res.status(500).send(error);
    }
});

productRoute.get("/", async (req: Request, res: Response) => {
    const repository = new ProductRepository();
    const usecase = new ListProductUsecase(repository);

    try {
        res.send(await usecase.execute({}));
    } catch (error) {
        res.status(500).send(error);
    }
});