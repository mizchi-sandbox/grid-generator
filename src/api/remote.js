/* @flow */
import axios from 'axios'

export async function fetchRepo(owner: string, repo: string): Promise<any> {
  const res = await axios.get(`https://api.github.com/repos/${owner}/${repo}`)
  return res
}
