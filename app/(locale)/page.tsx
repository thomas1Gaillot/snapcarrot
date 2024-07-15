'use client';

import { redirect } from 'next/navigation';

export default function Index() {
    redirect('/on-boarding/loading');
    return null;
}
