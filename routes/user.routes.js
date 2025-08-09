import { Router } from "express";

const userRoute = Router()

userRoute.get('/', (req, res)=>res.send({title:"GET all users"}))

userRoute.get('/:id', (req, res)=>res.send({title:"GET users by ID"}))

userRoute.post('/', (req, res)=>res.send({title:"CREATE new users"}))

userRoute.put('/:id', (req, res)=>res.send({title:"UPDATE user by ID"}))

userRoute.delete('/id', (req, res)=>res.send({title:"DELETE user by ID"}))

export default userRoute