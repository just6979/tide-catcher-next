import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
    return (
        <div id="title">
            <a href="/#">
                <img id="logo" src="../static/images/wave_left_48.png" alt="Site Logo"/>
                <h1>Tide Catcher</h1>
            </a>
        </div>
);
}
