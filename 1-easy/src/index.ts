import express from 'express';
import {z} from 'zod';

export const app = express();
app.use(express.json());

const inputSchema = z.object({
    num1: z.number(),
    num2: z.number(),
})

app.post('/sum', (req, res) => {
    const validationResult = inputSchema.safeParse(req.body);
    if (!validationResult.success) {
        return res.status(422).send({message:"incorrect inputs"});
    }
    const result =validationResult.data.num1 + validationResult.data.num2;
    res.send({answer:result})
})
app.post('/multiply', (req, res) => {
    const validationResult = inputSchema.safeParse(req.body);
    if (!validationResult.success) {
        return res.status(422).send({message:"incorrect inputs"});
    }
    const result =validationResult.data.num1 * validationResult.data.num2;
    res.send({answer:result})
})