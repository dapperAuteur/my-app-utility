import Account from "./../../../(models)/Account";
import { NextResponse } from "next/server";

export async function GET (req, { params }) {
  const { _id } = params;

  try {
    let foundAccount = await Account.find({_id: _id})
      .then((obj) => {
        return obj;
      })
      .then((fA) => {
        return fA;
      });

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
}