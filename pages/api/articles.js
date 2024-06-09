import { mongooseConnect } from '@/lib/mongoose';
import { Article } from '@/models/article';
import { isAdminRequest } from "@/api/auth/[...nextauth]";


export default async function handle(req, res) {
    const { method } = req;
    await mongooseConnect();
    await isAdminRequest(req, res);

    if (method === 'GET') {
        const articles = await Article.find();
        res.json(articles);
    }

    if (method === 'POST') {
        const { title, images, description, publisher, publishedDate } = req.body;
        const articleDoc = await Article.create({
            title,
            images,
            description,
            publisher,
             publishedDate
        });
        res.json(articleDoc);
    }

    if (method === 'PUT') {
        const { title, images, description, _id} = req.body;
        await Article.updateOne({ _id }, {  title, images, description, publisher, publishedDate });
        res.json(true);
      }

    if (method === 'DELETE') {
        const { id } = req.query; 
        if (!id) {
          return res.status(400).json({ error: 'Missing event ID' });
        }
        await Article.deleteOne({ _id: id });
        return res.json({ success: true });
      }
      
    
}