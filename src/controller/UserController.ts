import { Request, Response } from 'express'
import User from '../model/User'
import { generateHash, compareHash } from '../lib/bcrypt'
import jwt from 'jsonwebtoken'

class UserController {
  static async signUp(req: Request, res: Response) {
    try {
      let user = await User.findOne({ email: req.body.email })

      if (user) {
        return res.status(400).json({ message: 'E-mail já está em uso !' })
      }

      user = new User(req.body)

      if (user.password && user.password.length < 8) {
        return res
          .status(400)
          .json({ message: 'Senha precisa ter ao menos 8 caraceters !' })
      }

      const hash = await generateHash(user.password)

      if (hash) {
        user.password = hash
      }

      await user.save()

      res.status(201).json({ message: 'Cadastro concluído com sucesso !' })
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: error })
    }
  }

  static async signIn(req: Request, res: Response) {
    try {
      const { email, password } = req.query

      if (!email) {
        return res.status(400).json({ message: 'Email não informado !' })
      }

      if (!password || typeof password !== 'string') {
        return res
          .status(400)
          .json({ message: 'Senha não informada ou invalida !' })
      }

      const user = await User.findOne({ email: email })

      if (!user) {
        return res.status(400).json({ message: 'Usuário ou senha incorreto !' })
      }

      const canAuth = await compareHash(password, user.password)

      if (!canAuth) {
        return res.status(400).json({ message: 'Usuário ou senha incorreto !' })
      }

      const token = jwt.sign(
        {
          sub: user._id.valueOf(),
          name: user.name,
          email: user.email,
        },
        process.env.JWT_SECRET as string,
        { expiresIn: '30d' }
      )

      res.status(200).json({ token: token })
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: error })
    }
  }

  static async getUserInfo(req: Request, res: Response) {
    try {
      const user = await User.findById(req.user.sub)

      res.status(200).json({
        name: user?.name,
        email: user?.email,
      })
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: error })
    }
  }

  static async updateUser(req: Request, res: Response) {
    try {
      const id = req.user.sub
      const { name, email } = req.body

      await User.findByIdAndUpdate(id, {
        name,
        email,
      })

      res.status(200).json({ message: 'Atualizado com sucesso !' })
    } catch (error) {
      res
        .status(500)
        .send({ message: 'Erro Interno no servidor', error: error })
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const id = req.user.sub
      await User.findByIdAndDelete(id)

      res.status(200).json({ message: 'Usuário deletado com sucesso !' })
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: error })
    }
  }
}

export default UserController
