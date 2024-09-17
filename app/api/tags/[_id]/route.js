import { NextResponse } from "next/server";
import Tag from "./../../../(models)/Tag";

export async function GET(req, {params}) {
  
  const {_id} = params;
  console.log('7 server _id :>> ', _id);

  let foundTag = await Tag.find({_id: _id})
    .then((obj) => {
      console.log('11 server obj :>> ', obj);
      return obj;
    });
  console.log('14 server foundTag :>> ', foundTag);
  return NextResponse.json(
    {
      tag: foundTag
    },
    {
      status: 200
    }
  )
}

export async function PATCH(req, {params}) {
  const {_id} = params;
  const body = await req.json();
  const tagData = body.formData;
  try {

    const updatedTag = await Tag.findOneAndUpdate(
      { _id: _id }, tagData, { new: true }
    )
    console.log('server 39 updatedTag :>> ', updatedTag);
    return NextResponse.json(
      {
        tag: updatedTag
      },
      {
        status: 200
      }
    )
  } catch (error) {
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