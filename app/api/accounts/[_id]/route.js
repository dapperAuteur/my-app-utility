import Account from "./../../../(models)/Account";
import { NextResponse } from "next/server";

export async function GET (req, { params }) {
  // console.log('5 server params :>> ', params);
  const { _id } = params;
  // console.log('_id :>> ', _id);

  try {
    let foundAccount = await Account.find({_id: _id})
      .then((obj) => {
        return obj;
      })
      .then((fA) => {
        console.log('fA :>> ', fA);
        return fA;
      });
  console.log('foundAccount :>> ', foundAccount);

  return NextResponse.json(
    {
      account: foundAccount,
    },
    {
      status: 200
    }
  )
  } catch (error) {
    console.log('22 api/accounts/[_id].js error :>> ', error);
    return NextResponse.json(
      {
        message: "Error", error
      },
      {
        status: 500
      }
    )
  }

  return NextResponse.json(
    {
      account: foundAccount,
    },
    {
      status: 200
    }
  )
}