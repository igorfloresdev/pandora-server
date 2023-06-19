import express, { Request, Response, Router } from 'express'
import userRoutes from './userRoutes'
import categoryRoutes from './categoryRoutes'
import productRoutes from './productRoutes'
import recoveryRoutes from './recoveryRoutes'

const routes = (app: Router) => {
  app.route('/').get((req: Request, res: Response) => {
    res.status(200).send('Pandora API')
  })

  app.use(
    express.json(),
    userRoutes,
    categoryRoutes,
    productRoutes,
    recoveryRoutes
  )
}

export default routes
