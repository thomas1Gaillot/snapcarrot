'use client';

import { redirect } from 'next/navigation';

export default function Index() {
    redirect('/on-boarding/start-with-username');
    return null;
}
