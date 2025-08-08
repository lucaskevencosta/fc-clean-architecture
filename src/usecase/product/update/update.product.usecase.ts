import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputUpdateProductDto, OutputUpdateProductDto } from "./update.product.dto";

export default class ProductUpdateUsecase {
  private productRepository: ProductRepositoryInterface;
  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(input: InputUpdateProductDto): Promise<OutputUpdateProductDto> {
    const product = await this.productRepository.find(input.id);
    const productToSave = ProductFactory.createTypeAWithId(product.id, input.name, input.price);
    await this.productRepository.update(productToSave);
    return {
      id: productToSave.id,
      name: productToSave.name,
      price: productToSave.price
    }
  }
}