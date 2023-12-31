import { connectToDB } from "@utils/database";
import Prompt from "@model/prompt";

export const POST = async (req) => {
  const { prompt, tag, userId } = await req.json();
  console.log("*******************************", prompt, tag, userId);
  try {
    await connectToDB();
    const newPrompt = await Prompt.create({
      creator: userId,
      prompt,
      tag,
    });
    await newPrompt.save();
    console.log("*******************************", newPrompt);
    return new Response(JSON.stringify(newPrompt), {
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
    });
  }
};
