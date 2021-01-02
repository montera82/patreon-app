import { Request, Response, Router} from 'express'
import launchBrowser from '../utils/browser'
import User from './database/models/User'
import Patreon from './database/models/Patreon'
import PatreonModule from './modules/Patreon'

const router = Router();

router.patch('/scrap/patreon/:userId',  async (req: Request, res: Response) => {
  // Get user record
  const {userId} = req.params
  let user = await User.query().findById(userId)
  if(!user){
    throw new Error(`User ${userId} not found.`)
  }

  // Launch browser and scrap patreon data
  const browser = await launchBrowser();
  const patreon = new PatreonModule(browser)
  const data = await patreon.scrap({
    email: user.patreon_email,
    password: user.patreon_password
  })

  // Persist data to storage
  const [record] = await Patreon.query()
    .where('user_id', '=', user.id)

  let result 
  if(record){
    result = await Patreon.query()
      .patchAndFetchById(record.id, {
        patrons: data.patrons,
        per_month: data.per_month
      })
  }else{
    result = await Patreon.query().insert({
      patrons: data.patrons,
      per_month: data.per_month,
      user_id: user.id
    })
  }

  res.status(200).json(result)
})

router.patch('/scrap/patreon/all', () => {

})

export default router