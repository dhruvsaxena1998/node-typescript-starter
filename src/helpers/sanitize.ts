import pick from "lodash/pick";

const templates: {
  [key: string]: string[];
} = {
  users: [ "user_id", "role_id", "username", "email", "name", "is_verified", "image", "created_at", "updated_at", ],
};

export default (data: Object, model: string) => {
  return pick(data, templates[model]);
};
