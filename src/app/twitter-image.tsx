export { alt, size, contentType } from "@/app/og-shared";
import { generateOgImage } from "@/app/og-shared";

export default async function Image() {
  return generateOgImage();
}
