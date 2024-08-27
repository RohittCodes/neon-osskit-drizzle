import { db } from "@/lib/db";
import { postsTable } from "@/lib/schema";

export async function POST (req: Request) {
    try {
        const { title, content, author } = await req.json();
        const post = await db.insert(postsTable).values({
            title,
            content,
            username: author,
        });

        return new Response(JSON.stringify(post), { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response("An error occurred", { status: 500 });
    }
}

export async function GET () {
    const posts = await db.select().from(postsTable);

    return new Response(JSON.stringify(posts));
}