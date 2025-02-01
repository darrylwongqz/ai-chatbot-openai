// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import openai from '../../lib/chatgpt';

type Option = {
  value: string;
  label: string;
};

type Data = {
  modelOptions: Option[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const response = await openai.models.list();
    const models = response.data;

    const modelOptions = models.map((model) => ({
      value: model.id,
      label: model.id,
    }));

    res.status(200).json({ modelOptions });
  } catch (error) {
    console.error('Failed to fetch models:', error);
    res.status(500).json({ modelOptions: [] });
  }
}
