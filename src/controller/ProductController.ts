import { Request, Response } from 'express'
import Product from '../model/Product'
import Category from '../model/Category'

class ProductController {
  static async createProduct(req: Request, res: Response) {
    try {
      const category = await Category.findOne({
        _id: req.body.category,
        user: req.user.sub,
      })

      if (!category) {
        return res.status(400).send('Categoria não existe para o usuário !')
      }

      req.body.user = req.user.sub

      const product = new Product(req.body)

      await product.save()

      res.status(201).send('Produto cadastrado com sucesso !')
    } catch (error) {
      res.status(500).send({ message: 'Internal Server Error', error: error })
    }
  }

  static async getAllProducts(req: Request, res: Response) {
    try {
      const products = await Product.find({ user: req.user.sub })
        .populate({ path: 'category', select: 'name' })
        .exec()

      res.status(200).json(products)
    } catch (error) {
      res.status(500).send({ message: 'Internal Server Error', error: error })
    }
  }

  static async getProductById(req: Request, res: Response) {
    try {
      const product = await Product.findOne({
        _id: req.params.id,
        user: req.user.sub,
      }).populate({ path: 'category', select: 'name' })

      if (!product) {
        return res.status(404).send('Produto não encontrado !')
      }

      res.status(200).json(product)
    } catch (error) {
      res.status(500).send({ message: 'Internal Server Error', error: error })
    }
  }

  static async updateProduct(req: Request, res: Response) {
    try {
      const category = await Category.findOne({
        _id: req.body.category,
        user: req.user.sub,
      })

      if (!category) {
        return res.status(400).send('Categoria não existe para o usuário')
      }
      const product = await Product.findOneAndUpdate(
        {
          _id: req.params.id,
          user: req.user.sub,
        },
        req.body
      )

      if (!product) {
        return res.status(404).send('Produto não encontrada !')
      }

      res.status(200).send('Produto alterado com sucesso !')
    } catch (error) {
      res.status(500).send({ message: 'Internal Server Error', error: error })
    }
  }

  static async deleteProduct(req: Request, res: Response) {
    try {
      const product = await Product.findOneAndDelete(
        {
          _id: req.params.id,
          user: req.user.sub,
        },
        req.body
      )

      if (!product) {
        return res.status(404).send('Produto não encontrado !')
      }

      res.status(200).send('Produto deletado com sucesso !')
    } catch (error) {
      res.status(500).send({ message: 'Internal Server Error', error: error })
    }
  }
}

export default ProductController
