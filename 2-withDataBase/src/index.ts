import express from 'express';
import {z} from 'zod';
import { prismaClient } from './db';
export const app = express();
app.use(express.json());

const inputSchema = z.object({
    num1: z.number(),
    num2: z.number(),
})

app.post('/sum', async (req, res) => {
    const validationResult = inputSchema.safeParse(req.body);
    if (!validationResult.success) {
        return res.status(422).send({message:"incorrect inputs"});
    }
    const result =validationResult.data.num1 + validationResult.data.num2;
    
    const response =  await prismaClient.request.create({
        data:{
            num1: validationResult.data.num1,
            num2: validationResult.data.num2,
            answer: result,
            type: "Sum"
        }
    })
    res.send({answer:result , id: response.id })
})
app.post('/multiply', async (req, res) => {
    const validationResult = inputSchema.safeParse(req.body);
    if (!validationResult.success) {
        return res.status(422).send({message:"incorrect inputs"});
    }
    const result =validationResult.data.num1 * validationResult.data.num2;
    await prismaClient.request.createMany({
        data:{
            num1: validationResult.data.num1,
            num2: validationResult.data.num2,
            answer: result,
            type: "Sum"
        }
    })
    res.send({answer:result})
})