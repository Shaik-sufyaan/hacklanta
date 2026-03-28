export function createSignedUrl(path: string): string {
  const bucket = process.env.CLOUD_STORAGE_BUCKET ?? 'speakops-dev';
  return `https://storage.googleapis.com/${bucket}/${path}?signature=demo`;
}
