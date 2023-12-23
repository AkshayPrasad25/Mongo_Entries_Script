const mongoose = require('mongoose');
const faker = require('faker');

// Replace <Your_DB_URI> with the actual URL of your MongoDB database
mongoose.connect("<Your_DB_URI>", { useNewUrlParser: true, useUnifiedTopology: true });


//Add your db schema here accordingly
const Post = mongoose.model('Post', new mongoose.Schema({
  name: { type: String, required: true },
  prompt: { type: String, required: true },
  photo: { type: String, required: true },
}));

async function generateRandomData() {
  const posts = [];

  for (let i = 0; i < 100000; i++) {
    const post = {
      name: faker.name.findName(),
      prompt: faker.lorem.sentence(),
      photo: faker.image.imageUrl(),
    };

    posts.push(post);
  }
//replace Post with ur mongo collection
  await Post.insertMany(posts);
  console.log('Random entries inserted successfully.');
  mongoose.connection.close();
}

generateRandomData();