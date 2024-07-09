// import {describe,it,expect} from '@jest/globals'
import {describe,it,expect, vi, } from 'vitest'
import { app }from '../index'
import request from 'supertest'
import { prismaClient } from '../__mocks__/db'


// vi.mock("../db",()=>{
//     return {
//         prismaClient:{
//             request:{
//                 create:vi.fn(),
//                 createMany:vi.fn()
//             }
//         }
//     }
// })

vi.mock("../db")
describe('testing express sum', ()=>{
    it('testing for both positive', async ()=>{
        (prismaClient.request.create as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
            id: 1,
            num1: 1,
            num2: 2,
            answer: 3
        })
        vi.spyOn(prismaClient.request, 'create');
        const res = await request(app).post('/sum').send({
            num1: 1,
            num2: 2
        })
        expect(prismaClient.request.create).toHaveBeenCalledWith({
            data:{
                num1: 1,
                num2: 2,
                answer: 3,
                type: "Sum"
            }
        })
        expect(res.body.answer).toBe(3);
        expect(res.body.id).toBe(1);
    })
    it('testing for incorrect inputs', async ()=>{
        const res = await request(app).post('/sum').send({
            num1: "",
            num2: -2
        })
        expect(res.body.message).toBe("incorrect inputs");
    })
    it('testing for no inputs', async ()=>{
        const res = await request(app).post('/sum').send({
        })
        expect(res.body.message).toBe("incorrect inputs");
    })
    
})
describe('testing express multpily', ()=>{
    it('testing for both positive', async ()=>{
        const res = await request(app).post('/multiply').send({
            num1: 1,
            num2: 2
        })
        expect(res.body.answer).toBe(2);
    })
    it('testing for incorrect inputs', async ()=>{
        const res = await request(app).post('/multiply').send({
            num1: "",
            num2: -2
        })
        expect(res.body.message).toBe("incorrect inputs");
    })
    it('testing for no inputs', async ()=>{
        const res = await request(app).post('/multiply').send({
        })
        expect(res.body.message).toBe("incorrect inputs");
    })
    
})
