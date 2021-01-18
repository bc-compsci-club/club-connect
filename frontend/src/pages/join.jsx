import { useState } from 'react';

import { JoinForm, JoinSuccess } from 'components/join';

const Join = () => {
  const [memberJoined, setMemberJoined] = useState(false);

  if (!memberJoined) {
    return <JoinForm setMemberJoined={setMemberJoined} />;
  } else {
    return <JoinSuccess />;
  }
};

export default Join;
