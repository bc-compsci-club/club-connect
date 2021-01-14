import activityStyles from '../Activity/Activity.module.scss';
import hackathonActivityStyles from './HackathonActivity.module.scss';

const HackathonActivity = (props) => {
  return (
    <div className={`${activityStyles.activity} ${props.componentClass}`}>
      <div className="text">
        {/* eslint-disable-next-line */}
        <div role="text">
          <h3 className={hackathonActivityStyles.title}>{props.title}</h3>
          <h3 className={hackathonActivityStyles.subtitle}>{props.subtitle}</h3>
        </div>
        <p className={activityStyles.description}>{props.description[0]}</p>
        <p className={activityStyles.description}>{props.description[1]}</p>
        <p className={activityStyles.description}>{props.description[2]}</p>
      </div>

      <img
        className={activityStyles.image}
        src={props.image}
        alt={props.imageAlt}
      />
    </div>
  );
};

export default HackathonActivity;
