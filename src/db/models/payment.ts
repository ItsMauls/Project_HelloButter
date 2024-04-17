import { NextRequest, NextResponse } from "next/server";
import { i } from "../config/xendit";
import {v4 as uuid} from 'uuid'
import { connectToDatabase } from "../config/db";

export const createPayment = async(req: NextRequest) => {
    
    try {
        const body = await req.json();
        const db = await connectToDatabase();
        const Payments = db.collection('Payments');
        const { 
            amount,
            payerEmail,
            description,
        } = body;

        const data:any = {
            amount,
            "invoiceDuration" : 172800,            
            externalId : uuid(),
            description,
            payerEmail,
            "currency" : "IDR",
            "reminderTime" : 1
          }
          const res = await i.createInvoice({
              data
          })

          const paymentReq = {
            id : res.id,
            amount : res.amount,
            status : res.status,
            payment_date : res.created,
          }
          
        //   const orderReq = productsDetails.map(product => ({
        //     bundle_id: product.id,
        //     quantity: product.quantity,
        //     total_price: product.price,
        //     payment_id : res.id
        //   }));

        const response = await Payments.insertOne(paymentReq);
        const temp =  {_id : response.insertedId, ...paymentReq}
        const output = await Payments.findOne({ _id: temp._id });
        console.log(output);
        
        return res

    } catch (error) {
        return NextResponse.json({error}, {status: 500})
    }
}