import z from "zod"


const allTasks=z.object({
    id: z.string(),
    userName: z.string(),
})