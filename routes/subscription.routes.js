import { Router } from "express";

const subscriptionRouter = Router()

subscriptionRouter.get('/',(req, res)=>res.send({title:"GET user Subscription"}))

subscriptionRouter.get('/:id', (req, res)=>res.send({title:"GET Subscription detail"}))

subscriptionRouter.post('/', (req, res)=>res.send({title:"CREATE Subscription detail"}))

subscriptionRouter.put('/:id', (req, res)=>res.send({title:"UPDATE Subscription detail"}))

subscriptionRouter.delete('/:id', (req, res)=>res.send({title:"DELETE Subscription detail"}))

subscriptionRouter.get('/user/:id', (req, res)=>res.send({title:"GET all Subscription detail"}))

subscriptionRouter.put('/:id/cancel', (req, res)=>res.send({title:"CANCEL Subscription detail"}))

subscriptionRouter.get('/upcoming-renewals', (req, res)=>res.send({title:"GET upcoming renewals"}))

export default subscriptionRouter