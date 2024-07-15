// lib/github.ts
import axios from "axios";

export async function fetchRepoInfo(owner: string, repo: string) {
    const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}`);
    if (response.status !== 200) {
        throw new Error(`Failed to fetch repository information: ${response.statusText}`);
    }
    return response.data.json();
}
