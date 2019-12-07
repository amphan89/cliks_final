const express = require ('express')
const router = express.Router()
const Subscriber = require('../models/subscriber')

//Getting all users in the subscribers database
router.get('/', async (req, res) => {
   //res.send('Hello World') - was used just to test the route with the 'route.rest' file 
   try {
      const subscribers = await Subscriber.find()
      res.json(subscribers)
   } catch (err) {
      res.status(500).json({ message: err.message }) // msg of error on db
   }
})

//Getting 1 user in the subscribers database
router.get('/:id', getSubscriber, (req, res) => {
   res.json(res.subscriber)
   //res.send(req.params.id)
})

//Creating 1 user in the subscribers database
router.post('/', async (req, res) => {
   const subscriber = new Subscriber ({
      email: req.body.email,
      password: req.body.password
   })
   try {
      const newSubscriber = await subscriber.save()
      res.status(201).json(newSubscriber) //success msg
   } catch (err) {
      res.status(400).json({ message: err.message }) //failure msg
   }
})

//Updating 1 user in the subscribers database
//We use 'patch' instead of 'put' to update only what the user passes us
router.patch('/:id', getSubscriber, async (req, res) => {
   if (req.body.email != null) {
      res.subscriber.email = req.body.email
   }
   if (req.body.password != null) {
      res.subscriber.password = req.body.password
   }
   try {
      const updatedSubscriber = await res.subscriber.save()
      res.json(updatedSubscriber)
   } catch (err) {
      res.status(400).json({ message: err.message })
   }
})

//Deleting 1 user in the subscribers database
router.delete('/:id', getSubscriber, async (req, res) => {
   try {
      await res.subscriber.remove()
      res.json({ message: 'Deleted Subscriber'})
   } catch (err) {
      res.status(500).json({ message: err.message })
   }

})

async function getSubscriber(req, res, next) {
   let subscriber 
   try {
      subscriber = await Subscriber.findById(req.params.id)
      if (subscriber == null) {
      return res.status(404).json({ message: 'Can not find subscriber' })
      }
   } catch (err) {
      return res.status(500).json({ message: err.message })
   }
   res.subscriber = subscriber 
   next()
}

module.exports = router