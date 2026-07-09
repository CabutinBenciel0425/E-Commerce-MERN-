import { RANDOM_PROFILE_URL } from "../config/envVars";

export const getRandomProfile = async (name) => {
  const res = await fetch(
    `${RANDOM_PROFILE_URL}name=${name}&size=128&background=random&color=fff&bold=true`,
  );
};
