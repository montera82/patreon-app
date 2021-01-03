import { Request, Response, Router} from 'express'
import launchBrowser from '../utils/browser'
import User from './database/models/User'
import { PatreonData } from './interfaces/Patreon';
import PatreonService from './services/Patreon'

const router = Router();

router.post('/scrap/patreon/:userId',  async (req: Request, res: Response) => {
  // Get user record
  const {userId} = req.params
  let user = await User.query().findById(userId)
  if(!user){
    throw new Error(`User ${userId} not found.`)
  }

  // Launch browser and scrap patreon data
  const browser = await launchBrowser();
  const patreonService = new PatreonService(browser)
  const data = await patreonService.scrap({
    email: user.patreon_email,
    password: user.patreon_password
  })

  // Persist data to storage
  const result = await patreonService.persistData({
    user_id: user.id,
    per_month: data.per_month,
    patrons: data.patrons
  })

  await browser.close()
  res.status(200).json(result)
})

router.post('/scrap/patreon/all', async (req: Request, res: Response) => {
  // Get all users
  const users = await User.query()
  if(users.length){
    // Launch browser and scrap patreon data
    const browser = await launchBrowser();
    const patreonService = new PatreonService(browser)

    const result: PatreonData[] = []
    for(let user of users){
      const data = await patreonService.scrap({
        email: user.patreon_email,
        password: user.patreon_password
      })

      // Persist data to storage
      const response = await patreonService.persistData({
        user_id: user.id,
        per_month: data.per_month,
        patrons: data.patrons
      })
      result.push(response)
    }

    await browser.close()
    res.status(200).json(result)
  }
   res.status(204)
})

export default router