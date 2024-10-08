import { Schema, model } from 'mongoose';

export default model('User', Schema({
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    pantry: {
      type: [Schema.Types.ObjectId],
      required: false
    }
  })
);
