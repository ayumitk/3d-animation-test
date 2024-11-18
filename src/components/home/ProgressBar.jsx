import { motion } from "framer-motion";
import styles from "./ProgressBar.module.css";

export default function ProgressBar(props) {

  const scrollYProgress = props.scrollYProgress;
  
  return <motion.div className={styles.progressBar} style={{ scaleX: scrollYProgress }} />;
}
