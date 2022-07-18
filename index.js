import { shared } from "node-blox-sdk";
import { getBody } from "./utils.js";

const update_user = async (req, res) => {
  // health check
  if (req.params["health"] === "health") {
    res.write(JSON.stringify({ success: true, msg: "Health check success" }));
    res.end();
  }

  // Getting shared prisma client
  const { prisma } = await shared.getShared();

  const data = await getBody(req);
  const {system_user_id, ...updateData} = data

  const updateRes =  await prisma.user.update({
    where: { system_user_id },
    data: updateData,
  })

  res.write(
    JSON.stringify({
      success: true,
      msg: `User updated succesfully`,
      data: updateRes,
    })
  );
  res.end();
};

export default update_user;
