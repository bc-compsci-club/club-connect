import Link from 'next/link';

import styles from './Highlight.module.scss';

const Highlight = (props) => {
  return (
    <div
      className={styles.highlight}
      style={{ backgroundColor: props.backgroundColor }}
    >
      <div className={`${styles.highlightContainer} ${props.containerClass}`}>
        <div className={styles.highlightContent}>
          <h2>{props.title}</h2>
          <p>{props.description}</p>
          <Link href={props.linkUrl}>
            <a>{props.linkText} →</a>
          </Link>
        </div>
        <img
          className={styles.highlightImage}
          src={props.image}
          alt={props.imageAlt}
        />
      </div>
    </div>
  );
};

export default Highlight;
