import {Router} from 'express'

const authRouter = Router()

authRouter.post('/sign-up',(req,res)=>{res.send({title:"This is Sign up"})})
authRouter.post('/sign-in',(req,res)=>{res.send({title:"This is Sign in"})})
authRouter.post('/sign-out',(req,res)=>{res.send({title:"This is Sign out"})})

export default authRouter