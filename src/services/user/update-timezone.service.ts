import { UpdateTimezoneReq } from "../../controllers/user/update-timezone.controller.js";
import User from "../../models/user.model.js";

export const updateTimezoneService = async (
  userId: string,
  updateData: UpdateTimezoneReq
) => {
  const user = await User.findById(userId);
  if (!user) return null;

  const { timezone } = updateData

  if (timezone) {
    user.timezone = timezone;
  }

  await user.save();
  return user.toObject();
}