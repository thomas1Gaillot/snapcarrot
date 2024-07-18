import supabase from '@/lib/supabaseClient';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { path } = req.body;

    if (!path) {
        return res.status(400).json({ error: 'Path is required' });
    }

    const { data, error } = await supabase
        .storage
        .from(process.env.NEXT_PUBLIC_SUPABASE_S3_NAME)
        .createSignedUrl(path, 60 * 60); // URL valable pendant 1 heure

    if (error || !data?.signedUrl) {
        return res.status(500).json({ error: error?.message });
    }

    res.status(200).json({ signedUrl: data.signedUrl });
}
