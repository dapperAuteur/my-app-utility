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

// https://mongoosejs.com/docs/tutorials/findoneandupdate.html
export async function PATCH(req, {params}) {
  const { _id } = params;
  console.log('40 api/accounts/[_id].js _id :>> ', _id);
  const body = await req.json();
  console.log('42 api/accounts/[_id].js body :>> ', body);
  const acctData = body.formData;

  try {
    // update account
    const duplicate = await Account.findOne({
      accountName: acctData.accountName
    })
      .lean()
      .exec();
      // check that a document was found with the account name of the updated object
    if (duplicate) {
      // check if the account name matches the original document by using the _id
      // if not, then it's a duplicate of an existing document and cannot be updated in the db
      if (duplicate._id !== acctData._id) {
        return NextResponse.json(
          {
            message: "Duplicate Account Name. Please Choose Another Name."
          },
          {
            status: 409
          }
        )
      }
    }

    const updatedAccount = await Account.findOneAndUpdate({
      _id
    }, acctData, {
      new: true
    });
    console.log('71 api/accounts/[_id].js updatedAccount :>> ', updatedAccount);
    
    return NextResponse.json(
      {
        account: updatedAccount
      },
      {
        status: 200
      }
    )
  } catch (error) {
    console.log('52 app/api/accounts/[_id]/route error :>> ', error);
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