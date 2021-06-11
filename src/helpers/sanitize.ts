import pick from 'lodash/pick';

const templates: {
  [key: string]: string[];
} = {
  users: ['user_id', 'role', 'username', 'email', 'name', 'is_verified', 'image', 'created_at', 'updated_at'],
};

export default (data: unknown, model: string): Partial<unknown> => {
  return pick(data, templates[model]);
};
