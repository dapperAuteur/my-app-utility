import User from "@/app/(models)/User";

// export const async findUserByEmail(email){
//   let user = await User.findOne({email: email});
//   console.log('user :>> ', user);
// }

const getUserByEmail = async (email) => {
  let user = await User.findOne({ email: email });
  console.log('user :>> ', user);
  return user;
}

export default getUserByEmail; 