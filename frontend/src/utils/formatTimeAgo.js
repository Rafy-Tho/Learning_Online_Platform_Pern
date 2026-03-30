// utils/formatTimeAgo.js
import { formatDistanceToNow } from "date-fns";

const formatTimeAgo = (dateString) => {
  return formatDistanceToNow(new Date(dateString), {
    addSuffix: true,
  });
};

export default formatTimeAgo;
