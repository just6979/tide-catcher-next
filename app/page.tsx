import Image from "next/image";
import styles from "./page.module.css";

import { promises as fs } from 'fs';

export default async function Home() {
    const file = await fs.readFile(process.cwd() + "/templates/index.mustache");
    return (
        <div dangerouslySetInnerHTML={{ __html: file.toString() }} />
);
}
