import { connectToDB } from "@/utils/database";
import Prompts from "@/models/prompt";


// POST method
export const POST = async (req) => {
    const {userId, prompt, tag} = await req.json()

    try {
        await connectToDB()
        const newPrompt = new Prompts({
            creator: userId,
            prompt,
            tag
        })

        await newPrompt.save()
        return new Response(JSON.stringify(newPrompt), {status: 201})

    } catch (error) {
        return new Response("failed to create new prompt", {status: 500})
    }
}


// GET

export const GET = async (request) => {
    try {
        await connectToDB()
        const prompts = await Prompts.find({}).populate('creator')
        return new Response(JSON.stringify(prompts), {status: 200})
    } catch (error) {
        return new Response("failed to fetch ..........", {status: 500})   
    }
}