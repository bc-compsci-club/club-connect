import styles from './TeamMember.module.scss';

const TeamMember = (props) => {
  return (
    <article className={styles.teamMember}>
      <a
        className={styles.teamMemberLink}
        href={props.website}
        rel="noopener noreferrer"
        target="_blank"
      >
        <div className={styles.teamMemberContainer}>
          <img
            className={styles.teamMemberImage}
            src={props.image}
            alt={props.name}
          />
          <h3 className={styles.teamMemberName}>
            {props.firstName}
            <br />
            {props.lastName}
          </h3>
          <p className={styles.teamMemberDescription}>{props.children}</p>
        </div>
      </a>
    </article>
  );
};

export default TeamMember;
