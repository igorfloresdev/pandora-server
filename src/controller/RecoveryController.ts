import { Request, Response } from 'express'
import crypto from 'crypto'
import User from '../model/User'
import RecoveryCode from '../model/RecoveryCode'
import { generateHash } from '../lib/bcrypt'
import { sendMail } from '../lib/nodemailer'

class RecoveryController {
  static async sendRecoveryCode(req: Request, res: Response) {
    try {
      const user = await User.findOne({ email: req.body.email })

      if (!user) {
        return res.status(401).json({ message: 'Email não encontrado !' })
      }

      const buffer = crypto.randomBytes(3)
      const randomCode = buffer.toString('hex')

      const currentDate = new Date()

      req.body.user = user._id.valueOf()
      req.body.code = randomCode
      req.body.expiration = new Date(currentDate.getTime() + 30 * 60 * 1000)

      const recovery = new RecoveryCode(req.body)

      await recovery.save()

      sendMail(
        user.email,
        `Seu código de recuperação é ${recovery.code} !`,
        `O código de recuperação da sua conta Pandora é ${recovery.code}, esse código é valido por 30 minutos e só pode ser usado uma unica vez, caso você não tenha solicitado esse código entre em contato conosco`
      )

      res
        .status(200)
        .json({ message: 'Código enviado por e-mail com sucesso !' })
    } catch (error) {
      res.status(500).send({ message: 'Internal Server Error', error: error })
    }
  }

  static async checkRecoveryCode(req: Request, res: Response) {
    const code = await RecoveryCode.findOne({ code: req.body.code })

    if (!code) {
      res.status(401).json({ message: 'Código não encontrado !' })
      return
    }

    if (code.used) {
      res.status(401).json({ message: 'CÓdigo já utilizado !' })
      return
    }

    const currentDate = new Date()

    if (currentDate > code.expiration) {
      res.status(401).send('Código expirado !')
      return
    }
    res.status(200).send()
  }

  static async resetPassword(req: Request, res: Response) {
    try {
      const user = await User.findOne({ email: req.body.email })

      if (!user) {
        return res.status(401).json({ message: 'Email não encontrado !' })
      }

      const recoveryCode = await RecoveryCode.findOne({
        user: user._id,
        code: req.body.code,
      })

      if (!recoveryCode) {
        return res.status(401).json({ message: 'Código não encontrado !' })
      }

      const currentDate = new Date()

      if (currentDate > recoveryCode.expiration) {
        return res.status(401).json({ message: 'Código expirado !' })
      }

      if (recoveryCode.used) {
        return res.status(401).json({ message: 'Código já foi utilizado !' })
      }

      if (req.body.password && req.body.password.length < 8) {
        return res
          .status(400)
          .json({ message: 'Senha precisa ter ao menos 8 caraceters !' })
      }

      await User.findOneAndUpdate(
        { email: req.body.email },
        { password: await generateHash(req.body.password) }
      )

      recoveryCode.used = true
      recoveryCode.save()

      res.status(200).send('Senha alterada com sucesso')
    } catch (error) {
      res.status(500).send({ message: 'Internal Server Error', error: error })
    }
  }
}

export default RecoveryController
