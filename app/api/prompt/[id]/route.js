// GET (read)
import { connectToDB } from "@/utils/database";
import Prompts from "@/models/prompt";

export const GET = async (request, {params}) => {
    try {
        await connectToDB()
        const prompts = await Prompts.findById(params.id).populate('creator')
        if(!prompts) return new Response("prompt not found", {status: 404})
        return new Response(JSON.stringify(prompts), {status: 200})
    } catch (error) {
        return new Response("failed to fetch ..........", {status: 500})   
    }
}


// PATCH (update)

export const PATCH = async(request, {params}) => {
    const {prompt, tag} = await request.json()

    try {
        await connectToDB()
        const existingPrompt = await Prompts.findById(params.id)
        if(!existingPrompt) return new Response("prompts not found", {status: 404})
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        await existingPrompt.save()
        return new Response(JSON.stringify(existingPrompt), {status: 200})
    } catch (error) {
        return new Response(JSON.stringify("failed to update prompts", {status: 500}))
    }
}

// DELETE (delete)

export const DELETE = async(request, {params}) => {
    try {
        await connectToDB()
        await Prompts.findByIdAndRemove(params.id)
        return new Response("deleted successfully",{status: 200})
    } catch (error) {
        return new Response("failed to delete the document", {status: 500})
    }
}