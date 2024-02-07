import * as fs from "fs/promises"

  class ProductManager {
  constructor() {
    this.path = './src/data/produtos.json'
  }

  async addProduct(productData) {
    const products = await this.getProductsFromFile();
    
    // Validação dos campos obrigatórios
    const requiredFields = ['title', 'description', 'price', 'thumbnail', 'code', 'stock'];
    if (!requiredFields.every(field => productData[field])) {
      console.error("Erro de cadastro: Todos os campos são obrigatórios para cadastrar qualquer produto.");
      return;
    }

    // Incremento automático do ID
    const productId = products.length + 1;

    // Criação do objeto produto
    const newProduct = {
      id: productId,
      title: productData.title,
      description: productData.description,
      price: productData.price,
      thumbnail: productData.thumbnail,
      code: productData.code,
      stock: productData.stock,
    };

    // Adiciona o produto ao array
    products.push(newProduct)
    

    // Salva o array atualizado no arquivo
    await this.saveProductsToFile(products);

    console.log("Produto adicionado com sucesso:", newProduct);
  }

  async getProducts() {
    return await this.getProductsFromFile();
  }

  async getProductById(productId) {
    const products = await this.getProductsFromFile();
    const foundProduct = products.find(product => product.id === productId);

    if (foundProduct) {
      console.log("Produto encontrado:", foundProduct);
    } else {
      console.error(`Produto com Id:${productId} não encontrado`);
    }

    return foundProduct;
  }

  async updateProduct(productId, updatedProductData) {
    const products = await this.getProductsFromFile();
    const index = products.findIndex(product => product.id === productId);

    if (index !== -1) {
      // Atualiza o produto no array
      products[index] = { ...products[index], ...updatedProductData };

      // Salva o array atualizado no arquivo
      await this.saveProductsToFile(products);

      console.log("Produto atualizado com sucesso:", products[index]);
    } else {
      console.error(`Produto com Id:${productId} não encontrado`);
    }
  }

  async deleteProduct(productId) {
    const products = await this.getProductsFromFile();
    const index = products.findIndex(product => product.id === productId);

    if (index !== -1) {
      // Remove o produto do array
      const deletedProduct = products.splice(index, 1)[0];

      // Salva o array atualizado no arquivo
      await this.saveProductsToFile(products);

      console.log("Produto deletado com sucesso:", deletedProduct);
    } else {
      console.error(`Produto com Id:${productId} não encontrado`);
    }
  }

  async getProductsFromFile() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      // Se o arquivo não existir, retorna um array vazio
      return [];
    }
  }

  async saveProductsToFile(products) {
    await fs.writeFile(this.path, JSON.stringify(products, null, 2), 'utf-8');
  }
}

// Exemplo de uso
 /* const productManager = new ProductManager('./data/produtos.json');

  productManager.addProduct({
  id: 1,
  title: "Produto novo",
  description: "Descrição do Produto 1",
  price: 19.99,
  thumbnail: "/path/to/image1.jpg",
  code: "P1",
  stock: 50,
});  */
 

//productManager.getProductById(1); // Produto encontrado
//productManager.getProductById(3); // Produto não encontrado

//productManager.updateProduct(2, { price: 55 }); // Produto atualizado
//productManager.deleteProduct(3); // P */


export default ProductManager;