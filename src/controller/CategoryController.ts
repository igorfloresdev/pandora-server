import { Request, Response } from 'express'
import Category from '../model/Category'

class CategoryController {
  static async createCategory(req: Request, res: Response) {
    try {
      const category = new Category({
        name: req.body.name,
        user: req.user.sub,
      })

      await category.save()

      res.status(201).send('Categoria cadastrada com sucesso !')
    } catch (error) {
      res.status(500).send({ message: 'Internal Server Error', error: error })
    }
  }

  static async getAllCategories(req: Request, res: Response) {
    try {
      const categories = await Category.find({ user: req.user.sub })

      res.status(200).json(categories)
    } catch (error) {
      res.status(500).send({ message: 'Internal Server Error', error: error })
    }
  }

  static async getCategoryById(req: Request, res: Response) {
    try {
      const categoria = await Category.findOne({
        _id: req.params.id,
        user: req.user.sub,
      })

      if (!categoria) {
        return res.status(404).send('Categoria não encontrada !')
      }

      res.status(200).json(categoria)
    } catch (error) {
      res.status(500).send({ message: 'Internal Server Error', error: error })
    }
  }

  static async updateCategory(req: Request, res: Response) {
    try {
      const categoria = await Category.findOneAndUpdate(
        {
          _id: req.params.id,
          user: req.user.sub,
        },
        req.body
      )

      if (!categoria) {
        return res.status(404).send('Categoria não encontrada !')
      }

      res.status(200).send('Categoria alterada com sucesso !')
    } catch (error) {
      res.status(500).send({ message: 'Internal Server Error', error: error })
    }
  }

  static async deleteCategory(req: Request, res: Response) {
    try {
      const categoria = await Category.findOneAndDelete(
        {
          _id: req.params.id,
          user: req.user.sub,
        },
        req.body
      )

      if (!categoria) {
        return res.status(404).send('Categoria não encontrada !')
      }

      res.status(200).send('Categoria deletada com sucesso !')
    } catch (error) {
      res.status(500).send({ message: 'Internal Server Error', error: error })
    }
  }
}

export default CategoryController
