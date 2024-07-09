// import {describe,it,expect} from '@jest/globals'
import {describe,it,expect} from 'vitest'
import { app }from '../index'
import request from 'supertest'

describe('testing express sum', ()=>{
    it('testing for both positive', async ()=>{
        const res = await request(app).post('/sum').send({
            num1: 1,
            num2: 2
        })
        expect(res.body.answer).toBe(3);
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
