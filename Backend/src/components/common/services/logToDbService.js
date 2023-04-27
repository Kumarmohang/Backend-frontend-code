import Log from '../models/logModel';

/**
 * This function insert logs into db
 * @param {Any} user - User.
 * @param {Any} data - Reqest data.
 * @returns {void}
 */
export const addLog = (user, data) => {
  const newLog = new Log({
    user: { id: user?._id.toString() || '', name: user?.username || '' },
    data,
  });
  newLog.save().catch((err) => {
    console.error(err);
  });
};
